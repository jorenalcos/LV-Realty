import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyCard from "./PropertyCard";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    number: "01",
    name: "THE ASTER",
    location: "MAKATI, PHILIPPINES",
    category: "PRIVATE RESIDENCE",
    price: "₱ 85,000,000",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "02",
    name: "THE VELA",
    location: "CEBU, PHILIPPINES",
    category: "OCEAN RESIDENCE",
    price: "₱ 62,000,000",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "03",
    name: "THE NOIR",
    location: "TAGUIG, PHILIPPINES",
    category: "URBAN ESTATE",
    price: "₱ 120,000,000",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  },
];

export default function Collection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector(
        ".collection-heading",
      );

      const cards =
        sectionRef.current?.querySelectorAll(
          ".property-card",
        );

      if (!heading || !cards) return;

      // ============================
      // Heading reveal
      // ============================

      gsap.fromTo(
        heading,
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      // ============================
      // Property cards
      // ============================

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 120,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,

            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },

            ease: "power3.out",
          },
        );

        // Image parallax
        const image = card.querySelector("img");

        if (image) {
          gsap.fromTo(
            image,
            {
              yPercent: -8,
            },
            {
              yPercent: 8,

              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },

              ease: "none",
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative bg-lv-black px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="collection-heading mb-20 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-lv-gold" />

            <span className="text-[10px] tracking-[0.35em] text-lv-gold">
              02 / COLLECTION
            </span>
          </div>

          <h2 className="max-w-4xl text-[12vw] font-light uppercase leading-[0.8] tracking-[-0.055em] text-lv-cream md:text-[8vw] lg:text-[6vw]">
            Selected
            <br />
            <span className="font-serif italic text-lv-gold">
              Properties.
            </span>
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-7 text-lv-muted">
          A curated selection of residences defined by
          architecture, location and exceptional living.
        </p>
      </div>

      {/* Properties */}
      <div className="property-grid grid gap-6 lg:grid-cols-2">
        {properties.map((property, index) => (
          <div
            key={property.number}
            className={
              index === 0
                ? "property-card lg:col-span-2"
                : "property-card"
            }
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </section>
  );
}