/* eslint-disable no-console */
import { sendEmail } from "@cloudflare/pages-plugin-mailchannels/api";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getModeName, type ENV, type HonoType } from "lib/consts";
import { type EmailAddress, getPersonalizationInfo } from "lib/sender";
import {
  type ContactFormData,
  formSchema,
  zContactFormData,
} from "@client/lib/services/contact";
import { INFO } from "@client/lib/config";
import { zValidator } from "@hono/zod-validator";
import { formatDate, getEntries } from "@client/lib/consts";
import { cors } from "hono/cors";
import { authGuard } from "lib/middlewares/contact";

async function sendAdminMail(
  data: ContactFormData,
  env: ENV,
  acceptDate: Date,
): ReturnType<typeof sendEmail> {
  const to: EmailAddress = {
    email: INFO.addr.email.contact,
    name: INFO.name.full,
  };
  const from: EmailAddress = {
    email: INFO.addr.email.noreply,
    name: INFO.name.full,
  };
  const subject = `【お問い合わせ】${data.name} 様からのお問い合わせ - ${INFO.id}`;

  const _data = getEntries(formSchema)
    .map(([key, { description }]) =>
      `
${description}:
  ${data[key]}
`.trim(),
    )
    .join("\n");
  const content = `
${getModeName(env.MODE)}
ポートフォリオのお問い合わせフォームから以下の内容が送信されました。
お問い合わせ内容を確認し、返信をお願いします。

--- お問い合わせ内容 ---
${_data}
---
受付日時: ${formatDate(acceptDate, "YYYY-MM-DD HH:mm:ss")}
    `.trim();

  return await sendEmail({
    personalizations: [
      getPersonalizationInfo({
        env,
        info: { to: [to], from },
      }),
    ],
    content: [
      {
        type: "text/plain",
        value: content,
      },
    ],
    subject,
    from,
  });
}

async function sendThanksMail(
  data: ContactFormData,
  env: ENV,
  acceptDate: Date,
): ReturnType<typeof sendEmail> {
  const to: EmailAddress = {
    email: data.email,
    name: `${data.name} 様`,
  };
  const from: EmailAddress = {
    email: INFO.addr.email.noreply,
    name: INFO.name.full,
  };
  const subject = `【自動返信】お問い合わせありがとうございます - ${INFO.name.full}`;

  const _data = getEntries(formSchema)
    .map(([key, { description }]) =>
      `
  ${description}:
    ${data[key]}
  `.trim(),
    )
    .join("\n");

  const content = `
${getModeName(env.MODE)}
テストテストテストテストテストテスト
テストテストテストテストテストテスト

--- お問い合わせ内容 ---
${_data}
---

テストテストテストテストテストテスト
  `.trim();

  return await sendEmail({
    personalizations: [
      getPersonalizationInfo({
        env,
        info: { to: [to], from },
      }),
    ],
    content: [
      {
        type: "text/plain",
        value: content,
      },
    ],
    subject,
    from,
  });
}

async function sendDiscordWebhook(
  data: ContactFormData,
  env: ENV,
  acceptDate: Date,
): Promise<Response> {
  const unixTime = Math.floor(acceptDate.getTime() / 1000);
  const content = `
  <:9u3rcusdark:1204434658792837160> <@${env.DISCORD_WEBHOOK_MENTION_ID}>
  ポートフォリオのお問い合わせフォームからお問い合わせが送信されました.
  送信者へのサンクスメールと管理者 (\`${INFO.addr.email.contact}\`) への通知メールが送信されました.
  お問い合わせ内容を [Gmail ↗](https://gmail.com) で確認し, 返信をお願いします.
  `.trim();

  const body = {
    content: null,
    embeds: [
      {
        title: `📢 ${getModeName(env.MODE)}お問い合わせを受信しました`,
        description: content,
        color: 14500675,
        fields: [
          {
            name: "件名",
            value: data.subject,
          },
          {
            name: "受付日時",
            value: `<t:${unixTime}:F>･<t:${unixTime}:R>`,
          },
        ],
      },
    ],
    attachments: [],
  };

  return await fetch(env.DISCORD_WEBHOOK_URL_CONTACT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const contact = new Hono<HonoType>()
  .options("*", cors())
  .use("/*", authGuard)
  .post("/", zValidator("json", zContactFormData), async (ctx) => {
    const data = ctx.req.valid("json");
    const acceptDate = new Date();

    if (ctx.env.MODE !== "local") {
      const adminMailResult = await sendAdminMail(data, ctx.env, acceptDate);
      if (!adminMailResult.success) {
        console.warn("Failed to send admin mail", adminMailResult.errors);
        throw new HTTPException(500, {
          message: "Failed to send admin mail",
        });
      }

      const autoReplyResult = await sendThanksMail(data, ctx.env, acceptDate);
      if (!autoReplyResult.success) {
        console.warn("Failed to send auto thanks mail", autoReplyResult.errors);
        throw new HTTPException(500, {
          message: "Failed to send thanks mail",
        });
      }
    }

    const res = await sendDiscordWebhook(data, ctx.env, acceptDate);
    if (!res.ok) {
      console.warn("Failed to send discord webhook", res);
      throw new HTTPException(500, {
        message: "Failed to send discord webhook",
      });
    }

    return ctx.text("", 204);
  });
