import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const content = contentRef.current;
    const line = lineRef.current;
    const image = imageRef.current;

    if (!section || !headline || !content || !line || !image) return;

    const ctx = gsap.context(() => {
      const words = headline.querySelectorAll("[data-word]");

      gsap.fromTo(
        words,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        content,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        line,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        image,
        {
          y: 80,
          opacity: 0,
          scale: 1.08,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen overflow-hidden bg-lv-black px-6 py-32 md:px-12 lg:px-20 lg:py-40">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-lv-gold/[0.035] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-white/[0.015] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Section label */}
        <div className="mb-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.35em] text-lv-gold">
              03
            </span>

            <span className="h-px w-12 bg-lv-gold/40" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-muted">
              About Us
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-lv-muted md:block">
            Cebu / Philippines
          </span>
        </div>

        {/* Main editorial headline */}
        <div className="max-w-[1100px]">
          <h2
            ref={headlineRef}
            className="overflow-hidden text-[15vw] font-light uppercase leading-[0.82] tracking-[-0.07em] text-lv-cream md:text-[11vw] lg:text-[9vw]"
          >
            <span
              data-word
              className="mr-[0.15em] inline-block"
            >
              REAL
            </span>

            <span
              data-word
              className="mr-[0.15em] inline-block text-lv-gold"
            >
              ESTATE
            </span>

            <br />

            <span data-word className="inline-block">
              WITH
            </span>{" "}

            <span
              data-word
              className="inline-block italic text-lv-muted"
            >
              PURPOSE.
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={lineRef}
          className="mt-20 h-px w-full bg-lv-gold/30"
        />

        {/* Content grid */}
        <div
          ref={contentRef}
          className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.8fr]"
        >
          {/* Left */}
          <div>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-lv-gold">
              Who We Are
            </p>

            <p className="max-w-[700px] text-2xl font-light leading-[1.35] tracking-[-0.02em] text-lv-cream md:text-3xl lg:text-4xl">
              LV Realty is a brokerage firm established in{" "}
              <span className="text-lv-gold">January 2024</span>,
              founded with a vision to help Filipinos achieve their
              dream investments.
            </p>

            <p className="mt-8 max-w-[620px] text-sm leading-7 text-lv-muted md:text-base">
              Our founder has been in the real estate industry for
              more than 9 years. Based in Cebu, Philippines, LV Realty
              specializes in property investments, after-sales
              service, bank financing, and property loan assistance.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end">
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-lv-gold">
              Our Commitment
            </p>

            <p className="max-w-[500px] text-xl font-light leading-relaxed text-lv-cream md:text-2xl">
              As proud partners with prominent developers in the
              country, we are dedicated to creating not just
              transactions —
            </p>

            <p className="mt-4 text-3xl font-light italic tracking-tight text-lv-gold md:text-4xl">
              but legacies.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mt-28 grid border-t border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Property Investments",
            "After-sales Service",
            "Bank Financing",
            "Property Loan Assistance",
          ].map((service, index) => (
            <div
              key={service}
              className="group border-b border-white/10 px-0 py-8 md:border-r md:px-8 lg:border-b-0"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.25em] text-lv-gold">
                  0{index + 1}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-lv-gold transition-transform duration-500 group-hover:scale-[2]" />
              </div>

              <p className="text-sm uppercase tracking-[0.15em] text-lv-cream">
                {service}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-32 grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-muted">
              Our Philosophy
            </p>

            <h3 className="mt-6 max-w-[900px] text-4xl font-light leading-[0.95] tracking-[-0.04em] text-lv-cream md:text-6xl lg:text-7xl">
              Every property is an opportunity to create{" "}
              <span className="text-lv-gold">something lasting.</span>
            </h3>
          </div>

          <div
            ref={imageRef}
            className="relative h-[220px] w-full overflow-hidden md:h-[280px] md:w-[320px]"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury interior"
              className="h-full w-full object-cover grayscale transition duration-1000 hover:scale-105 hover:grayscale-0"
            />

            <div className="pointer-events-none absolute inset-0 border border-lv-gold/20" />

            <div className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[0.25em] text-white/70">
              LV / 2024
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}