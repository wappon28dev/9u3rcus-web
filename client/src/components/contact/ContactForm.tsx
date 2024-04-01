import { getEntries } from "@client/lib/consts";
import {
  zContactFormData,
  type ContactFormDataKey,
  type ContactFormData,
  formSchema,
} from "@client/lib/services/contact";
import { $contactFormData } from "@client/lib/store/ui";
import { formStyle } from "@client/lib/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { css } from "panda/css";
import { VStack, styled as p } from "panda/jsx";
import { token } from "panda/tokens";
import { useState, type ReactElement, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { ContactDialog } from "./ContactDialog";
import { Captcha, type CaptchaStatus } from "../Captcha";

export function ContactForm(): ReactElement {
  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>();
  const formData = useStore($contactFormData);
  const {
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

  return (
    <p.form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      w="100%"
    >
      <VStack alignItems="flex-start" className={formStyle} gap="5" py="2">
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
                      errors[key] != null
                        ? "colors.9u-red1"
                        : "colors.9u-brown",
                    ),
                  }}
                  type={inputType}
                  {...register(key)}
                />
              ) : (
                <p.textarea
                  id={key}
                  maxH="70vh"
                  mb="0"
                  minH="40"
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
                      errors[key] != null
                        ? "colors.9u-red1"
                        : "colors.9u-brown",
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
            <Captcha setCaptchaStatus={setCaptchaStatus} />
          </p.div>
          <p.p color="9u-red1" fontSize="sm" minH="5" textAlign="center">
            {captchaStatus === "error" &&
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
            disabled={!(isValid && captchaStatus === "passed" && !isSubmitting)}
            onPointerDown={() => {
              void trigger();
            }}
            type="submit"
            value="確認"
          />
        </ContactDialog>
      </VStack>
    </p.form>
  );
}
