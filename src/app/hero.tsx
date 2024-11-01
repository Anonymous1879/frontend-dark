"use client";

import React from "react";
import Slider from "react-slick";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import SparklesText from "@/components/ui/sparkles-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BorderBeam } from "@/components/ui/border-beam";

interface HeroProps {
  logos: string[];
  logoSettings: {
    [key: string]: any;
  };
  handleKathmanduClick: () => void;
}

const AnimatedGradientTextDemo: React.FC = () => {
  return (
    <div className="z-10 flex items-center justify-center py-4">
      <AnimatedGradientText>
        🎉 <hr className="mx-4 h-6 w-px shrink-0 bg-gray-600" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent px-2`
          )}
        >
          Introducing NoaiGPT
        </span>
        <ChevronRight className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
};

export function SparklesTextDemo() {
  return <SparklesText text="Human Writing" />;
}

const stats = [
  {
    data: "35K",
    title: "Customers",
  },
  {
    data: "10K+",
    title: "Downloads",
  },
  {
    data: "40+",
    title: "Countries",
  },
  {
    data: "30M+",
    title: "Total revenue",
  },
];

export function BorderBeamDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-gray-700 bg-neutral-900 md:shadow-xl">
      <div className="w-full h-full overflow-hidden rounded-lg">
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/GDlkCkcIqTasds?autoplay=1&controls=0&mute=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full"
        ></iframe>
      </div>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}


const Hero: React.FC<HeroProps> = ({ logos, logoSettings, handleKathmanduClick }) => {
  return (
    <section className="text-center py-8 px-4 md:px-8 bg-neutral-900 min-h-screen"> {/* Updated background color */}
      <AnimatedGradientTextDemo />

      <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-6 text-white"> {/* Text color updated */}
        Transform AI Text into Natural
      </h2>

      <div className="my-6">
        <SparklesTextDemo />
      </div>

      <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto"> {/* Text color updated */}
        Effortlessly bypass AI detectors with our cutting-edge tool, ensuring a
        natural flow and undetectable AI traces.
      </p>

      <Slider {...logoSettings} className="mb-12 w-full md:w-3/4 lg:w-1/2 mx-auto">
        {logos.map((logo: string, index: number) => (
          <div key={index} className="flex justify-center px-4">
            <img src={logo} alt={`Logo ${index}`} className="h-12 object-contain" />
          </div>
        ))}
      </Slider>

      <div className="flex justify-center mb-12 max-w-4xl mx-auto">
        <BorderBeamDemo />
      </div>

      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-400 md:px-8"> {/* Text color updated */}
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white text-3xl font-semibold sm:text-4xl"> {/* Text color updated */}
              Join Thousands of Writers across the world
            </h3>
            <p className="mt-3">
              Every piece of content should feel alive, relatable, and truly human. Our advanced technology transforms AI-generated text into something that resonates on a personal level.
            </p>
          </div>
          <div className="mt-12">
            <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
              {stats.map((item, idx) => (
                <li key={idx} className="text-center px-12 md:px-16">
                  <h4 className="text-4xl text-indigo-400 font-semibold">{item.data}</h4> {/* Text color updated */}
                  <p className="mt-3 font-medium">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;
