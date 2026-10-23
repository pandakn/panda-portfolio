"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "../smooth-scroll/SmoothScroll";

export default function AvatarIcon() {
  const iconRef = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPreference();

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const originalHref = favicon?.getAttribute("href");
    let timer: number | undefined;

    function showExpression(alternate: boolean) {
      if (icon) icon.dataset.expression = alternate ? "alternate" : "smile";
      if (favicon)
        favicon.href = alternate
          ? "/avatar-alternate.svg"
          : "/avatar-smile.svg";
    }

    function swap(alternate: boolean) {
      showExpression(alternate);
      timer = window.setTimeout(() => swap(!alternate), alternate ? 780 : 5220);
    }

    function restart() {
      window.clearTimeout(timer);
      showExpression(false);
      if (!reduced && !document.hidden)
        timer = window.setTimeout(() => swap(true), 5220);
    }

    restart();
    document.addEventListener("visibilitychange", restart);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", restart);
      if (favicon && originalHref) favicon.setAttribute("href", originalHref);
    };
  }, [reduced]);

  return (
    <span
      ref={iconRef}
      className="avatar-icon"
      data-expression="smile"
      aria-hidden="true"
    >
      <Image
        src="/avatar-smile.svg"
        alt=""
        width={80}
        height={80}
        loading="eager"
        className="avatar-frame avatar-frame-smile"
      />
      <Image
        src="/avatar-alternate.svg"
        alt=""
        width={80}
        height={80}
        loading="eager"
        className="avatar-frame avatar-frame-alternate"
      />
    </span>
  );
}
