import { token, type Token } from "panda/tokens";
import {
  useState,
  type ReactElement,
  useEffect,
  type CSSProperties,
} from "react";
import { HeaderBody } from "./HeaderBody";
import { $hamburgerMenuOpened } from "@/lib/store/ui";

export function Header({
  hideBeforeHero = false,
  bgColor = "colors.9u-white",
  navAndLogoColor = "colors.9u-brown",
}: {
  hideBeforeHero?: boolean;
  bgColor?: Token;
  navAndLogoColor?: Token;
}): ReactElement {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries.at(0)?.isIntersecting ?? false;
      setShouldShow(!isIntersecting);
    });

    const hero = document.getElementById("hero");
    if (hero != null) {
      observer?.observe(hero);
    } else {
      setShouldShow(true);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  const fixedStyle = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      background: token(shouldShow ? bgColor : "colors.transparent"),
    },
    logo: {
      opacity: shouldShow ? 1 : 0,
      pointerEvents: shouldShow ? "auto" : "none",
    },
    nav: {
      color: token(shouldShow ? "colors.9u-brown" : "colors.9u-white"),
    },
  } as const satisfies Record<string, CSSProperties>;

  return (
    <HeaderBody
      externalStyle={{
        container: {
          background: token(bgColor),
          ...(hideBeforeHero && fixedStyle.container),
        },
        logo: {
          color: token(navAndLogoColor),
          ...(hideBeforeHero && fixedStyle.logo),
        },
        nav: {
          color: token(navAndLogoColor),
          ...(hideBeforeHero && fixedStyle.nav),
        },
      }}
      navIconClosed={false}
      onNavIconClick={() => {
        $hamburgerMenuOpened.set(true);
      }}
    />
  );
}
