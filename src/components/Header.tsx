import {
  useState,
  type ReactElement,
  useEffect,
  type CSSProperties,
} from "react";
import { styled as p } from "panda/jsx";
import { token, type Token } from "panda/tokens";
import { INFO } from "@/lib/config";

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
    <p.header
      alignItems="center"
      bg="transparent"
      display="flex"
      h="max-content"
      justifyContent="space-between"
      position="sticky"
      px="20"
      py="10"
      style={{
        background: token(bgColor),
        ...(hideBeforeHero && fixedStyle.container),
      }}
      top="0"
      transition="background 0.3s"
      width="100%"
      zIndex="100"
    >
      <p.a
        alignItems="center"
        display="flex"
        gap="9"
        height="max-content"
        href="/"
        style={{ ...(hideBeforeHero && fixedStyle.logo) }}
        transition="opacity 0.3s"
      >
        <p.img
          alt={INFO.name.full}
          src="/assets/img/logo_icon.svg"
          style={{
            height: "50px",
          }}
        />
        {/* <ReactSVG
          className={css({
            transform: "translateY(3px)",
            "& .injected-svg": {
              fill: "var(--svg-logo-title-fill)",
              width: "auto",
              height: "40px",
            },
          })}
          src="/assets/img/logo_title.svg"
          style={{
            // @ts-expect-error: CSS 変数を Panda CSS へ渡すための型定義が不足している
            "--svg-logo-title-fill": token(navAndLogoColor),
          }}
        /> */}
        <p.img
          alt="logo"
          decoding="async"
          height="40px"
          loading="lazy"
          src={
            navAndLogoColor === "colors.9u-white"
              ? "/assets/img/logo_title_white.svg"
              : "/assets/img/logo_title_brown.svg"
          }
        />
      </p.a>
      <p.section
        display="flex"
        fontSize="lg"
        gap="5"
        style={{
          color: token(navAndLogoColor),
          ...(hideBeforeHero && fixedStyle.nav),
        }}
        transition="color 0.3s"
      >
        <p.a href="/works">Works</p.a>
        <p.a href="/blogs">Blog</p.a>
        <p.a href="/about">About</p.a>
        <p.a href="/contact">Contact</p.a>
      </p.section>
    </p.header>
  );
}
