import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { Dialog } from "../Dialog";
import { ContactDialogContent } from "./ContactDialogContent";
import { ContactDialogResult } from "./ContactDialogResult";
import { waitMs } from "@/lib/consts";

export type SubmitState =
  | {
      state: "confirming";
    }
  | {
      state: "submitting";
    }
  | {
      state: "success";
      acceptDate: Date;
    }
  | {
      state: "failure";
      error: Error;
    };

export function ContactDialog({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [submitState, setSubmitState] = useState<SubmitState>({
    state: "confirming",
  });
  const shouldShowConfirm = useMemo(
    () =>
      submitState.state === "confirming" || submitState.state === "submitting",
    [submitState],
  );

  useEffect(() => {
    setSubmitState({ state: "confirming" });
  }, []);

  async function handleSubmit(): Promise<void> {
    setSubmitState({ state: "submitting" });
    await waitMs(3000);
    setSubmitState({ state: "success", acceptDate: new Date() });
  }

  return (
    <Dialog
      content={(_, setContentHeight) =>
        shouldShowConfirm ? (
          <ContactDialogContent
            handleSubmit={() => {
              void handleSubmit();
            }}
            setHeight={setContentHeight}
            submitState={submitState}
          />
        ) : (
          <ContactDialogResult
            setHeight={setContentHeight}
            setSubmitState={setSubmitState}
            submitState={submitState}
          />
        )
      }
    >
      {children}
    </Dialog>
  );
}
