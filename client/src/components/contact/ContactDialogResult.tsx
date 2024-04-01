import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { css } from "panda/css";
import { HStack, styled as p } from "panda/jsx";
import {
  useEffect,
  useRef,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import type { SubmitState } from "./ContactDialog";

function Success({
  setSubmitState,
}: {
  setSubmitState: Dispatch<SetStateAction<SubmitState>>;
}): ReactElement {
  return (
    <>
      <AlertDialog.Title
        className={css({
          fontWeight: "bold",
          fontSize: "2xl",
          lineHeight: "1.5",
        })}
      >
        送信が完了しました
        <p.hr color="9u-brown" />
      </AlertDialog.Title>
      <AlertDialog.Description asChild>
        <p.div h="200px" p="3">
          <p.p textAlign="center">本文です。</p.p>
        </p.div>
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
        <p.button
          bg="9u-red1"
          color="white"
          onClick={() => {
            setSubmitState({ state: "confirming" });
          }}
        >
          閉じる
        </p.button>
      </HStack>
    </>
  );
}

export function ContactDialogResult({
  setSubmitState,
  setHeight,
}: {
  // eslint-disable-next-line react/no-unused-prop-types
  submitState: SubmitState;
  setSubmitState: Dispatch<SetStateAction<SubmitState>>;
  setHeight: Dispatch<SetStateAction<number | undefined>>;
}): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(ref.current?.offsetHeight);
  }, []);

  return (
    <p.div ref={ref} h="fit-content">
      <Success setSubmitState={setSubmitState} />
    </p.div>
  );
}
