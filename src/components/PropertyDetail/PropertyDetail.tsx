import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

export interface Property {
  number: string;
  name: string;
  location: string;
  category: string;
  price: string;
  image: string;
  gallery: string[];
}

interface PropertyDetailProps {
  property: Property | null;
  isOpen: boolean;
  currentIndex: number;
  totalProperties: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function PropertyDetail({
  property,
  isOpen,
  currentIndex,
  totalProperties,
  onClose,
  onPrevious,
  onNext,
}: PropertyDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState(0);

  /*
   * Reset gallery when property changes
   */
  useEffect(() => {
    setActiveImage(0);
  }, [property]);

  /*
   * Property detail open / close animation
   */
  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen && property) {
      document.body.style.overflow = "hidden";

      gsap.set(overlayRef.current, {
        display: "block",
        opacity: 1,
      });

      gsap.set(imageRef.current, {
        scale: 1.12,
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

      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
      });

      tl.to(
        contentRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.7",
      );

      tl.to(
        metaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
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

    tl.to(contentRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(
      imageRef.current,
      {
        scale: 1.08,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      },
      "-=0.15",
    );

    return () => {
      tl.kill();
    };
  }, [isOpen, property]);

  /*
   * Keyboard navigation
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen, onPrevious, onNext, onClose]);

  /*
   * Don't render without a selected property
   */
  if (!property) {
    return null;
  }

  /*
   * Gallery navigation
   */
  const changeGalleryImage = (index: number) => {
    const total = property.gallery.length;

    const nextIndex =
      (index + total) % total;

    if (nextIndex === activeImage) {
      return;
    }

    const image = imageRef.current;

    if (!image) {
      setActiveImage(nextIndex);
      return;
    }

    gsap.timeline({
      onComplete: () => {
        setActiveImage(nextIndex);
      },
    })
      .to(image, {
        opacity: 0,
        scale: 1.04,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power4.out",
      });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[120] hidden overflow-hidden bg-[#050505]"
      role="dialog"
      aria-modal="true"
      aria-label={`${property.name} property details`}
    >

      <div
        ref={imageRef}
        className="absolute inset-0"
      >
        <img
          src={property.gallery[activeImage]}
          alt={`${property.name} view ${activeImage + 1
            }`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

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

        {/* Center identity */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
          <span className="flex h-8 w-8 items-center justify-center border border-lv-gold/60 text-[9px] text-lv-gold">
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

      <div className="relative z-10 flex min-h-screen items-end px-6 pb-36 pt-32 md:px-12 md:pb-40 lg:px-20">
        <div className="w-full">
          <div
            ref={contentRef}
            className="max-w-5xl"
          >
            {/* Category */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-lv-gold" />

              <span className="text-[10px] tracking-[0.35em] text-lv-gold">
                {property.number} /{" "}
                {property.category}
              </span>
            </div>

            {/* Property name */}
            <h2 className="font-serif text-[18vw] italic leading-[0.75] tracking-[-0.05em] text-lv-cream md:text-[12vw] lg:text-[9vw]">
              {property.name}
            </h2>

            {/* Location */}
            <p className="mt-6 text-[10px] tracking-[0.3em] text-white/70">
              {property.location}
            </p>
          </div>

          <div
            ref={metaRef}
            className="mt-10 border-t border-white/20 pt-6"
          >
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              {/* Stats */}
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

              {/* Price */}
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
      </div>

      <div className="absolute bottom-8 left-6 right-6 z-30 flex items-center justify-between md:left-10 md:right-10 lg:left-20 lg:right-20">
        {/* Previous */}
        <button
          type="button"
          onClick={onPrevious}
          className="group flex items-center gap-3 text-[9px] tracking-[0.25em] text-white/60 transition-colors hover:text-lv-gold"
        >
          <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-lv-gold">
            <ArrowLeft
              size={14}
              strokeWidth={1.2}
            />
          </span>

          <span className="hidden sm:block">
            PREVIOUS
          </span>
        </button>

        {/* Counter */}
        <div className="flex items-center gap-4 text-[9px] tracking-[0.3em]">
          <span className="text-lv-gold">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-12 bg-white/20" />

          <span className="text-white/40">
            {String(totalProperties).padStart(2, "0")}
          </span>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          className="group flex items-center gap-3 text-[9px] tracking-[0.25em] text-white/60 transition-colors hover:text-lv-gold"
        >
          <span className="hidden sm:block">
            NEXT
          </span>

          <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-lv-gold">
            <ArrowRight
              size={14}
              strokeWidth={1.2}
            />
          </span>
        </button>
      </div>

      <div className="absolute bottom-20 left-6 z-30 flex gap-2 md:left-10 lg:left-20">
        {property.gallery.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() =>
              changeGalleryImage(index)
            }
            className={`relative h-10 w-14 overflow-hidden border transition-all duration-300 md:h-12 md:w-16 ${activeImage === index
              ? "border-lv-gold opacity-100"
              : "border-white/20 opacity-40 hover:opacity-100"
              }`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover"
            />

            {activeImage === index && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-lv-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Vertical label */}
      <div className="absolute bottom-10 right-5 z-20 hidden rotate-90 origin-bottom-right text-[8px] tracking-[0.3em] text-white/25 lg:block">
        LV REALTY — PROPERTY DETAILS
      </div>
    </div>
  );
}