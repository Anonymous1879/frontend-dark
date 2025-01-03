"use client";

import React, { forwardRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NumberTicker from "@/components/ui/number-ticker";

gsap.registerPlugin(ScrollTrigger);

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; color: string }
>(({ className, children, color }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "z-10 flex w-16 h-16 items-center justify-center rounded-full border-2 bg-neutral-800 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
      style={{ borderColor: color }}
    >
      {children}
    </motion.div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const detectorsRef = useRef<HTMLDivElement>(null);
  const openaiRef = useRef<HTMLDivElement>(null);
  const noaigptRef = useRef<HTMLDivElement>(null);
  const noaigptContainerRef = useRef<HTMLDivElement>(null);
  const detectorRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const numberTickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const noaigptContainer = noaigptContainerRef.current;
    const detectors = detectorRefs.map((ref) => ref.current);
    const openai = openaiRef.current;
    const numberTicker = numberTickerRef.current;

    gsap.set(noaigptContainer, { opacity: 0 });
    gsap.set(detectors, { borderColor: "#FF0000" });
    gsap.set(openai, { borderColor: "#FF0000" });
    gsap.set(numberTicker, { color: "#FF0000" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 10%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    tl.to(noaigptContainer, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.in",
    })
      .to(
        [openai, ...detectors],
        {
          borderColor: "#00FF00",
          duration: 0.1,
          stagger: 0.02,
        },
        "-=0.1"
      )
      .to(
        numberTicker,
        {
          innerText: 100,
          duration: 1,
          snap: { innerText: 1 },
          color: "#00FF00",
          onComplete: () => {
            gsap.set(numberTicker, { innerText: "100% Human" });
          },
        },
        "-=0.1"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 p-10 md:shadow-lg", // Updated background color for dark mode
        className
      )}
      ref={containerRef}
    >
      <motion.div
        className="text-center max-w-xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h6 className="text-gray-300">Problem</h6>
        <h3 className="text-4xl font-bold mb-6 text-white">The AI Content Detected</h3>
        <p className="text-xl leading-relaxed mb-8 text-gray-400">
          As AI-generated content becomes increasingly sophisticated, the line
          between human and machine-written text is blurring. AI detectors are
          struggling to keep pace with rapid advancements in language models,
          creating a new challenge for content creators and publishers.
        </p>
      </motion.div>
  
      <div className="flex justify-between items-center w-full max-w-3xl mb-12">
        <div className="flex items-center space-x-20">
          <div className="flex flex-col items-center">
            <Circle ref={openaiRef} color="#FF0000">
              <Icons.openai />
            </Circle>
            <p className="text-sm mt-2 text-center text-gray-300">OpenAI</p>
          </div>
  
          <div ref={noaigptContainerRef} className="flex flex-col items-center">
            <Circle ref={noaigptRef} color="#00FF00">
              <Icons.noaigpt />
            </Circle>
            <p className="text-sm mt-2 text-center text-gray-300">NoAIGPT</p>
          </div>
        </div>
  
        <div
          ref={detectorsRef}
          className="flex flex-col items-center gap-4 mt-8"
        >
          {(
            [
              "gptzero",
              "zerogpt",
              "turnitin",
              "undetectableai",
              "crossplag",
            ] as const
          ).map((icon, index) => (
            <Circle
              key={icon}
              ref={detectorRefs[index]}
              className="detector-circle w-12 h-12"
              color="#FF0000"
            >
              {React.createElement(Icons[icon])}
            </Circle>
          ))}
  
          <p className="text-sm mt-2 text-center text-gray-300">AI Detectors</p>
        </div>
      </div>
  
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mt-4">
          <div className="text-3xl font-semibold tracking-tighter mb-6 text-white">
            Don't worry, We got your back!{" "}
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-6 text-white">
            Introducing NoAIGPT:
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-6 text-white">
            Your Solution to Undetectable AI Content
          </div>
          <div className="text-3xl font-medium tracking-tighter mb-8 text-gray-400">
            Transform Your Content from 0% to{" "}
            <span className="font-bold ">
              <NumberTicker value={100} direction="up" />% Human
            </span>
          </div>
        </div>
        <p className="text-xl leading-relaxed mb-8 text-gray-400">
          NoAIGPT is a groundbreaking tool that revolutionizes AI-generated
          content. Our advanced algorithms analyze and rewrite your text,
          preserving its meaning while introducing the subtle nuances and
          imperfections characteristic of human writing. The result? Content
          that seamlessly passes even the most rigorous AI detection tests.
        </p>
        <p className="text-xl leading-relaxed text-gray-400">
          Whether you're a blogger, marketer, or journalist, NoAIGPT empowers
          you to harness the efficiency of AI without compromising authenticity.
          Focus on crafting compelling narratives that resonate with your
          audience, confident that your AI-assisted content remains undetectable
          and true to your voice.
        </p>
      </motion.div>
  
      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={openaiRef}
        toRef={noaigptRef}
        duration={3}
        curvature={0}
        pathWidth={3}
        pathOpacity={0.6}
        gradientStartColor="#FF0000"
        gradientStopColor="#00FF00"
        startXOffset={20}
        startYOffset={0}
        endXOffset={-20}
        endYOffset={0}
      />
      {detectorRefs.map((ref, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={noaigptRef}
          toRef={ref}
          duration={3}
          curvature={10}
          pathOpacity={0.4}
          startXOffset={20}
          startYOffset={0}
          endXOffset={-12}
          endYOffset={0}
        />
      ))}
    </div>
  );
  
}

const Icons = {
  noaigpt: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  gptzero: () => (
    <img src="/assets/logos/Gptzero.webp" alt="GPTZero" width="100%" height="100%" className="filter brightness-0 invert" />
  ),
  turnitin: () => (
    <img src="/assets/logos/turnitin.webp" alt="Turnitin" width="100%" height="100%" className="filter brightness-0 invert" />
  ),
  zerogpt: () => (
    <img src="/assets/logos/zerogpt.webp" alt="ZeroGPT" width="100%" height="100%" className="filter brightness-0 invert" />
  ),
  undetectableai: () => (
    <img src="/assets/logos/Undetectable.webp" alt="Undetectable AI" width="100%" height="100%" className="filter brightness-0 invert" />
  ),
  crossplag: () => (
    <img src="/assets/logos/Crossplag.webp" alt="Crossplag" width="100%" height="100%" className="filter brightness-0 invert"/>
  ),
};
