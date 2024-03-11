import { Icon } from "@iconify/react";
import { styled as p } from "panda/jsx";
import type { Token } from "panda/tokens";
import { useEffect, useState, type ReactElement } from "react";

export function BackTo({
  href,
  txt,
  txtColor,
}: {
  href: string;
  txt: string;
  txtColor?: Token;
}): ReactElement {
  const [shouldReturnToHome, setShouldReturnToHome] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnToHome = urlParams.get("returnToHome");
    if (returnToHome != null) {
      setShouldReturnToHome(true);
    }
  }, []);

  return (
    <p.nav className="back-to">
      <p.a
        alignItems="center"
        cursor="pointer"
        display="flex"
        gap={{
          base: "3",
          mdDown: "1",
        }}
        href={shouldReturnToHome ? undefined : href}
        onClick={() => {
          if (shouldReturnToHome) {
            window.history.back();
          }
        }}
        w="fit-content"
      >
        <p.span
          transform={{
            base: "scale(3)",
            mdDown: "scale(2)",
          }}
        >
          <Icon icon="mdi:chevron-left" />
        </p.span>
        <p.p
          color={txtColor}
          fontSize={{
            base: "3xl",
            mdDown: "lg",
          }}
          fontWeight="bold"
        >
          {shouldReturnToHome ? "Home" : txt}
        </p.p>
      </p.a>
    </p.nav>
  );
}
