import { sendEmail } from "@cloudflare/pages-plugin-mailchannels/api";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { type HonoType } from "lib/constance";
import { type EmailAddress, getPersonalizationInfo } from "lib/sender";

export const contact = new Hono<HonoType>().post("/", async (ctx) => {
  const to: EmailAddress = {
    email: "fopiba560@fuwamofu.com",
  };

  const from: EmailAddress = {
    email: "noreply@9u3rc.us",
    name: "9u3rcus - bot",
  };

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
        value: "mailchannels test email content",
      },
    ],
    subject: "mailchannels test email",
    from,
  });

  console.log(result);

  if (!result.success) {
    throw new HTTPException(500, {
      message: "Failed to send email",
    });
  }

  return ctx.text("", 204);
});
