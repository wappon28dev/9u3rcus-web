import type { HTMLInputTypeAttribute, ReactElement } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodType, z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { styled as p } from "panda/jsx";
import { css } from "panda/css";
import { token } from "panda/tokens";
import { getEntries } from "@/lib/constants";

const form = ["name", "company", "email", "subject", "message"] as const;

const formSchema = {
  name: {
    description: "お名前",
    formType: "input",
    inputType: "text",
    zSchema: z.string().min(1, { message: "お名前を入力してください" }),
  },
  company: {
    description: "企業名",
    formType: "input",
    inputType: "text",
    zSchema: z.string().optional(),
  },
  email: {
    description: "ご連絡先（メールアドレス）",
    formType: "input",
    inputType: "email",
    zSchema: z
      .string()
      .min(1, { message: "メールアドレスを入力してください" })
      .email({ message: "正しいメールアドレスの形式ではありません" }),
  },
  subject: {
    description: "件名",
    formType: "input",
    inputType: "text",
    zSchema: z.string().min(1, { message: "件名を入力してください" }),
  },
  message: {
    description: "ご用件",
    formType: "textarea",
    inputType: "text",
    zSchema: z
      .string()
      .min(1, { message: "お問い合わせ内容を入力してください" }),
  },
} as const satisfies Record<
  (typeof form)[number],
  {
    description: string;
    formType: "input" | "textarea";
    inputType: HTMLInputTypeAttribute;
    zSchema: ZodType;
  }
>;

const _obj = getEntries(formSchema).map(([k, v]) => [k, v.zSchema]);
const zFormData = z.object(
  Object.fromEntries(_obj) as Record<(typeof form)[number], ZodType>
);
type FormData = z.infer<typeof zFormData>;

const formStyle = css({
  display: "flex",
  flexDir: "column",
  gap: "5",
  "& > div": {
    "& > label": {
      display: "block",
      fontWeight: "bold",
      fontSize: { base: "2xl", mdDown: "xl" },
    },
    "& > input, & > textarea": {
      w: "100%",
      h: "12",
      outline: "1.5px solid",
      rounded: "md",
      p: "2",

      "&:focus": {
        outlineWidth: "2px",
      },
    },
    "& > textarea": {
      minH: "40",
    },
    "& > p": {
      fontSize: "sm",
      color: "9u-red1",
      minH: "5",
    },
  },
});

export function ContactForm(): ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(zFormData),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <p.form
      className={formStyle}
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)();
      }}
      w="100%"
    >
      {getEntries(formSchema).map(
        ([key, { description, formType, inputType, zSchema }]) => (
          <p.div key={key}>
            <p.label htmlFor={key}>
              {description}
              {!zSchema.isOptional() && "*"}
            </p.label>
            {formType === "input" ? (
              <p.input
                id={key}
                type={inputType}
                {...register(key)}
                style={{
                  background: token(
                    errors[key] != null
                      ? "colors.red.100"
                      : "colors.transparent"
                  ),
                  outlineColor: token(
                    errors[key] != null ? "colors.9u-red1" : "colors.9u-brown"
                  ),
                }}
              />
            ) : (
              <p.textarea
                id={key}
                {...register(key)}
                style={{
                  background: token(
                    errors[key] != null
                      ? "colors.red.100"
                      : "colors.transparent"
                  ),
                  outlineColor: token(
                    errors[key] != null ? "colors.9u-red1" : "colors.9u-brown"
                  ),
                }}
              />
            )}
            <p.p>{errors[key]?.message as string}</p.p>
          </p.div>
        )
      )}
      <p.input
        className={css({
          bg: "9u-red1",
          rounded: "md",
          m: "0 auto",
          py: "1",
          px: "20",
          color: "white",
          fontSize: "2xl",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s",
          _disabled: {
            bg: "9u-gray",
            opacity: "0.5",
            cursor: "not-allowed",
          },
        })}
        disabled={!isValid || isSubmitting}
        type="submit"
        value="確認"
      />
    </p.form>
  );
}
