import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import PropertyDetail, { type Property, } from "../../components/PropertyDetail/PropertyDetail";

gsap.registerPlugin(ScrollTrigger);

const properties: Property[] = [
  {
    number: "01",
    name: "THE ASTER",
    location: "MAKATI, PHILIPPINES",
    category: "PRIVATE RESIDENCE",
    price: "₱ 85,000,000",

    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90",

    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2000&q=90",
    ],
  },

  {
    number: "02",
    name: "THE VELA",
    location: "CEBU, PHILIPPINES",
    category: "OCEAN RESIDENCE",
    price: "₱ 62,000,000",

    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",

    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90",
    ],
  },

  {
    number: "03",
    name: "THE NOIR",
    location: "TAGUIG, PHILIPPINES",
    category: "URBAN ESTATE",
    price: "₱ 120,000,000",

    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",

    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90",
    ],
  },

  {
    number: "04",
    name: "THE SOLIS",
    location: "BATANGAS, PHILIPPINES",
    category: "PRIVATE VILLA",
    price: "₱ 98,000,000",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",

    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90",
    ],
  },
];

interface CollectionProps {
  onPropertyOpen: () => void;
  onPropertyClose: () => void;
}

export default function Collection({
  onPropertyOpen,
  onPropertyClose,
}: CollectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const [selectedPropertyIndex, setSelectedPropertyIndex] =
    useState(0);

  const [activeProperty, setActiveProperty] = useState(0);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(
          0,
          track.scrollWidth - window.innerWidth,
        );

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;

            const index = Math.min(
              properties.length - 1,
              Math.floor(
                progress * properties.length,
              ),
            );

            setActiveProperty(index);
          },
        },
      });

      // Intro reveal
      gsap.from(".collection-intro", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",

        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Property image parallax
      const cards =
        track.querySelectorAll<HTMLElement>(
          "[data-property-card]",
        );

      cards.forEach((card) => {
        const image =
          card.querySelector<HTMLElement>(
            "[data-property-image]",
          );

        if (!image) return;

        gsap.fromTo(
          image,
          {
            scale: 1.12,
          },
          {
            scale: 1,

            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },

            ease: "none",
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const goToPreviousProperty = () => {
    setSelectedPropertyIndex((current) => {
      const nextIndex =
        current === 0
          ? properties.length - 1
          : current - 1;

      setSelectedProperty(properties[nextIndex]);

      return nextIndex;
    });
  };

  const goToNextProperty = () => {
    setSelectedPropertyIndex((current) => {
      const nextIndex =
        current === properties.length - 1
          ? 0
          : current + 1;

      setSelectedProperty(properties[nextIndex]);

      return nextIndex;
    });
  };

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-lv-black"
    >
      {/* Editorial gradient */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[52%] bg-gradient-to-r from-lv-black via-lv-black/95 to-transparent" />

      {/* Collection intro */}
      <div className="collection-intro pointer-events-none absolute left-6 top-20 z-30 w-[42vw] max-w-[560px] md:left-12 lg:left-20 lg:top-24">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-lv-gold" />

          <span className="text-[10px] tracking-[0.35em] text-lv-gold">
            02 / COLLECTION
          </span>
        </div>

        <h2 className="text-[13vw] font-light uppercase leading-[0.78] tracking-[-0.06em] text-lv-cream md:text-[9vw] lg:text-[6vw]">
          Selected
          <br />

          <span className="font-serif italic text-lv-gold">
            Properties.
          </span>
        </h2>
      </div>

      {/* Description */}
      <div className="absolute bottom-10 left-6 z-30 w-[260px] md:left-12 lg:left-20">
        <p className="text-xs leading-6 text-lv-muted">
          A curated selection of residences defined by
          architecture, location and exceptional living.
        </p>
      </div>

      {/* Horizontal gallery */}
      <div
        ref={trackRef}
        className="flex h-full items-center gap-10 pl-[58vw] pr-[12vw] pt-12"
      >
        {properties.map((property, index) => (
          <article
            key={property.number}
            data-property-card
            className="property-card group relative h-[65vh] w-[62vw] flex-shrink-0 overflow-hidden md:h-[68vh] md:w-[48vw] lg:h-[70vh] lg:w-[42vw]"
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                data-property-image
                src={property.image}
                alt={property.name}
                className="h-full w-full object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute inset-0 bg-lv-gold/0 transition-colors duration-700 group-hover:bg-lv-gold/10" />
            </div>

            {/* Property number */}
            <div className="absolute left-6 top-6 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-lv-gold">
                {property.number}
              </span>

              <span className="h-px w-8 bg-white/30" />
            </div>

            {/* Property information */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
              <p className="mb-3 text-[9px] tracking-[0.3em] text-lv-gold">
                {property.category}
              </p>

              <h3 className="font-serif text-5xl italic leading-none text-lv-cream md:text-6xl lg:text-7xl">
                {property.name}
              </h3>

              <div className="mt-5 flex flex-col gap-1 text-[9px] tracking-[0.25em] text-white/60">
                <span>{property.location}</span>
                <span>{property.price}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(property);
                  setSelectedPropertyIndex(index);
                  onPropertyOpen();
                }}
                className="mt-7 flex items-center gap-3 border border-white/30 px-5 py-3 text-[9px] tracking-[0.25em] text-lv-cream transition-all duration-500 group-hover:border-lv-gold group-hover:text-lv-gold"
              >
                VIEW PROPERTY

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.2}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Progress */}
      <div className="absolute bottom-10 right-6 z-30 md:right-12 lg:right-20">
        <div className="flex items-center gap-4 text-[9px] tracking-[0.25em] text-lv-muted">
          <span className="text-lv-gold">
            {String(activeProperty + 1).padStart(2, "0")}
          </span>

          <div className="relative h-px w-20 bg-white/20">
            <div
              className="absolute left-0 top-0 h-px bg-lv-gold transition-all duration-300"
              style={{
                width: `${((activeProperty + 1) / properties.length) * 100}%`,
              }}
            />
          </div>

          <span>
            {String(properties.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Vertical label */}
      <div className="absolute bottom-10 right-5 z-30 hidden rotate-90 origin-bottom-right text-[8px] tracking-[0.3em] text-white/20 lg:block">
        LV REALTY — SELECTED COLLECTION
      </div>
      
      <PropertyDetail
        property={selectedProperty}
        isOpen={selectedProperty !== null}
        currentIndex={selectedPropertyIndex}
        totalProperties={properties.length}
        onClose={() => {
          setSelectedProperty(null);
          onPropertyClose();
        }}
        onPrevious={goToPreviousProperty}
        onNext={goToNextProperty}
      />
    </section>
  );
}