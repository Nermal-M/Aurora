"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const wmRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const CFG = {
      wordmark: "AURORA",
      tagline: "MARS ROVER TEAM // PSG iTECH ROBOTICS",
      logoSrc: "/images/logo-aurora.png",
      speed: 1.35, // 1 = original pacing, higher = faster
      skippable: true,
    };

    const root = rootRef.current;
    const html = document.documentElement;
    const $ = (s: string) => root.querySelector(s) as HTMLElement | null;
    const el: Record<string, HTMLElement> = {};
    root.querySelectorAll<HTMLElement>("[data-k]").forEach((n) => {
      if (n.dataset.k) el[n.dataset.k] = n;
    });

    const K = 1 / CFG.speed;

    /* every reload starts at the top */
    try {
      history.scrollRestoration = "manual";
    } catch {}
    window.scrollTo(0, 0);
    html.classList.add("au-lock");

    /* build wordmark */
    const wm = wmRef.current;
    const letters: HTMLElement[] = [];
    if (wm) {
      wm.innerHTML = "";
      const chars = [...CFG.wordmark];
      chars.forEach((c, idx) => {
        const s = document.createElement("span");
        s.className = idx === chars.length - 1 ? "au-ch last-char" : "au-ch";
        const i = document.createElement("i");
        i.textContent = c;
        s.appendChild(i);
        wm.appendChild(s);
        letters.push(i);
      });
      wm.setAttribute("aria-label", CFG.wordmark);
    }

    const tagEl = $("#au-tag");
    if (tagEl) {
      tagEl.innerHTML = `<span class="badge-dot"></span><span>${CFG.tagline}</span>`;
    }

    /* timeline helper */
    const anims: Animation[] = [];
    const timers: NodeJS.Timeout[] = [];

    const A = (
      node: HTMLElement | SVGElement | undefined,
      frames: Keyframe[] | PropertyIndexedKeyframes,
      d: number,
      t: number,
      ease: string = "linear",
      fill: FillMode = "both"
    ) => {
      if (!node) return null;
      const a = node.animate(frames, {
        delay: d * K * 1000,
        duration: t * K * 1000,
        easing: ease,
        fill,
      });
      anims.push(a);
      return a;
    };

    const at = (sec: number, fn: () => void) => {
      timers.push(setTimeout(fn, sec * K * 1000));
    };

    const C = "translate(-50%,-50%)";
    const sc = (s: number, extra: string = "") => `${C} scale(${s}) ${extra}`;
    const EXPO = "cubic-bezier(.7,0,.2,1)";
    const OUT = "cubic-bezier(.16,1,.3,1)";
    const IN = "cubic-bezier(.5,0,.9,.4)";
    const chrome = $("#au-chrome");
    const phase = $("#au-phase");
    const setPhase = (t: string) => {
      if (phase) phase.textContent = t;
    };

    let finished = false;
    function finish(fast: boolean) {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);

      const out = fast
        ? root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: "forwards" })
        : root.animate(
            [
              { clipPath: "inset(0 0 0 0)" },
              { clipPath: "inset(0 0 100% 0)" },
            ],
            { duration: 800 * K, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }
          );

      out.onfinish = () => {
        anims.forEach((a) => a.cancel());
        html.classList.remove("au-lock");
        window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("aurora:intro-done"));
        setMounted(false);
      };
    }

    const skipBtn = $("#au-skip");
    const handleSkip = () => {
      anims.forEach((a) => a.pause());
      finish(true);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        anims.forEach((a) => a.pause());
        finish(true);
      }
    };

    if (CFG.skippable && skipBtn) {
      skipBtn.addEventListener("click", handleSkip);
      window.addEventListener("keydown", handleKeydown);
    }

    /* skippable check */

    /* TIMELINE */
    if (chrome) chrome.style.opacity = "1";

    /* 0.1 — Aurora Logo in the center scales in with technical orbital rings */
    A(
      el.logo,
      [
        { opacity: 0, transform: sc(0.2) },
        { opacity: 1, transform: sc(1) },
      ],
      0.2,
      0.75,
      OUT
    );

    A(
      el.r1,
      [
        { opacity: 0, transform: sc(0.15), offset: 0 },
        { opacity: 1, transform: sc(0.55), offset: 0.28 },
        { opacity: 1, transform: sc(0.55), offset: 0.5 },
        { opacity: 1, transform: sc(1.5), offset: 1 },
      ],
      0.15,
      1.9,
      "cubic-bezier(.45,0,.2,1)"
    );

    /* 0.8 — outer rings expand */
    A(el.r2, [{ opacity: 0, transform: sc(0.4) }, { opacity: 1, transform: sc(1) }], 0.8, 1.5, OUT);
    A(el.r3, [{ opacity: 0, transform: sc(0.6) }, { opacity: 1, transform: sc(1) }], 1.0, 1.7, OUT);
    at(0.9, () => setPhase("01 · Ignition"));

    /* 1.5 — rust ring + circling text */
    A(el.r4, [{ opacity: 0, transform: sc(0.8) }, { opacity: 1, transform: sc(1) }], 1.5, 0.6, OUT);
    A(
      el.rtext,
      [
        { opacity: 0, transform: sc(1, "rotate(0deg)"), offset: 0 },
        { opacity: 1, transform: sc(1, "rotate(-40deg)"), offset: 0.2 },
        { opacity: 1, transform: sc(1, "rotate(-170deg)"), offset: 1 },
      ],
      1.5,
      1.6
    );
    at(2.2, () => setPhase("02 · Identity"));

    /* 2.5 — logo collapses cleanly into center point */
    A(
      el.logo,
      [
        { opacity: 1, transform: sc(1), filter: "blur(0px)" },
        { opacity: 0.8, transform: sc(0.2), filter: "blur(4px)", offset: 0.8 },
        { opacity: 0, transform: sc(0.05), filter: "blur(8px)" },
      ],
      2.4,
      0.6,
      IN,
      "forwards"
    );
    ["r1", "r2", "r3", "r4", "rtext"].forEach((k) => {
      A(el[k], [{ opacity: 1 }, { opacity: 0 }], 2.4, 0.4, "ease-in", "forwards");
    });

    /* 2.8 — white-hot core pulse */
    A(el.hot, [{ opacity: 0, transform: sc(0.2) }, { opacity: 1, transform: sc(1) }], 2.75, 0.15, "ease-out");
    A(el.bone, [{ opacity: 1, transform: sc(0) }, { opacity: 1, transform: sc(1) }], 2.85, 0.9, EXPO);
    A(el.hot, [{ opacity: 1 }, { opacity: 0 }], 2.9, 0.1, "linear", "forwards");
    A(
      el.sun,
      [
        { opacity: 0, transform: sc(0.1) },
        { opacity: 1, transform: sc(0.7), offset: 0.35 },
        { opacity: 1, transform: sc(1.4) },
      ],
      3.0,
      0.8,
      OUT
    );

    /* 3.3 — deep space shockwave expands */
    A(el.rust, [{ opacity: 1, transform: sc(0) }, { opacity: 1, transform: sc(1) }], 3.25, 0.9, EXPO);
    A(el.sun, [{ opacity: 1 }, { opacity: 0 }], 3.5, 0.3, "linear", "forwards");
    at(3.4, () => setPhase("03 · Descent"));

    /* 3.7 — wordmark: technical laser line draws, letters rise crisply */
    const lineNode = root.querySelector<HTMLElement>('[data-k="line"]');
    if (lineNode) {
      A(lineNode, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], 3.65, 0.8, EXPO);
    }

    letters.forEach((l, i) => {
      const d = 3.8 + i * 0.08;
      A(
        l,
        [
          {
            transform: "translateY(112%)",
            opacity: 0,
            filter: "blur(8px)",
            offset: 0,
          },
          {
            transform: "translateY(0%)",
            opacity: 1,
            filter: "blur(0px)",
            offset: 1,
          },
        ],
        d,
        0.85,
        "cubic-bezier(.16,1,.3,1)"
      );
    });

    if (tagEl) {
      A(tagEl, [{ transform: "translateY(120%)", opacity: 0 }, { transform: "translateY(0%)", opacity: 1 }], 4.4, 0.7, OUT);
    }

    /* 5.4 — letters glide upward, curtain lifts into the 3D Rover hero */
    letters.forEach((l, i) => {
      A(
        l,
        [
          { transform: "translateY(0%)", opacity: 1, offset: 0 },
          { transform: "translateY(-110%)", opacity: 0.2, filter: "blur(6px)", offset: 1 },
        ],
        5.4 + i * 0.04,
        0.45,
        "cubic-bezier(.7,0,.84,0)",
        "forwards"
      );
    });

    if (tagEl) {
      A(tagEl, [{ transform: "translateY(0%)", opacity: 1 }, { transform: "translateY(-120%)", opacity: 0 }], 5.35, 0.4, "cubic-bezier(.7,0,.84,0)", "forwards");
    }

    at(5.8, () => finish(false));

    return () => {
      timers.forEach(clearTimeout);
      if (skipBtn) skipBtn.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleKeydown);
      html.classList.remove("au-lock");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div id="au-intro" ref={rootRef} role="status" aria-label="Loading PSG Team Aurora">
      {/* 1. Rings, revolving circular text, and Official Aurora Logo in Center */}
      <div className="au-c au-ring au-r3" data-k="r3" aria-hidden="true" />
      <div className="au-c au-ring au-r2" data-k="r2" aria-hidden="true" />
      <div className="au-c au-ring au-r4" data-k="r4" aria-hidden="true" />
      <div className="au-c au-ring au-r1" data-k="r1" aria-hidden="true" />

      {/* Official Aurora Logo prominently in the exact center */}
      <div className="au-c au-center-logo" data-k="logo" aria-hidden="true">
        <div className="relative w-full h-full p-2">
          <Image
            src="/images/logo-aurora.png"
            alt="PSG Team Aurora Logo"
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(226,85,43,0.6)]"
            priority
          />
        </div>
      </div>

      <div className="au-c au-ringtext" data-k="rtext" aria-hidden="true">
        <svg viewBox="-100 -100 200 200">
          <defs>
            <path id="au-circ" d="M0,-86 a86,86 0 1,1 0,172 a86,86 0 1,1 0,-172" />
          </defs>
          <text>
            <textPath href="#au-circ" textLength="538" lengthAdjust="spacing">
              PSG TEAM AURORA · MARS ROVER · PSG iTECH · TARUSH · 2026 ·{" "}
            </textPath>
          </text>
        </svg>
      </div>

      {/* 2. white-hot dot, bone disc, sun, deep space shockwave */}
      <div className="au-c au-hot" data-k="hot" aria-hidden="true" />
      <div className="au-c au-disc au-bone" data-k="bone" aria-hidden="true" />
      <div className="au-c au-sun" data-k="sun" aria-hidden="true" />
      <div className="au-c au-disc au-rust" data-k="rust" aria-hidden="true" />

      {/* 3. Wordmark Layer: 100% Viewport-Fitted Technical Space Grotesk & Rover HUD Tag */}
      <div className="au-word" aria-hidden="true">
        <div className="au-line" data-k="line" />
        <h1 className="au-wm" id="au-wm" ref={wmRef} />
        <div className="au-tag-wrap">
          <span className="au-tag" id="au-tag" />
        </div>
      </div>

      {/* 4. HUD chrome */}
      <div className="au-chrome" id="au-chrome" aria-hidden="true">
        <span className="au-br tl" />
        <span className="au-br tr" />
        <span className="au-br bl" />
        <span className="au-br br" />

        <div className="au-lab l">
          <div className="relative w-[22px] h-[22px] au-logo">
            <Image
              src="/images/logo-aurora.png"
              alt="Aurora Logo"
              fill
              className="object-contain"
            />
          </div>
          <span>Aurora</span>
          <span style={{ opacity: 0.55 }}>Mars rover</span>
        </div>
        <div className="au-lab r">
          <span id="au-phase">00 · Boot</span>
        </div>
      </div>

      <button className="au-skip" id="au-skip" type="button" aria-label="Skip intro">
        Skip
      </button>
    </div>
  );
}
