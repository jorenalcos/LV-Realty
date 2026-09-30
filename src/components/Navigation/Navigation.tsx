import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "../SmoothScroll/SmoothScroll";

interface NavigationProps {
  hidden?: boolean;
}

const menuItems = [
  {
    label: "Home",
    target: "#home",
  },
  {
    label: "Collection",
    target: "#collection",
  },
  {
    label: "About",
    target: "#about",
  },
  {
    label: "Vision",
    target: "#vision",
  },
  {
    label: "Mission",
    target: "#mission",
  },
  {
    label: "Experience",
    target: "#experience",
  },
  {
    label: "Contact",
    target: "#contact",
  },
];

export default function Navigation({
  hidden = false,
}: NavigationProps) {
  const { scrollTo } = useSmoothScroll();

  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);
  const menuLinksRef = useRef<HTMLDivElement | null>(null);

  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* MENU ANIMATION                                                         */
  /* ---------------------------------------------------------------------- */

  const openMenu = useCallback(() => {
    const menu = menuRef.current;
    const content = menuContentRef.current;
    const links = menuLinksRef.current?.querySelectorAll<HTMLElement>(
      "[data-menu-item]",
    ) ?? [];

    if (!menu || !content) return;

    menuTimelineRef.current?.kill();

    setIsOpen(true);

    const timeline = gsap.timeline();

    menuTimelineRef.current = timeline;

    timeline
      .set(menu, {
        display: "block",
        pointerEvents: "auto",
      })
      .set(content, {
        y: 40,
        opacity: 0,
      })
      .set(links, {
        y: 50,
        opacity: 0,
      })
      .to(menu, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(
        content,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
        },
        "-=0.25",
      )
      .to(
        links,
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: "power4.out",
        },
        "-=0.45",
      );
  }, []);

  const closeMenu = useCallback(
    (afterClose?: () => void) => {
      const menu = menuRef.current;
      const content = menuContentRef.current;
      const links =
        menuLinksRef.current?.querySelectorAll<HTMLElement>(
          "[data-menu-item]",
        ) ?? [];

      if (!menu || !content) {
        setIsOpen(false);
        afterClose?.();
        return;
      }

      menuTimelineRef.current?.kill();

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsOpen(false);

          gsap.set(menu, {
            display: "none",
            pointerEvents: "none",
          });

          afterClose?.();
        },
      });

      menuTimelineRef.current = timeline;

      timeline
        .to(links, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.025,
          ease: "power2.in",
        })
        .to(
          content,
          {
            y: -20,
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
          },
          "-=0.15",
        )
        .to(
          menu,
          {
            opacity: 0,
            duration: 0.45,
            ease: "power3.inOut",
          },
          "-=0.15",
        );
    },
    [],
  );

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /* ---------------------------------------------------------------------- */
  /* SMOOTH NAVIGATION                                                      */
  /* ---------------------------------------------------------------------- */

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    event.preventDefault();

    if (isOpen) {
      closeMenu(() => {
        window.history.replaceState(
          null,
          "",
          target,
        );

        requestAnimationFrame(() => {
          scrollTo(target, {
            duration: 1.35,
          });
        });
      });

      return;
    }

    window.history.replaceState(
      null,
      "",
      target,
    );

    scrollTo(target, {
      duration: 1.35,
    });
  };

  /* ---------------------------------------------------------------------- */
  /* ESCAPE KEY                                                             */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen, closeMenu]);

  /* ---------------------------------------------------------------------- */
  /* HIDDEN STATE                                                           */
  /* ---------------------------------------------------------------------- */

  useLayoutEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    if (hidden) {
      if (isOpen) {
        closeMenu();
      }

      gsap.to(nav, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: "power2.inOut",
        overwrite: true,
        pointerEvents: "none",
      });

      return;
    }

    gsap.to(nav, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      delay: 0.1,
      ease: "power3.out",
      overwrite: true,
      pointerEvents: "auto",
    });
  }, [hidden, isOpen, closeMenu]);

  /* ---------------------------------------------------------------------- */
  /* CLEANUP                                                                */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    return () => {
      menuTimelineRef.current?.kill();
    };
  }, []);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* MAIN NAVIGATION                                                    */}
      {/* ------------------------------------------------------------------ */}

      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-[100] px-6 pt-7 md:px-10 lg:px-12"
      >
        <div className="flex items-start justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(event) =>
              handleNavigation(
                event,
                "#home",
              )
            }
            className="group flex items-center gap-3"
            aria-label="LV Realty Home"
          >
            <span className="flex h-10 w-10 items-center justify-center border border-lv-gold/60 font-serif text-sm text-lv-gold transition-colors duration-500 group-hover:bg-lv-gold group-hover:text-lv-black md:h-11 md:w-11">
              LV
            </span>

            <span className="font-mono text-[11px] font-medium tracking-[0.28em] text-lv-cream">
              LV REALTY
            </span>
          </a>

          {/* Menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="group flex items-center gap-4"
            aria-label={
              isOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={isOpen}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lv-cream transition-colors duration-300 group-hover:text-lv-gold">
              {isOpen ? "Close" : "Menu"}
            </span>

            <span className="flex h-10 w-10 items-center justify-center border border-white/15 transition-all duration-500 group-hover:border-lv-gold/50 md:h-11 md:w-11">
              {isOpen ? (
                <X
                  size={17}
                  strokeWidth={1.2}
                  className="text-lv-cream"
                />
              ) : (
                <Menu
                  size={17}
                  strokeWidth={1.2}
                  className="text-lv-cream"
                />
              )}
            </span>
          </button>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* FULL SCREEN MENU                                                   */}
      {/* ------------------------------------------------------------------ */}

      <div
        ref={menuRef}
        className="fixed inset-0 z-[90] hidden bg-[#050505] opacity-0"
        aria-hidden={!isOpen}
      >
        {/* Gold atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-lv-gold/[0.035] blur-[180px]" />

          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(212,175,55,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.5)_1px,transparent_1px)] [background-size:100px_100px]" />
        </div>

        {/* Menu content */}
        <div
          ref={menuContentRef}
          className="relative flex h-full w-full items-center"
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-20">
            {/* Menu label */}
            <div className="mb-12 flex items-center gap-4">
              <span className="font-mono text-[9px] tracking-[0.35em] text-lv-gold">
                NAVIGATION
              </span>

              <span className="h-px w-12 bg-lv-gold/40" />
            </div>

            {/* Links */}
            <div
              ref={menuLinksRef}
              className="flex flex-col"
            >
              {menuItems.map((item, index) => (
                <a
                  key={item.target}
                  href={item.target}
                  data-menu-item
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      item.target,
                    )
                  }
                  className="group flex w-fit items-baseline gap-5 py-2 md:py-3"
                >
                  <span className="font-mono text-[9px] tracking-[0.3em] text-lv-gold opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span className="text-[12vw] font-light uppercase leading-[0.82] tracking-[-0.06em] text-lv-cream transition-colors duration-500 group-hover:text-lv-gold md:text-[7vw] lg:text-[6vw]">
                    {item.label}
                  </span>

                  <span className="ml-2 translate-x-[-10px] text-xl text-lv-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:text-3xl">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-4 md:left-12 md:right-12 md:flex-row md:items-end md:justify-between lg:left-20 lg:right-20">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-lv-muted">
                  Cebu / Philippines
                </p>

                <p className="mt-2 text-xs text-lv-muted">
                  Creating not just transactions, but
                  legacies.
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-lv-muted">
                  President & CEO
                </p>

                <p className="mt-2 text-xs text-lv-cream">
                  Liz Veliganio, REB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}