import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { css } from "panda/css";
import {
  useState,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";

export function Dialog({
  children,
  content,
}: {
  children: ReactElement;
  content: (
    setIsOpened: Dispatch<SetStateAction<boolean>>,
    setContentHeight: Dispatch<SetStateAction<number | undefined>>,
  ) => ReactElement;
}): ReactElement {
  const [contentHeight, setContentHeight] = useState<number>();
  const [isOpened, setIsOpened] = useState(false);

  return (
    <AlertDialog.Root onOpenChange={setIsOpened} open={isOpened}>
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
            w: "90vw",
            maxW: {
              base: "60vw",
              mdDown: "100%",
            },
            maxH: "90vh",
            transition: "height 0.3s ease",
            p: "5",
            bgColor: "9u-white",
            animation: "fadeIn 0.2s",
            display: "grid",
            zIndex: "modalContent",
            rounded: "md",
            _focus: {
              outline: "none",
            },
          })}
          style={{
            height:
              contentHeight == null
                ? "auto"
                : `calc(${contentHeight}px + var(--spacing-5) * 2)`,
          }}
        >
          {content(setIsOpened, setContentHeight)}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
