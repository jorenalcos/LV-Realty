import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";

export interface Property {
  number: string;
  name: string;
  location: string;
  category: string;
  price: string;
  image: string;
}

interface PropertyDetailProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetail({
  property,
  isOpen,
  onClose,
}: PropertyDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen && property) {
      document.body.style.overflow = "hidden";

      window.dispatchEvent(
        new CustomEvent("lv-property-close"),
      );

      gsap.set(overlayRef.current, {
        display: "block",
      });

      gsap.set(imageRef.current, {
        scale: 1.15,
        opacity: 0,
      });

      gsap.set(contentRef.current, {
        y: 60,
        opacity: 0,
      });

      gsap.set(metaRef.current, {
        y: 30,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
      });

      tl.to(
        imageRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.05",
      );

      tl.to(
        contentRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.8",
      );

      tl.to(
        metaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5",
      );

      return () => {
        tl.kill();
      };
    }

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

    tl.to(
      contentRef.current,
      {
        y: 40,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      },
    );

    tl.to(
      imageRef.current,
      {
        scale: 1.08,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      },
      "-=0.15",
    );

    return () => {
      tl.kill();
    };
  }, [isOpen, property]);

  if (!property) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[120] hidden overflow-y-auto bg-[#050505]"
      role="dialog"
      aria-modal="true"
      aria-label={`${property.name} property details`}
    >
      {/* Image */}
      <div
        ref={imageRef}
        className="absolute inset-0"
      >
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        {/* Back */}
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-3 text-[9px] tracking-[0.25em] text-lv-cream"
        >
          <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-lv-gold group-hover:text-lv-gold">
            <ArrowLeft
              size={15}
              strokeWidth={1.2}
            />
          </span>

          <span className="hidden transition-colors group-hover:text-lv-gold sm:block">
            BACK TO COLLECTION
          </span>
        </button>

        {/* Detail identity */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
          <span className="h-7 w-7 border border-lv-gold/60 flex items-center justify-center text-[9px] text-lv-gold">
            LV
          </span>

          <span className="text-[9px] tracking-[0.3em] text-white/70">
            PROPERTY DETAILS
          </span>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-3 text-[9px] tracking-[0.25em] text-lv-cream"
        >
          <span className="hidden transition-colors group-hover:text-lv-gold sm:block">
            CLOSE
          </span>

          <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-lv-gold group-hover:text-lv-gold">
            <X
              size={16}
              strokeWidth={1.2}
            />
          </span>
        </button>
      </header>

      {/* Property content */}
      <div className="relative z-10 flex min-h-screen items-end px-6 pb-16 pt-32 md:px-12 md:pb-20 lg:px-20 lg:pb-24">
        <div className="w-full">
          <div ref={contentRef} className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-lv-gold" />

              <span className="text-[10px] tracking-[0.35em] text-lv-gold">
                {property.number} / {property.category}
              </span>
            </div>

            <h2 className="font-serif text-[18vw] italic leading-[0.75] tracking-[-0.05em] text-lv-cream md:text-[12vw] lg:text-[9vw]">
              {property.name}
            </h2>

            <p className="mt-6 text-[10px] tracking-[0.3em] text-white/70">
              {property.location}
            </p>
          </div>

          {/* Property meta */}
          <div
            ref={metaRef}
            className="mt-12 flex flex-col justify-between gap-8 border-t border-white/20 pt-6 md:flex-row md:items-end"
          >
            <div className="grid grid-cols-3 gap-8 md:gap-14">
              <div>
                <span className="block text-[8px] tracking-[0.25em] text-white/40">
                  BEDROOMS
                </span>

                <span className="mt-2 block text-sm text-lv-cream">
                  4
                </span>
              </div>

              <div>
                <span className="block text-[8px] tracking-[0.25em] text-white/40">
                  BATHROOMS
                </span>

                <span className="mt-2 block text-sm text-lv-cream">
                  5
                </span>
              </div>

              <div>
                <span className="block text-[8px] tracking-[0.25em] text-white/40">
                  FLOOR AREA
                </span>

                <span className="mt-2 block text-sm text-lv-cream">
                  620 SQM
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-8 md:justify-end">
              <div>
                <span className="block text-[8px] tracking-[0.25em] text-white/40">
                  GUIDE PRICE
                </span>

                <span className="mt-2 block text-lg text-lv-gold">
                  {property.price}
                </span>
              </div>

              <button
                type="button"
                className="group flex items-center gap-3 border border-lv-gold bg-lv-gold px-6 py-4 text-[9px] tracking-[0.25em] text-lv-black transition-all duration-300 hover:bg-transparent hover:text-lv-gold"
              >
                PRIVATE VIEWING

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical label */}
      <div className="absolute bottom-10 right-5 z-20 hidden rotate-90 origin-bottom-right text-[8px] tracking-[0.3em] text-white/25 lg:block">
        LV REALTY — PROPERTY DETAILS
      </div>
    </div>
  );
}