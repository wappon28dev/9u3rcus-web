/* eslint-disable no-irregular-whitespace */
import { CopyWrapper } from "@client/components/CopyWrapper";
import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { css } from "panda/css";
import { HStack, VStack, styled as p } from "panda/jsx";
import {
  useEffect,
  useRef,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import { INFO } from "src/lib/config";
import { getEntries } from "src/lib/consts";
import { formSchema, type ContactFormData } from "src/lib/services/contact";
import { $contactFormData } from "src/lib/store/ui";
import { formStyle } from "src/lib/style";
import type { SubmitState } from "./ContactDialog";

const alertDialogTitleStyle = css({
  fontWeight: "bold",
  fontSize: "2xl",
  lineHeight: "1.5",
});

const buttonStyle = css({
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
});

const getBodyText =
  (formData: ContactFormData) =>
  (errorReason: string): string =>
    `
Contact からお問い合わせしたところ、送信に失敗したので再度お問い合わせします。

--- お問い合わせ内容 ---
  ${getEntries(formSchema)
    .filter(([key]) => formData[key] !== "")
    .map(
      ([key, { description }]) =>
        `
${description}:
  ${formData[key]}
  `,
    )
    .join("")}

--- エラー内容 ---
  ${errorReason} 
  `.trim();

const getMailTo =
  (formData: ContactFormData) =>
  (errorReason: string): string => {
    const obj = {
      subject: formData.subject,
      body: getBodyText(formData)(errorReason),
    };
    const query = new URLSearchParams(obj).toString();
    return `mailto:${INFO.addr.email.contact}?${query}`;
  };

function CloseButton({ onClick }: { onClick: () => void }): ReactElement {
  return (
    <p.button
      bg="9u-red1"
      className={buttonStyle}
      color="white"
      onClick={onClick}
    >
      閉じる
    </p.button>
  );
}

function CopyableFormBase({
  id,
  label,
  value,
  children,
}: {
  id: string;
  label: string;
  value: string;
  children: ReactElement;
}): ReactElement {
  return (
    <p.div w="100%">
      <p.label htmlFor={id}>{label}</p.label>
      <p.div
        alignItems="flex-end"
        display="flex"
        gap="2"
        justifyContent="space-between"
      >
        {children}
        <p.div py="2">
          <CopyWrapper copyText={value} titleText={`${label}をコピー`}>
            <p.span />
          </CopyWrapper>
        </p.div>
      </p.div>
    </p.div>
  );
}

function CopyableForm({
  id,
  label,
  value,
  needTextarea = false,
}: {
  id: string;
  label: string;
  value: string;
  needTextarea?: boolean;
}): ReactElement {
  return (
    <CopyableFormBase id={id} label={label} value={value}>
      {needTextarea ? (
        <p.textarea
          disabled
          id={id}
          style={{
            resize: "none",
          }}
          value={value}
        />
      ) : (
        <p.input disabled id={id} type="text" value={value} w="100%" />
      )}
    </CopyableFormBase>
  );
}

function Failure({
  submitState,
  setSubmitState,
}: {
  submitState: SubmitState;
  setSubmitState: Dispatch<SetStateAction<SubmitState>>;
}): ReactElement {
  const formData = useStore($contactFormData);

  if (submitState.state !== "failure") return <p.div />;

  return (
    <>
      <AlertDialog.Title className={alertDialogTitleStyle}>
        送信に失敗しました
        <p.hr color="9u-brown" />
      </AlertDialog.Title>
      <AlertDialog.Description asChild>
        <VStack alignItems="start" py="4" w="100%">
          <p.p>
            {submitState.error.code === "NETWORK_ERROR" ? (
              <>
                お問い合わせを送信する際にネットワークエラーが発生しました。インターネット接続を確認の上、再度お試しください。
                <p.br />
                それでも問題が解決しない場合、お手数ですが、{" "}
              </>
            ) : (
              <>
                お問い合わせを送信する段階でシステムエラーが発生しました。
                <p.br />
                お手数ですが、{" "}
              </>
            )}
            <CopyWrapper
              copyText={INFO.addr.email.contact}
              titleText="メールアドレスをコピー"
            >
              <p.span>{INFO.addr.email.contact}</p.span>
            </CopyWrapper>{" "}
            まで再度本文を添えてご連絡いただくことで対応が可能です。 <p.br />
            この度はご不便をおかけし誠に申し訳ありません。
          </p.p>
          <p.hr color="9u-gray" w="100%" />
          <VStack gap="2" w="100%">
            <VStack
              alignItems="flex-start"
              className={formStyle}
              gap="5"
              py="2"
              w="100%"
            >
              <CopyableForm
                id="from"
                label="宛先"
                value={INFO.addr.email.contact}
              />
              <CopyableForm
                id="subject"
                label="件名"
                value={formData.subject}
              />
              <CopyableForm
                id="body"
                label="本文"
                needTextarea
                value={getBodyText(formData)(submitState.error.code)}
              />
            </VStack>
          </VStack>
        </VStack>
      </AlertDialog.Description>
      <HStack gap="2" justifyContent="flex-end">
        <p.a href={getMailTo(formData)(submitState.error.code)}>
          <HStack p="2">
            <p.p>メールを送信</p.p>
            <Icon icon="material-symbols:outgoing-mail" />
          </HStack>
        </p.a>
        <CloseButton
          onClick={() => {
            setSubmitState({ state: "confirming" });
          }}
        />
      </HStack>
    </>
  );
}

function Success({
  setSubmitState,
}: {
  setSubmitState: Dispatch<SetStateAction<SubmitState>>;
}): ReactElement {
  return (
    <>
      <AlertDialog.Title className={alertDialogTitleStyle}>
        送信が完了しました
        <p.hr color="9u-brown" />
      </AlertDialog.Title>
      <AlertDialog.Description asChild>
        <p.div alignItems="start" py="4" w="100%">
          <p.p>
            この度はお問い合わせいただき誠にありがとうございます。
            <p.br />
            ご入力いただいたメールアドレス宛に自動送信メールを送信いたしましたのでご確認ください。
            <p.br />
            お問い合わせいただいた時期によって返信まで3日ほどの期間を要する可能性がありますので、それまでお待ちいただけると幸いです。
            <p.br />
          </p.p>
        </p.div>
      </AlertDialog.Description>
      <HStack gap="1" justifyContent="flex-end">
        <CloseButton
          onClick={() => {
            setSubmitState({ state: "confirming" });
          }}
        />
      </HStack>
    </>
  );
}

export function ContactDialogResult({
  submitState,
  setSubmitState,
  setHeight,
}: {
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
      {(() => {
        switch (submitState.state) {
          case "success":
            return <Success setSubmitState={setSubmitState} />;
          case "failure":
            return (
              <Failure
                setSubmitState={setSubmitState}
                submitState={submitState}
              />
            );
          default:
            return <p.p>このメッセージが 見れるのは おかしいよ</p.p>;
        }
      })()}
    </p.div>
  );
}
