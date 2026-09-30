import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current;
    const statement = statementRef.current;
    const line = lineRef.current;

    if (!section || !words || !statement || !line) return;

    const ctx = gsap.context(() => {
      const visionWords = words.querySelectorAll("[data-vision-word]");

      gsap.fromTo(
        visionWords,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: statement,
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
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(words, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative min-h-screen overflow-hidden bg-lv-black px-6 py-32 md:px-12 lg:px-20 lg:py-40"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lv-gold/[0.025] blur-[180px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(212,175,55,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.35em] text-lv-gold">
              04
            </span>

            <span className="h-px w-12 bg-lv-gold/40" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-muted">
              Our Vision
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-lv-muted md:block">
            The Future / LV Realty
          </span>
        </div>

        {/* Main vision typography */}
        <div
          ref={wordsRef}
          className="mt-32 overflow-hidden md:mt-40 lg:mt-48"
        >
          <div className="overflow-hidden">
            <div
              data-vision-word
              className="text-[16vw] font-light uppercase leading-[0.78] tracking-[-0.08em] text-lv-cream md:text-[12vw] lg:text-[10vw]"
            >
              HELPING
            </div>
          </div>

          <div className="overflow-hidden text-right">
            <div
              data-vision-word
              className="text-[16vw] font-light uppercase leading-[0.78] tracking-[-0.08em] text-lv-gold md:text-[12vw] lg:text-[10vw]"
            >
              CLIENTS
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              data-vision-word
              className="text-[16vw] font-light uppercase leading-[0.78] tracking-[-0.08em] text-lv-cream md:text-[12vw] lg:text-[10vw]"
            >
              ENHANCE
            </div>
          </div>

          <div className="overflow-hidden text-right">
            <div
              data-vision-word
              className="text-[16vw] font-light uppercase leading-[0.78] tracking-[-0.08em] text-lv-muted md:text-[12vw] lg:text-[10vw]"
            >
              THEIR LIVES.
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={lineRef}
          className="mt-28 h-px w-full bg-lv-gold/30"
        />

        {/* Vision statement */}
        <div
          ref={statementRef}
          className="mt-16 grid gap-12 lg:grid-cols-[0.5fr_1fr]"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-gold">
              04 / Vision
            </p>

            <p className="mt-6 max-w-[260px] text-xs uppercase leading-6 tracking-[0.18em] text-lv-muted">
              Building better lives through exceptional real estate
              experiences.
            </p>
          </div>

          <div>
            <p className="max-w-[850px] text-2xl font-light leading-[1.35] tracking-[-0.02em] text-lv-cream md:text-4xl lg:text-5xl">
              Help clients enhance their lives through the delivery
              of{" "}
              <span className="text-lv-gold">
                outstanding, expert, truthful,
              </span>{" "}
              and dependable real estate services.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-28 grid border-t border-white/10 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "OUTSTANDING",
              text: "Creating a real estate experience that goes beyond expectations.",
            },
            {
              number: "02",
              title: "EXPERT",
              text: "Combining industry knowledge with thoughtful professional guidance.",
            },
            {
              number: "03",
              title: "DEPENDABLE",
              text: "Building trust through truthful advice and long-term service.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="group border-b border-white/10 py-10 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.3em] text-lv-gold">
                  {item.number}
                </span>

                <span className="h-px w-10 bg-lv-gold/30 transition-all duration-500 group-hover:w-16 group-hover:bg-lv-gold" />
              </div>

              <h3 className="text-sm tracking-[0.2em] text-lv-cream">
                {item.title}
              </h3>

              <p className="mt-5 max-w-[300px] text-sm leading-6 text-lv-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Closing mark */}
        <div className="mt-32 flex flex-col items-center text-center">
          <div className="mb-8 h-px w-16 bg-lv-gold" />

          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-lv-muted">
            LV Realty
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.3em] text-lv-cream">
            Real Estate / Investment / Life
          </p>
        </div>
      </div>
    </section>
  );
}