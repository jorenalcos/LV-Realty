import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "PROFESSIONAL",
    description:
      "Providing sellers and buyers with knowledgeable, thoughtful, and professional real estate assistance throughout their journey.",
  },
  {
    number: "02",
    title: "ETHICAL",
    description:
      "Building every relationship on honesty, transparency, and responsible real estate practices.",
  },
  {
    number: "03",
    title: "RELIABLE",
    description:
      "Being a trusted partner beyond the transaction through continued support and long-term commitment.",
  },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const statement = statementRef.current;
    const cards = cardsRef.current;

    if (!section || !intro || !statement || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        intro,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        statement,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: statement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const cardsItems = cards.querySelectorAll("[data-mission-card]");

      gsap.fromTo(
        cardsItems,
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-40"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-lv-gold/[0.025] blur-[180px]" />

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-lv-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Header */}
        <div
          ref={introRef}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.35em] text-lv-gold">
              05
            </span>

            <span className="h-px w-12 bg-lv-gold/40" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-muted">
              Our Mission
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-lv-muted md:block">
            Purpose / Service / Partnership
          </span>
        </div>

        {/* Mission statement */}
        <div
          ref={statementRef}
          className="mt-28 grid gap-16 lg:grid-cols-[0.35fr_1fr] lg:mt-40"
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-lv-gold">
              The LV Standard
            </p>

            <div className="mt-8 hidden h-32 w-px bg-lv-gold/30 lg:block" />
          </div>

          <div>
            <h2 className="max-w-[1050px] text-4xl font-light leading-[1.05] tracking-[-0.045em] text-lv-cream md:text-6xl lg:text-7xl">
              A{" "}
              <span className="text-lv-gold">
                unique real estate journey
              </span>{" "}
              built around people, value, and lasting relationships.
            </h2>

            <p className="mt-10 max-w-[760px] text-sm leading-7 text-lv-muted md:text-base md:leading-8">
              At LV Realty, our goal is to offer our customers a unique
              real estate journey, delivering top-notch professional
              assistance to sellers and buyers that delivers the
              highest value and personal fulfillment in a long-term
              partnership.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div
          ref={cardsRef}
          className="mt-32 border-t border-white/10"
        >
          {principles.map((principle) => (
            <div
              key={principle.number}
              data-mission-card
              className="group grid gap-8 border-b border-white/10 py-10 md:grid-cols-[100px_0.7fr_1fr] md:items-center lg:py-14"
            >
              {/* Number */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-lv-gold">
                  {principle.number}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl font-light tracking-[-0.02em] text-lv-cream transition-transform duration-500 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                  {principle.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:max-w-[500px]">
                <p className="text-sm leading-7 text-lv-muted">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-32 flex flex-col items-start md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-lv-muted">
              Our Promise
            </p>

            <h3 className="mt-6 max-w-[800px] text-4xl font-light leading-[0.95] tracking-[-0.04em] text-lv-cream md:text-6xl lg:text-7xl">
              More than a transaction.
              <br />
              <span className="text-lv-gold">A lasting partnership.</span>
            </h3>
          </div>

          <div className="mt-12 md:mt-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lv-gold/30">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-lv-gold">
                LV
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}