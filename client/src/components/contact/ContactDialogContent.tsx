import { getEntries } from "@client/lib/consts";
import { formSchema } from "@client/lib/services/contact";
import { $contactFormData } from "@client/lib/store/ui";
import { formStyle } from "@client/lib/style";
import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { css } from "panda/css";
import { HStack, VStack, styled as p } from "panda/jsx";
import {
  useEffect,
  useMemo,
  useRef,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import type { SubmitState } from "./ContactDialog";

export function ContactDialogContent({
  submitState,
  handleSubmit,
  setHeight,
}: {
  submitState: SubmitState;
  handleSubmit: () => void;
  setHeight: Dispatch<SetStateAction<number | undefined>>;
}): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const formData = useStore($contactFormData);
  const isSubmitting = useMemo(
    () => submitState?.state === "submitting",
    [submitState],
  );

  useEffect(() => {
    setHeight(ref.current?.offsetHeight);
  }, []);

  return (
    <p.div ref={ref} h="fit-content">
      <AlertDialog.Title
        className={css({
          fontWeight: "bold",
          fontSize: "2xl",
          lineHeight: "1.5",
        })}
      >
        送信してもよろしいですか？
        <p.hr color="9u-brown" />
      </AlertDialog.Title>
      <AlertDialog.Description asChild>
        <VStack alignItems="flex-start" className={formStyle} gap="5" py="2">
          {getEntries(formSchema).map(
            ([key, { description, formType, inputType }]) => (
              <p.div key={key}>
                <p.label htmlFor={key}>{description}</p.label>
                {formType === "input" ? (
                  <p.input
                    disabled
                    id={key}
                    type={inputType}
                    value={formData[key]}
                  />
                ) : (
                  <p.textarea
                    disabled
                    id={key}
                    style={{
                      resize: "none",
                    }}
                    value={formData[key]}
                  />
                )}
              </p.div>
            ),
          )}
        </VStack>
      </AlertDialog.Description>
      <HStack
        className={css({
          "& > button": {
            fontWeight: "bold",
            px: "4",
            py: "1",
            rounded: "md",
            cursor: "pointer",
            "&:disabled": {
              opacity: "0.5",
              pointerEvents: "none",
              cursor: "not-allowed",
            },
          },
        })}
        gap="1"
        justifyContent="flex-end"
      >
        <AlertDialog.Cancel asChild>
          <p.button disabled={isSubmitting}>キャンセル</p.button>
        </AlertDialog.Cancel>
        <p.button
          bg="9u-red1"
          color="white"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          <HStack>
            送信
            <Icon
              icon={
                isSubmitting
                  ? "svg-spinners:ring-resize"
                  : "mdi:invoice-text-send"
              }
            />
          </HStack>
        </p.button>
      </HStack>
    </p.div>
  );
}
