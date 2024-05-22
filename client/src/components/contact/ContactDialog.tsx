/* eslint-disable no-console */
import { Dialog } from "@client/components/Dialog";
import { useStore } from "@nanostores/react";
import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { postContactFormData } from "src/lib/services/api";
import { $contactFormData } from "src/lib/store/ui";
import type { InferAsyncErrTypes } from "src/lib/types/result";
import { ContactDialogContent } from "./ContactDialogContent";
import { ContactDialogResult } from "./ContactDialogResult";

export type SubmitState =
  | {
      state: "confirming" | "submitting";
    }
  | {
      state: "success";
      acceptDate: Date;
    }
  | {
      state: "failure";
      error: InferAsyncErrTypes<ReturnType<typeof postContactFormData>>;
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
  const formData = useStore($contactFormData);

  useEffect(() => {
    setSubmitState({ state: "confirming" });
  }, []);

  async function handleSubmit(): Promise<void> {
    setSubmitState({ state: "submitting" });

    console.log("submitting...");
    void postContactFormData(formData).match(
      (res) => {
        console.log("success!");
        console.log(res);
        setSubmitState({
          state: "success",
          acceptDate: new Date(res.acceptDate),
        });
      },
      (err) => {
        setSubmitState({ state: "failure", error: err });
        console.warn(err);
      },
    );
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
