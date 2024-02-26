import type { ReactElement } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { css } from "panda/css";
import { styled as p } from "panda/jsx";

export function ContactDialog({
  children,
}: {
  children: ReactElement;
}): ReactElement {
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
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxW: "500px",
            maxH: "85vh",
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
              mb: "20px",
              fontWeight: "bold",
              fontSize: "2xl",
              lineHeight: "1.5",
            })}
          >
            送信してもよろしいですか？
          </AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
