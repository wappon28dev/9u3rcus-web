import type { HTMLInputTypeAttribute } from "react";
import { type ZodType, z } from "zod";

export const zContactFormData = z.object({
  name: z.string().min(1, { message: "お名前を入力してください" }),
  company: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "正しいメールアドレスの形式ではありません" }),
  subject: z.string().min(1, { message: "件名を入力してください" }),
  message: z.string().min(1, { message: "お問い合わせ内容を入力してください" }),
} as const satisfies Record<string, ZodType>);

export const formSchema = {
  name: {
    description: "お名前",
    formType: "input",
    inputType: "text",
  },
  company: {
    description: "企業名",
    formType: "input",
    inputType: "text",
  },
  email: {
    description: "ご連絡先（メールアドレス）",
    formType: "input",
    inputType: "email",
  },
  subject: {
    description: "件名",
    formType: "input",
    inputType: "text",
  },
  message: {
    description: "ご用件",
    formType: "textarea",
    inputType: "text",
  },
} as const satisfies Record<
  ContactFormDataKey,
  {
    description: string;
    formType: "input" | "textarea";
    inputType: HTMLInputTypeAttribute;
  }
>;

export type ContactFormData = z.infer<typeof zContactFormData>;
export type ContactFormDataKey = keyof (typeof zContactFormData)["shape"];
