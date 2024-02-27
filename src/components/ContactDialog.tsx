import type { ReactElement } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { css } from "panda/css";
import { VStack, styled as p } from "panda/jsx";
import { useStore } from "@nanostores/react";
import { $contactFormData } from "@/lib/store/ui";
import { getEntries } from "@/lib/constants";
import { formSchema } from "@/lib/services/contact";

const formStyle = css({
  "& > div": {
    w: "100%",
    "& > label": {
      display: "block",
      fontWeight: "bold",
      fontSize: { base: "xl", mdDown: "md" },
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
      h: "40",
      mb: "0",
    },
    "& > p": {
      fontSize: "sm",
      color: "9u-red1",
      minH: "5",
    },
  },
});

export function ContactDialog({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const formData = useStore($contactFormData);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className={css({
            bg: "rgba(0, 0, 0, 0.4)",
            position: "fixed",
            inset: 0,
            zIndex: "modal",
            "&[data-state='open']": {
              animation: "fadeIn 100ms ease-out",
            },
            "&[data-state='closed']": {
              animation: "fadeOut 100ms ease-out",
            },
          })}
        />
        <AlertDialog.Content
          className={css({
            position: "fixed",
            top: "50%",
            overflowY: "auto",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxW: {
              base: "60vw",
              mdDown: "100%",
            },
            maxH: {
              base: "85vh",
              mdDown: "90vh",
            },
            p: "5",
            bgColor: "9u-white",
            animation: "fadeIn 0.2s",
            zIndex: "modalContent",
            rounded: "md",
            _focus: {
              outline: "none",
            },
          })}
        >
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
          <AlertDialog.Description>
            <VStack
              alignItems="flex-start"
              className={formStyle}
              gap="5"
              py="2"
            >
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
                      <p.textarea disabled id={key} value={formData[key]} />
                    )}
                  </p.div>
                )
              )}
            </VStack>
          </AlertDialog.Description>
          <p.div
            className={css({
              "& > button": {
                fontWeight: "bold",
                px: "4",
                py: "1",
                rounded: "md",
                cursor: "pointer",
              },
            })}
            display="flex"
            gap="1"
            justifyContent="flex-end"
          >
            <AlertDialog.Cancel asChild>
              <p.button>キャンセル</p.button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <p.button bg="9u-red1" color="white">
                送信
              </p.button>
            </AlertDialog.Action>
          </p.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
