import React, { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import HeroScene from "./HeroScene";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const sideLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // Initial states
      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 100,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(actionsRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(indexRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(sideLabelRef.current, {
        opacity: 0,
      });

      gsap.to(".hero-content", {
        y: -180,
        opacity: 0,

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-3d", {
        y: 120,
        scale: 1.1,

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Eyebrow
      timeline.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
      });

      // Main title
      timeline.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
        },
        "-=0.45",
      );

      // Description
      timeline.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.55",
      );

      // CTA
      timeline.to(
        actionsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4",
      );

      // Bottom index
      timeline.to(
        indexRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.35",
      );

      // Side label
      timeline.to(
        sideLabelRef.current,
        {
          opacity: 1,
          duration: 0.8,
        },
        "-=0.5",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-lv-black"
    >
      {/* 3D */}
      <div className="hero-3d absolute inset-y-0 right-[-5%] w-[65%] md:right-[-3%] md:w-[58%] lg:right-0 lg:w-[55%]">
        <HeroScene />
      </div>

      {/* Lighting / atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(212,175,55,0.09),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lv-black via-lv-black/80 via-[45%] to-transparent" />

      {/* Hero content */}
      <div className="hero-content relative z-10 flex min-h-screen items-center px-6 pb-20 pt-28 md:px-12 lg:px-20">
        <div className="w-full md:w-[58%] lg:w-[55%]">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-lv-gold" />

            <span className="text-[10px] tracking-[0.35em] text-lv-gold md:text-xs">
              LUXURY REAL ESTATE
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={titleRef}
            className="text-[15vw] font-light uppercase leading-[0.78] tracking-[-0.055em] text-lv-cream md:text-[10vw] lg:text-[8.5vw]"
          >
            EXCEPTIONAL
            <br />

            <span className="font-serif italic text-lv-gold">
              SPACES.
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mt-10 max-w-md text-sm font-light leading-7 text-lv-muted md:text-base"
          >
            Architecture, investment and lifestyle
            <br className="hidden sm:block" />
            brought together in one experience.
          </p>

          {/* Actions */}
          <div
            ref={actionsRef}
            className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center"
          >
            <a
              href="#collection"
              className="group inline-flex w-fit items-center gap-4 border border-lv-gold bg-lv-gold px-6 py-4 text-[10px] font-medium tracking-[0.2em] text-lv-black transition-all duration-300 hover:bg-transparent hover:text-lv-gold"
            >
              EXPLORE PROPERTIES

              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <div className="flex items-center gap-3 text-[9px] tracking-[0.25em] text-lv-muted">
              <ArrowDown
                size={14}
                strokeWidth={1}
                className="animate-bounce text-lv-gold"
              />

              SCROLL TO DISCOVER
            </div>
          </div>
        </div>
      </div>

      {/* Bottom index */}
      <div
        ref={indexRef}
        className="absolute bottom-8 left-6 z-10 flex items-center gap-4 text-[9px] tracking-[0.25em] text-lv-muted md:left-12 lg:left-20"
      >
        <span className="text-lv-gold">01</span>

        <span className="h-px w-10 bg-white/20" />

        <span>THE COLLECTION</span>
      </div>

      {/* Vertical label */}
      <div
        ref={sideLabelRef}
        className="absolute bottom-10 right-6 z-10 hidden rotate-90 origin-bottom-right text-[8px] tracking-[0.35em] text-white/30 lg:block"
      >
        LV REALTY — ARCHITECTURE / INVESTMENT / LIFESTYLE
      </div>
    </section>
  );
}