import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceScene from "../../three/scenes/ExperienceScene";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    title: "ARCHITECTURE",
    description:
      "Discover spaces where thoughtful architecture, material, and design create an environment worth calling home.",
  },
  {
    number: "02",
    title: "INVESTMENT",
    description:
      "Explore real estate opportunities with a long-term perspective built around value, growth, and informed decisions.",
  },
  {
    number: "03",
    title: "LIFESTYLE",
    description:
      "Because the right property is more than an address. It becomes part of how you live, grow, and create your future.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const progressBars = useRef<(HTMLDivElement | null)[]>([]);

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;

    if (!section || !sticky) return;

    const ctx = gsap.context(() => {
      const titles = titleRefs.current.filter(
        Boolean,
      ) as HTMLHeadingElement[];

      const descriptions = descriptionRefs.current.filter(Boolean) as HTMLParagraphElement[];

      const numbers = numberRefs.current.filter(Boolean) as HTMLSpanElement[];

      /* -------------------------------------------------------------- */
      /* Initial state                                                  */
      /* -------------------------------------------------------------- */

      gsap.set(titles, {
        opacity: 0,
        y: 35,
      });

      gsap.set(descriptions, {
        opacity: 0,
        y: 20,
      });

      gsap.set(numbers, {
        opacity: 0,
      });

      gsap.set(titles[0], {
        opacity: 1,
        y: 0,
      });

      gsap.set(descriptions[0], {
        opacity: 1,
        y: 0,
      });

      gsap.set(numbers[0], {
        opacity: 1,
      });

      /* -------------------------------------------------------------- */
      /* ScrollTrigger                                                  */
      /* -------------------------------------------------------------- */

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",

        pin: sticky,

        scrub: 1.2,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          progressBars.current.forEach((bar, barIndex) => {
            if (!bar) return;

            const start =
              barIndex / experiences.length;

            const end =
              (barIndex + 1) / experiences.length;

            const barProgress = gsap.utils.clamp(
              0,
              1,
              (self.progress - start) /
              (end - start),
            );

            bar.style.transform =
              `scaleX(${barProgress})`;
          },
          );
          progressRef.current = self.progress;

          /*
           * Divide the timeline into 3 sections.
           */

          const segment = 1 / experiences.length;

          const rawIndex = self.progress / segment;

          const index = Math.min(
            experiences.length - 1,
            Math.floor(rawIndex),
          );

          /*
           * Progress inside current section.
           */

          const localProgress = rawIndex - index;

          /*
           * Keep transitions smooth.
           */

          const fadeDistance = 0.22;

          experiences.forEach((_, itemIndex) => {
            let opacity = 0;
            let y = 35;

            if (itemIndex === index) {
              const fadeIn = Math.min(
                localProgress / fadeDistance,
                1,
              );

              opacity = 1;
              y = (1 - fadeIn) * 35;
            }

            /*
             * Previous item fades away as we move
             * into the next one.
             */

            if (
              itemIndex === index - 1 &&
              localProgress < fadeDistance
            ) {
              const fadeOut = localProgress / fadeDistance;

              opacity = 1 - fadeOut;
              y = -fadeOut * 20;
            }

            gsap.set(titles[itemIndex], {
              opacity,
              y,
            });

            gsap.set(
              descriptions[itemIndex],
              {
                opacity,
                y: y * 0.6,
              },
            );

            gsap.set(numbers[itemIndex], {
              opacity,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-[300vh] bg-lv-black"
    >
      <div
        ref={stickyRef}
        className="relative h-screen overflow-hidden"
      >
        {/* ---------------------------------------------------------------- */}
        {/* THREE.JS                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-full md:w-[62%] lg:w-[58%]">
          <ExperienceScene
            progressRef={progressRef}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* OVERLAYS                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-lv-black/80 via-lv-black/20 to-transparent" />

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-lv-black/80 via-transparent to-lv-black/30" />

        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="absolute left-6 right-6 top-8 z-30 flex items-center justify-between md:left-12 md:right-12 lg:left-20 lg:right-20">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.35em] text-lv-gold">
              06
            </span>

            <span className="h-px w-12 bg-lv-gold/40" />

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-lv-muted">
              Experience
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-lv-muted">
            LV Realty
          </span>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TEXT CONTENT                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="absolute inset-0 z-20 mx-auto flex w-full max-w-[1600px] items-center px-6 md:px-12 lg:px-20">
          <div className="relative w-full max-w-[760px]">
            {experiences.map((experience, index) => (
              <div
                key={experience.number}
                className="absolute left-0 top-1/2 w-full -translate-y-1/2"
              >
                {/* Section number */}
                <div className="mb-8 flex items-center gap-5">
                  <span
                    ref={(element) => {
                      numberRefs.current[index] = element;
                    }}
                    className="font-mono text-xs tracking-[0.3em] text-lv-gold"
                  >
                    {experience.number}
                  </span>

                  <span className="h-px w-16 bg-lv-gold/40" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lv-muted">
                    Experience
                  </span>
                </div>

                {/* Title */}
                <h2
                  ref={(element) => {
                    titleRefs.current[index] = element;
                  }}
                  className="whitespace-nowrap text-[clamp(56px,7vw,112px)] font-light uppercase leading-[0.82] tracking-[-0.065em] text-lv-cream"
                >
                  {experience.title}
                </h2>

                {/* Description */}
                <p
                  ref={(element) => {
                    descriptionRefs.current[index] = element;
                  }}
                  className="mt-10 w-full max-w-[500px] text-sm leading-7 text-lv-muted md:text-base md:leading-8"
                >
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PROGRESS                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div className="absolute bottom-8 left-6 right-6 z-30 md:left-12 md:right-12 lg:left-20 lg:right-20">
          <div className="grid grid-cols-3 gap-4">
            {experiences.map((experience, index) => (
              <div key={experience.number}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[8px] tracking-[0.25em] text-lv-muted">
                    {experience.number}
                  </span>

                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-lv-muted">
                    {experience.title}
                  </span>
                </div>

                <div className="h-px overflow-hidden bg-white/10">
                  <div
                    className="h-full origin-left bg-lv-gold"
                    style={{
                      transform:
                        index === 0 ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </div>
                <div
                  ref={(element) => {
                    progressBars.current[index] = element;
                  }}
                  className="h-full origin-left bg-lv-gold"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 right-6 z-30 hidden md:block lg:right-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-lv-muted">
              Scroll
            </span>

            <span className="h-px w-8 bg-lv-gold/40" />
          </div>
        </div>
      </div>
    </section>
  );
}