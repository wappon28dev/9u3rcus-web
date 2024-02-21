import {
  useState,
  type ReactElement,
  useEffect,
  type CSSProperties,
} from "react";
import { styled as p } from "panda/jsx";
import { token, type Token } from "panda/tokens";
import { Icon } from "@iconify/react";
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
      justifyContent="space-between"
      position="sticky"
      px={{
        base: "20",
        mdDown: "10",
      }}
      py={{
        base: "10",
        mdDown: "5",
      }}
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
        gap={{
          base: "10",
          mdDown: "5",
        }}
        height="max-content"
        href="/"
        style={{ ...(hideBeforeHero && fixedStyle.logo) }}
        transition="opacity 0.3s"
      >
        <p.img
          alt={INFO.name.full}
          decoding="async"
          h={{
            base: "50px",
            mdDown: "40px",
          }}
          loading="lazy"
          src="/assets/img/logo_icon.svg"
        />
        <p.img
          alt="logo"
          decoding="async"
          height={{
            base: "40px",
            mdDown: "30px",
          }}
          loading="lazy"
          src={
            navAndLogoColor === "colors.9u-white"
              ? "/assets/img/logo_title_white.svg"
              : "/assets/img/logo_title_brown.svg"
          }
        />
      </p.a>
      <p.section
        fontSize="lg"
        style={{
          color: token(navAndLogoColor),
          ...(hideBeforeHero && fixedStyle.nav),
        }}
        transition="color 0.3s"
      >
        <p.nav
          display={{
            base: "flex",
            lgDown: "none",
          }}
          gap="5"
        >
          <p.a href="/works">Works</p.a>
          <p.a href="/blogs">Blog</p.a>
          <p.a href="/about">About</p.a>
          <p.a href="/contact">Contact</p.a>
        </p.nav>
        <p.nav
          display={{
            base: "none",
            lgDown: "flex",
          }}
        >
          <Icon
            height={40}
            icon="mdi:menu"
            style={{
              color: token(navAndLogoColor),
              ...(hideBeforeHero && fixedStyle.nav),
            }}
          />
        </p.nav>
      </p.section>
    </p.header>
  );
}
