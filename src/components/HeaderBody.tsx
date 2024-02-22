import { type ReactElement, type CSSProperties } from "react";
import { styled as p } from "panda/jsx";
import { token } from "panda/tokens";
import { Icon } from "@iconify/react";
import { css } from "panda/css";
import { INFO } from "@/lib/config";

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
  return (
    <p.div
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
        onClick={onAnchorClick}
        style={externalStyle?.logo}
        transition="opacity 0.3s"
      >
        <p.img
          alt={INFO.name.full}
          decoding="async"
          h={{
            base: "50px",
            mdDown: "40px",
            seDown: "30px",
          }}
          loading="eager"
          src="/assets/img/logo_icon.svg"
        />
        <p.img
          alt="logo"
          decoding="async"
          h={{
            base: "40px",
            mdDown: "30px",
            seDown: "20px",
          }}
          loading="eager"
          src={
            externalStyle?.logo?.color === token("colors.9u-white")
              ? "/assets/img/logo_title_white.svg"
              : "/assets/img/logo_title_brown.svg"
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
          <p.a href="/works" onClick={onAnchorClick}>
            Works
          </p.a>
          <p.a href="/blogs" onClick={onAnchorClick}>
            Blog
          </p.a>
          <p.a href="/about" onClick={onAnchorClick}>
            About
          </p.a>
          <p.a href="/contact" onClick={onAnchorClick}>
            Contact
          </p.a>
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
    </p.div>
  );
}
