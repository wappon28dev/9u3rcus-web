import { useState, type ReactElement, type FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { styled as p } from "panda/jsx";
import { css } from "panda/css";
import { token } from "panda/tokens";
import { Turnstile } from "@marsidev/react-turnstile";
import { useStore } from "@nanostores/react";
import { getEntries } from "@/lib/constants";
import { ContactDialog } from "./ContactDialog";
import { $contactFormData } from "@/lib/store/ui";
import {
  zContactFormData,
  type ContactFormDataKey,
  type ContactFormData,
  formSchema,
} from "@/lib/services/contact";

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
      mb: "1",
      "&:focus": {
        outlineWidth: "2px",
      },
    },
    "& > textarea": {
      minH: "40",
      maxH: "70vh",
      mb: "0",
    },
    "& > p": {
      fontSize: "sm",
      color: "9u-red1",
      minH: "5",
    },
  },
});

export function ContactForm(): ReactElement {
  const [turnstileState, setTurnstileState] = useState<"passed" | "error">();
  const formData = useStore($contactFormData);
  const {
    handleSubmit,
    register,
    trigger,

    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: formData,
    resolver: zodResolver(zContactFormData),
  });

  const resizeTextarea = (e: FormEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLInputElement;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const saveFormData = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: ContactFormDataKey,
  ): void => {
    const data = e.target as HTMLInputElement;
    $contactFormData.set({ ...formData, [key]: data.value });
  };

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
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
        ([key, { description, formType, inputType }]) => (
          <p.div key={key}>
            <p.label htmlFor={key}>
              {description}
              {!zContactFormData.shape[key].isOptional() && "*"}
            </p.label>
            {formType === "input" ? (
              <p.input
                id={key}
                onInput={(e) => {
                  saveFormData(e, key);
                }}
                style={{
                  background: token(
                    errors[key] != null
                      ? "colors.red.100"
                      : "colors.transparent",
                  ),
                  outlineColor: token(
                    errors[key] != null ? "colors.9u-red1" : "colors.9u-brown",
                  ),
                }}
                type={inputType}
                {...register(key)}
              />
            ) : (
              <p.textarea
                id={key}
                onInput={(e) => {
                  saveFormData(e, key);
                  resizeTextarea(e);
                }}
                style={{
                  background: token(
                    errors[key] != null
                      ? "colors.red.100"
                      : "colors.transparent",
                  ),
                  outlineColor: token(
                    errors[key] != null ? "colors.9u-red1" : "colors.9u-brown",
                  ),
                }}
                {...register(key)}
              />
            )}
            <p.p>{errors[key]?.message}</p.p>
          </p.div>
        ),
      )}
      <p.div>
        <p.div m="0 auto" mb="1" w="fit-content">
          <Turnstile
            onError={() => {
              setTurnstileState("error");
            }}
            onExpire={() => {
              setTurnstileState("error");
            }}
            onSuccess={() => {
              setTurnstileState("passed");
            }}
            options={{
              theme: "light",
            }}
            siteKey={import.meta.env.PUBLIC_CF_TURNSTILE_SITE_KEY}
          />
        </p.div>
        <p.p color="9u-red1" fontSize="sm" minH="5" textAlign="center">
          {turnstileState === "error" &&
            "CAPTCHA 認証に失敗したようです。ページを再読み込みをしてください。"}
        </p.p>
      </p.div>
      <ContactDialog>
        <p.input
          className={css({
            bg: "9u-red1",
            rounded: "md",
            w: "fit-content",
            m: "0 auto",
            py: "1",
            px: "20",
            color: "white",
            fontSize: "2xl",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s, opacity 0.3s",
            _disabled: {
              bg: "9u-gray",
              opacity: "0.5",
              cursor: "not-allowed",
            },
          })}
          disabled={!isValid || turnstileState !== "passed" || isSubmitting}
          onPointerDown={() => {
            void trigger();
          }}
          type="submit"
          value="確認"
        />
      </ContactDialog>
    </p.form>
  );
}