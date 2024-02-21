import {
  useState,
  type ReactElement,
  useEffect,
  type CSSProperties,
} from "react";
import { styled as p } from "panda/jsx";
import { token } from "panda/tokens";
import { INFO } from "@/lib/config";

export function Header({
  isFixed = false,
}: {
  isFixed?: boolean;
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
  }, []);

  const fixedStyle: Record<string, CSSProperties> = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      background: shouldShow ? token("colors.9u-white") : "transparent",
      zIndex: 100,
    },
    logo: {
      opacity: shouldShow ? 1 : 0,
      pointerEvents: shouldShow ? "auto" : "none",
    },
    nav: {
      color: shouldShow ? token("colors.9u-brown") : token("colors.9u-white"),
    },
  };

  return (
    <p.div
      alignItems="center"
      bg="9u-white"
      display="flex"
      h="max-content"
      justifyContent="space-between"
      px="20"
      py="10"
      style={isFixed ? fixedStyle.container : {}}
      transition="background 0.3s"
      width="100%"
    >
      <p.a
        alignItems="center"
        display="flex"
        gap="9"
        height="max-content"
        href="/"
        style={isFixed ? fixedStyle.logo : {}}
        transition="opacity 0.3s"
      >
        <p.img
          alt={INFO.name.full}
          src="/assets/img/logo_icon.svg"
          style={{
            height: "50px",
          }}
        />
        <p.img
          alt={INFO.name.full}
          src="/assets/img/logo_title.svg"
          style={{
            height: "40px",
          }}
          transform="translateY(3px)"
        />
      </p.a>
      <p.section
        display="flex"
        fontSize="lg"
        gap="5"
        style={isFixed ? fixedStyle.nav : {}}
        transition="color 0.3s"
      >
        <p.a href="/works">Works</p.a>
        <p.a href="/blogs">Blog</p.a>
        <p.a href="/about">About</p.a>
        <p.a href="/contact">Contact</p.a>
      </p.section>
    </p.div>
  );
}
