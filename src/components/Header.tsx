import { useState, type ReactElement, useEffect } from "react";
import { styled as p } from "panda/jsx";
import logoIcon from "@public/assets/img/logo_icon.svg";
import logoTitle from "@public/assets/img/logo_title.svg";
import { token } from "panda/tokens";
import { INFO } from "@/lib/config";

export function Header(): ReactElement {
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

  return (
    <p.div
      alignItems="center"
      bg="9u-white"
      display="flex"
      h="max-content"
      justifyContent="space-between"
      left="0"
      position="fixed"
      px="20"
      py="10"
      style={{
        background: shouldShow ? token("colors.9u-white") : "transparent",
      }}
      top="0"
      transition="background 0.3s"
      width="100%"
    >
      <p.a
        alignItems="center"
        display="flex"
        gap="9"
        height="max-content"
        href="/"
        style={{
          opacity: shouldShow ? 1 : 0,
          pointerEvents: shouldShow ? "auto" : "none",
        }}
        transition="opacity 0.3s"
      >
        <p.img
          alt={INFO.name.full}
          src={logoIcon.src}
          style={{
            height: "50px",
          }}
        />
        <p.img
          alt={INFO.name.full}
          src={logoTitle.src}
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
        style={{
          color: shouldShow
            ? token("colors.9u-brown")
            : token("colors.9u-white"),
        }}
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
