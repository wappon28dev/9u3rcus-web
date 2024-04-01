import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { Dialog } from "../Dialog";
import { ContactDialogContent } from "./ContactDialogContent";
import { ContactDialogResult } from "./ContactDialogResult";
import { postContactFormData } from "src/lib/services/api";
import { $contactFormData } from "src/lib/store/ui";
import { useStore } from "@nanostores/react";
import type { InferAsyncErrTypes } from "src/lib/types/result";

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
    const res = await postContactFormData(formData);

    if (res.isErr()) {
      setSubmitState({ state: "failure", error: res.error });
      console.warn(res.error);
      return;
    }

    console.log("success!");
    console.log(res.value);
    setSubmitState({
      state: "success",
      acceptDate: new Date(res.value.acceptDate),
    });
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
