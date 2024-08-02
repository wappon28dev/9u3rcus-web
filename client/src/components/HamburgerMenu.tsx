import { $hamburgerMenuOpened } from "@client/lib/store/ui";
import { useStore } from "@nanostores/react";
import { styled as p } from "panda/jsx";
import { token } from "panda/tokens";
import { type ReactElement, type ComponentProps, useEffect } from "react";
import { HeaderBody } from "./HeaderBody";
import { type Header } from "./_Header";

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
      position="fixed"
      style={{
        opacity: isOpened ? 1 : 0,
        visibility: isOpened ? "visible" : "hidden",
        backgroundColor: token(bgColor),
      }}
      transition="opacity .2s ease-in-out, visibility .21s ease-in-out"
      width="100%"
      zIndex="header"
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
