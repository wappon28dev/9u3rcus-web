import { sendEmail } from "@cloudflare/pages-plugin-mailchannels/api";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getEntries, type HonoType } from "lib/consts";
import { type EmailAddress, getPersonalizationInfo } from "lib/sender";
import { formSchema, zContactFormData } from "@client/lib/services/contact";
import { INFO } from "@client/lib/config";
import { zValidator } from "@hono/zod-validator";

export const contact = new Hono<HonoType>().post(
  "/",
  zValidator("json", zContactFormData),
  async (ctx) => {
    const data = ctx.req.valid("json");

    const to: EmailAddress = {
      email: data.email,
      name: `${data.name} 様`,
    };
    const from: EmailAddress = {
      email: "noreply@9u3rc.us",
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
asdf
asdf
${_data}
asdf
`.trim();

    const result = await sendEmail({
      personalizations: [
        getPersonalizationInfo({
          env: ctx.env,
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

    console.log(result);

    if (!result.success) {
      throw new HTTPException(500, {
        message: "Failed to send email",
      });
    }

    return ctx.text("", 204);
  },
);
