import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    number: "01",
    label: "HOME",
    href: "#home",
  },
  {
    number: "02",
    label: "COLLECTION",
    href: "#collection",
  },
  {
    number: "03",
    label: "ABOUT",
    href: "#about",
  },
  {
    number: "04",
    label: "CONTACT",
    href: "#contact",
  },
];

export default function MenuOverlay({
  isOpen,
  onClose,
}: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    timelineRef.current?.kill();

    const links =
      linksRef.current?.querySelectorAll<HTMLElement>(
        "[data-menu-item]",
      ) ?? [];

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(overlayRef.current, {
        display: "block",
      });

      gsap.set(panelRef.current, {
        clipPath: "inset(0 0 0 100%)",
      });

      gsap.set(links, {
        opacity: 0,
        x: 60,
      });

      gsap.set(footerRef.current, {
        opacity: 0,
        y: 20,
      });

      const tl = gsap.timeline();

      tl.to(panelRef.current, {
        clipPath: "inset(0 0 0 0%)",
        duration: 0.9,
        ease: "power4.inOut",
      });

      tl.to(
        links,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.35",
      );

      tl.to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      timelineRef.current = tl;
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              display: "none",
            });
          }

          document.body.style.overflow = "";
        },
      });

      tl.to(links, {
        opacity: 0,
        x: 30,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      });

      tl.to(
        panelRef.current,
        {
          clipPath: "inset(0 0 0 100%)",
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.1",
      );

      timelineRef.current = tl;
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden"
      aria-hidden={!isOpen}
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-[#050505]"
      >
        {/* Decorative gold line */}
        <div className="absolute left-0 top-0 h-full w-px bg-lv-gold/40" />

        <div className="absolute right-0 top-0 h-px w-full bg-white/10" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-lv-gold text-sm text-lv-gold">
              LV
            </div>

            <span className="text-[10px] font-medium tracking-[0.3em] text-lv-cream">
              LV REALTY
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 text-[10px] tracking-[0.25em] text-lv-cream"
          >
            <span className="transition-colors group-hover:text-lv-gold">
              CLOSE
            </span>

            <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-lv-gold group-hover:text-lv-gold">
              <X
                size={17}
                strokeWidth={1.2}
              />
            </span>
          </button>
        </div>

        {/* Main navigation */}
        <div className="flex min-h-[calc(100vh-180px)] items-center px-6 md:px-16 lg:px-24">
          <nav className="w-full max-w-5xl">
            {menuItems.map((item) => (
              <a
                key={item.number}
                data-menu-item
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline border-b border-white/10 py-5 transition-colors duration-300 first:border-t md:py-7"
              >
                <span className="mr-6 w-8 text-[9px] tracking-[0.2em] text-lv-gold">
                  {item.number}
                </span>

                <span className="text-[11vw] font-light uppercase leading-none tracking-[-0.05em] text-lv-cream transition-transform duration-500 group-hover:translate-x-4 group-hover:text-lv-gold md:text-[7vw] lg:text-[5.5vw]">
                  {item.label}
                </span>

                <ArrowUpRight
                  size={20}
                  strokeWidth={1}
                  className="ml-auto text-lv-gold opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-100"
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 text-[8px] tracking-[0.25em] text-lv-muted md:bottom-8 md:left-16 md:right-16 md:flex-row md:items-end md:justify-between lg:left-24 lg:right-24"
        >
          <div className="flex gap-6">
            <span>ARCHITECTURE</span>
            <span>INVESTMENT</span>
            <span>LIFESTYLE</span>
          </div>

          <span>
            MANILA / PHILIPPINES
          </span>
        </div>

        {/* Vertical label */}
        <div className="absolute bottom-10 right-5 hidden rotate-90 origin-bottom-right text-[8px] tracking-[0.3em] text-white/20 lg:block">
          LV REALTY — MENU
        </div>
      </div>
    </div>
  );
}