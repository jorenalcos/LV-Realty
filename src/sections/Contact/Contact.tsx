import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, MapPin, Phone, } from "lucide-react";

import { useSmoothScroll } from "../../components/SmoothScroll/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    label: "About",
    target: "#about",
  },
  {
    label: "Collection",
    target: "#collection",
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
];

export default function Contact() {
  const { scrollTo } = useSmoothScroll();

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------------------------------- */
  /* SMOOTH FOOTER NAVIGATION                                               */
  /* ---------------------------------------------------------------------- */

  const handleFooterNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    event.preventDefault();

    window.history.replaceState(null, "", target);

    scrollTo(target, {
      duration: 1.35,
    });
  };

  /* ---------------------------------------------------------------------- */
  /* CONTACT ANIMATION                                                      */
  /* ---------------------------------------------------------------------- */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll<HTMLElement>(
        "[data-contact-item]",
      );

      const lines = content.querySelectorAll<HTMLElement>(
        "[data-contact-line]",
      );

      gsap.fromTo(
        items,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions:
              "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        lines,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.3,
          ease: "power3.inOut",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions:
              "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-lv-black px-6 py-32 md:px-12 lg:px-20 lg:py-40"
    >
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-20%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-lv-gold/[0.035] blur-[180px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(212,175,55,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.5)_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-[1600px]"
      >
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-item
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.35em] text-lv-gold">
              07
            </span>

            <span className="h-px w-12 bg-lv-gold/40" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-muted">
              Contact
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-lv-muted md:block">
            Cebu / Philippines
          </span>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* MAIN STATEMENT                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-item
          className="mt-28 md:mt-40 lg:mt-48"
        >
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-lv-gold">
            Begin Your Journey
          </p>

          <h2 className="max-w-[1200px] text-[13vw] font-light uppercase leading-[0.78] tracking-[-0.075em] text-lv-cream md:text-[10vw] lg:text-[8.5vw]">
            FIND YOUR
            <br />
            <span className="text-lv-gold">
              NEXT ADDRESS.
            </span>
          </h2>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-item
          className="mt-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-[520px] text-sm leading-7 text-lv-muted md:text-base">
            Whether you're searching for your next
            investment, your next home, or the right
            opportunity, our team is here to guide you
            through every step.
          </p>

          <a
            href="mailto:lvrealtybrokerageinc@gmail.com"
            className="group inline-flex w-fit items-center gap-5 border border-lv-gold/40 px-7 py-5 transition-all duration-500 hover:bg-lv-gold hover:text-lv-black"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
              Request a Private Viewing
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* DIVIDER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-line
          className="mt-28 h-px w-full bg-lv-gold/30"
        />

        {/* ---------------------------------------------------------------- */}
        {/* CONTACT INFORMATION                                               */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-item
          className="grid gap-12 py-12 md:grid-cols-3"
        >
          {/* Principal */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lv-gold">
                Principal
              </span>
            </div>

            <h3 className="text-xl font-light uppercase tracking-[0.08em] text-lv-cream">
              Liz Veliganio, REB
            </h3>

            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-lv-muted">
              President & CEO
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-lv-muted">
              Licensed Real Estate Broker
            </p>
          </div>

          {/* Professional License */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lv-gold">
                Professional License
              </span>
            </div>

            <p className="text-sm uppercase tracking-[0.15em] text-lv-cream">
              PRC Lic. No. 0034046
            </p>

            <p className="mt-3 max-w-[300px] text-xs leading-6 text-lv-muted">
              Licensed real estate brokerage professional
              serving clients and property investors in the
              Philippines.
            </p>
          </div>

          {/* Direct Contact */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lv-gold">
                Direct Contact
              </span>
            </div>

            <div className="space-y-5">
              <a
                href="mailto:lvrealtybrokerageinc@gmail.com"
                className="group flex items-start gap-3"
              >
                <Mail
                  size={15}
                  strokeWidth={1}
                  className="mt-0.5 shrink-0 text-lv-gold"
                />

                <span className="break-all text-sm tracking-[0.04em] text-lv-cream transition-colors duration-300 group-hover:text-lv-gold">
                  lvrealtybrokerageinc@gmail.com
                </span>
              </a>

              <a
                href="tel:+639993635235"
                className="group flex items-center gap-3"
              >
                <Phone
                  size={15}
                  strokeWidth={1}
                  className="shrink-0 text-lv-gold"
                />

                <span className="text-sm tracking-[0.08em] text-lv-cream transition-colors duration-300 group-hover:text-lv-gold">
                  +63 999 363 5235
                </span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin
                  size={15}
                  strokeWidth={1}
                  className="mt-0.5 shrink-0 text-lv-gold"
                />

                <span className="text-sm uppercase tracking-[0.08em] text-lv-cream">
                  Cebu, Philippines
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* FOOTER DIVIDER                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-line
          className="h-px w-full bg-white/10"
        />

        {/* ---------------------------------------------------------------- */}
        {/* FOOTER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          data-contact-item
          className="flex flex-col gap-10 py-10 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Brand */}
          <div className="lg:max-w-[280px]">
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-lv-muted">
              LV Realty
            </p>

            <p className="mt-3 text-xs leading-6 text-lv-muted">
              Creating not just transactions, but
              legacies.
            </p>
          </div>

          {/* Footer navigation */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            {footerLinks.map((link) => (
              <a
                key={link.target}
                href={link.target}
                onClick={(event) =>
                  handleFooterNavigation(
                    event,
                    link.target,
                  )
                }
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-lv-muted transition-colors duration-300 hover:text-lv-gold"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(event) =>
                handleFooterNavigation(
                  event,
                  "#contact",
                )
              }
              className="font-mono text-[9px] uppercase tracking-[0.25em] text-lv-gold transition-colors duration-300 hover:text-lv-cream"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-lv-muted">
            © 2024 — 2026 LV Realty
          </p>
        </div>
      </div>
    </section>
  );
}