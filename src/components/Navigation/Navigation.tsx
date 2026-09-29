import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu } from "lucide-react";
import MenuOverlay from "./MenuOverlay";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-10 md:py-8"
      >
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center border border-lv-gold/60 text-sm tracking-[-0.05em] text-lv-gold transition-colors duration-300 group-hover:bg-lv-gold group-hover:text-lv-black">
            LV
          </div>

          <span className="hidden text-[11px] font-medium tracking-[0.28em] text-lv-cream sm:block">
            LV REALTY
          </span>
        </a>

        {/* Menu */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="group flex items-center gap-3 text-[10px] tracking-[0.25em] text-lv-cream"
          aria-label="Open navigation menu"
        >
          <span className="transition-colors duration-300 group-hover:text-lv-gold">
            MENU
          </span>

          <span className="flex h-9 w-9 items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-lv-gold group-hover:text-lv-gold">
            <Menu
              size={16}
              strokeWidth={1.25}
            />
          </span>
        </button>
      </header>

      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}