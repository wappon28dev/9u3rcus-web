import { waitMs } from "@client/lib/consts";
import { Icon } from "@iconify/react";
import { styled as p } from "panda/jsx";
import { useRef, useState, type ReactElement, type ReactNode } from "react";

export function CopyWrapper({
  copyText,
  titleText,
  children,
}: {
  copyText: string;
  titleText?: string;
  children: ReactNode;
}): ReactElement {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setSelection = (isSelected: boolean): void => {
    const selection = window.getSelection();
    const range = document.createRange();

    if (ref.current == null) throw new Error("ref.current is null");
    if (selection == null) throw new Error("selection is null");

    if (isSelected) {
      range.selectNode(ref.current);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      selection.removeAllRanges();
    }
  };

  const copyToClipboard = async (): Promise<void> => {
    if (copied) return;
    await navigator.clipboard.writeText(copyText);
    setSelection(true);
    setCopied(true);

    await waitMs(2000);
    setSelection(false);
    setCopied(false);
  };

  return (
    <p.span display="inline-flex" gap="2">
      <p.span ref={ref}>{children}</p.span>
      <p.button
        onClick={() => {
          void copyToClipboard();
        }}
        style={{
          cursor: copied ? "default" : "pointer",
        }}
        title={titleText ?? "クリップボードにコピー"}
      >
        <Icon icon={copied ? "mdi:check" : "mdi:content-copy"} />
      </p.button>
    </p.span>
  );
}
