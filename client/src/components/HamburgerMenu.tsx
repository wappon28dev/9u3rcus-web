import { type ReactElement, type ComponentProps, useEffect } from "react";
import { styled as p } from "panda/jsx";
import { token } from "panda/tokens";
import { useStore } from "@nanostores/react";
import { $hamburgerMenuOpened } from "@/lib/store/ui";
import { type Header } from "./_Header";
import { HeaderBody } from "./HeaderBody";

export function HamburgerMenu({
  bgColor = "colors.9u-white",
  navAndLogoColor = "colors.9u-brown",
}: ComponentProps<typeof Header>): ReactElement {
  const isOpened = useStore($hamburgerMenuOpened);

  const closeMenu = (): void => {
    $hamburgerMenuOpened.set(false);
  };

  const noScroll = (event: Event): void => {
    event.preventDefault();
  };

  // NOTE: ハンバーガーメニュー自体にスクロールが発生しないことが前提
  $hamburgerMenuOpened.listen((opened) => {
    if (opened) {
      document.addEventListener("touchmove", noScroll, { passive: false });
      document.addEventListener("wheel", noScroll, { passive: false });
    } else {
      document.removeEventListener("touchmove", noScroll);
      document.removeEventListener("wheel", noScroll);
    }
  });

  useEffect(() => {
    window.onpopstate = closeMenu;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <p.div
      aria-expanded={isOpened}
      aria-hidden={!isOpened}
      height="100%"
      left="0"
      overflow="auto"
      position="fixed"
      style={{
        clipPath: isOpened ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        backgroundColor: token(bgColor),
      }}
      transition="clip-path .3s ease-in-out"
      width="100%"
      zIndex="100"
    >
      <HeaderBody
        externalStyle={{
          container: {
            background: token(bgColor),
          },
          logo: {
            color: token(navAndLogoColor),
          },
          nav: {
            color: token(navAndLogoColor),
          },
        }}
        navIconClosed
        onAnchorClick={closeMenu}
        onNavIconClick={closeMenu}
      />
      <p.section
        display="flex"
        flexDir="column"
        fontSize="4xl"
        fontWeight="bold"
        gap="10"
        justifyContent="center"
        m="0 auto"
        pt="20"
        style={{
          color: token(navAndLogoColor),
        }}
        textAlign="center"
        w="fit-content"
      >
        <p.a href="/works" onClick={closeMenu}>
          Works
        </p.a>
        <p.a href="/blogs" onClick={closeMenu}>
          Blog
        </p.a>
        <p.a href="/about" onClick={closeMenu}>
          About
        </p.a>
        <p.a href="/contact" onClick={closeMenu}>
          Contact
        </p.a>
      </p.section>
    </p.div>
  );
}
