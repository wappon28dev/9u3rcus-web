import { INFO } from "@client/lib/config";
import { Icon } from "@iconify/react";
import { css } from "panda/css";
import { styled as p } from "panda/jsx";
import { token } from "panda/tokens";
import { type ReactElement, type CSSProperties, useEffect } from "react";

export function HeaderBody({
  externalStyle,
  navIconClosed = false,
  onAnchorClick = () => {},
  onNavIconClick = () => {},
}: {
  externalStyle?: Record<"container" | "logo" | "nav", CSSProperties>;
  navIconClosed: boolean;
  onAnchorClick?: () => void;
  onNavIconClick?: () => void;
}): ReactElement {
  const shouldWhite = externalStyle?.logo?.color === token("colors.9u-white");

  // リンク遷移時にハンバーガーメニューを閉じる
  useEffect(() => {
    const elements = document.querySelectorAll("a");
    elements.forEach((e) => {
      e.addEventListener("click", onAnchorClick);
    });

    return () => {
      elements.forEach((e) => {
        e.removeEventListener("click", onAnchorClick);
      });
    };
  }, []);

  return (
    <p.header
      alignItems="center"
      bg="transparent"
      display="flex"
      justifyContent="space-between"
      position="sticky"
      px={{
        base: "20",
        mdDown: "5",
      }}
      py={{
        base: "10",
        mdDown: "5",
      }}
      style={externalStyle?.container}
      top="0"
      transition="background 0.3s"
      width="100%"
      zIndex="header"
    >
      <p.a
        alignItems="center"
        display="flex"
        gap={{
          base: "10",
          mdDown: "4",
        }}
        height="max-content"
        href="/"
        style={externalStyle?.logo}
        transition="opacity 0.3s"
      >
        <p.img
          alt={INFO.name.full}
          decoding="async"
          h={{
            base: "50px",
            mdDown: "30px",
          }}
          loading="eager"
          src="/assets/images/logos/icon.svg"
        />
        <p.img
          alt="logo"
          decoding="async"
          h={{
            base: "40px",
            mdDown: "25px",
          }}
          loading="eager"
          src={
            shouldWhite
              ? "/assets/images/logos/title-white.svg"
              : "/assets/images/logos/title-brown.svg"
          }
          transform="translateY(2px)"
        />
      </p.a>
      <p.section
        fontSize="lg"
        style={externalStyle?.nav}
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
          className={css({
            "& svg": {
              height: {
                base: "40px",
                seDown: "30px",
              },
              width: "auto",
            },
          })}
          cursor="pointer"
          display={{
            base: "none",
            lgDown: "flex",
          }}
          onClick={onNavIconClick}
        >
          <Icon icon={navIconClosed ? "mdi:close" : "mdi:menu"} />
        </p.nav>
      </p.section>
    </p.header>
  );
}
