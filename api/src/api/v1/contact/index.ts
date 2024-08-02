/* eslint-disable no-console */
import { getModeName, type ENV, type HonoType } from "@api/lib/consts";
import { authGuard, configureCors } from "@api/lib/middlewares/contact";
import { sendEmail } from "@api/lib/sender";
import { INFO } from "@client/lib/config";
import { formatDate, getEntries } from "@client/lib/consts";
import {
  type ContactFormData,
  formSchema,
  zContactFormData,
} from "@client/lib/services/contact";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { err, ok, ResultAsync } from "neverthrow";

function formatContactData(data: ContactFormData) {
  return getEntries(formSchema)
    .filter(([k]) => data[k] !== "")
    .map(([key, { description }]) =>
      `
  ${description}:
    ${data[key]}
  `.trim(),
    )
    .join("\n");
}

function sendAdminMail(
  data: ContactFormData,
  env: ENV,
  acceptedDate: Date,
): ReturnType<typeof sendEmail> {
  const subject = `【お問い合わせ】${data.name} 様からのお問い合わせ - ${INFO.id}`;

  const content = `
${getModeName(env.MODE)}
ポートフォリオのお問い合わせフォームから以下の内容が送信されました。
お問い合わせ内容を確認し、返信をお願いします。

--- お問い合わせ内容 ---
${formatContactData(data)}
---
受付日時: ${formatDate(acceptedDate, "YYYY-MM-DD HH:mm:ss")}
    `.trim();

  return sendEmail(env, {
    to: INFO.addr.email.admin,
    subject,
    text: content,
  });
}

function sendThanksMail(
  data: ContactFormData,
  env: ENV,
  acceptDate: Date,
): ReturnType<typeof sendEmail> {
  const subject = `【自動返信】お問い合わせありがとうございます - ${INFO.name.full}`;

  const deadlineDate = new Date(acceptDate);
  deadlineDate.setDate(acceptDate.getDate() + 3);
  const deadlineDateStr = formatDate(deadlineDate, "YYYY年M月d日");

  const content = `
${getModeName(env.MODE)}
この度は、お問い合わせいただき誠にありがとうございます。
以下の内容でお問い合わせを受け付けいたしました。

--- お問い合わせ内容 ---
${formatContactData(data)}
---

もしも${deadlineDateStr}までに返信がない場合、お手数ですが${INFO.addr.email.contact}まで再度ご連絡いただきますようお願いいたします。

※このメールは自動返信により送信しています。ご返信をいただいても対応できかねますことをご了承ください。
  `.trim();

  return sendEmail(env, {
    to: data.email,
    subject,
    text: content,
  });
}

function sendDiscordWebhook(
  data: ContactFormData,
  env: ENV,
  acceptDate: Date,
): ResultAsync<
  undefined,
  { code: "NETWORK_ERROR" | "API_ERROR"; details: string }
> {
  const unixTime = Math.floor(acceptDate.getTime() / 1000);
  const content = `
<:9u3rcusdark:1204434658792837160> <@${env.API_DISCORD_WEBHOOK_MENTION_ID}>
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

  return ResultAsync.fromPromise(
    fetch(env.API_DISCORD_WEBHOOK_URL_CONTACT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
    (e) => ({ code: "NETWORK_ERROR", details: String(e) }) as const,
  ).andThen((res) => {
    if (!res.ok) {
      console.error("Failed to send discord webhook", res);
      return err({
        code: "API_ERROR",
        details: `API returned status: ${res.statusText}`,
      } as const);
    }

    return ok(undefined);
  });
}

export const contact = new Hono<HonoType>()
  .options("*", cors())
  .use("*", authGuard, configureCors)
  .post("/", zValidator("json", zContactFormData), async (ctx) => {
    const data = ctx.req.valid("json");
    const acceptedDate = new Date();

    await sendAdminMail(data, ctx.env, acceptedDate).match(
      () => {},
      () => {
        throw new HTTPException(500, {
          message: "Failed to send admin mail",
        });
      },
    );

    await sendThanksMail(data, ctx.env, acceptedDate).match(
      () => {},
      () => {
        throw new HTTPException(500, {
          message: "Failed to send thanks mail",
        });
      },
    );

    await sendDiscordWebhook(data, ctx.env, acceptedDate).match(
      () => {},
      () => {
        throw new HTTPException(500, {
          message: "Failed to send discord webhook",
        });
      },
    );

    return ctx.json({ acceptedDate }, 201);
  });
