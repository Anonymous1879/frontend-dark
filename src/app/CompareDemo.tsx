import React from "react";
import { Compare } from "@/components/ui/compare";
import ShineBorder from "@/components/ui/shine-border";

export function CompareDemo() {
  return (
    <section className="mt-4 h-[100vh] flex justify-center items-center bg-neutral-900"> {/* Dark background for the section */}
      <div className="h-full w-full flex justify-center items-center">
        <div className="p-2 border rounded-3xl bg-neutral-800 border-neutral-700"> {/* Dark background and border */}
          <Compare
            firstImage="https://assets.aceternity.com/code-problem.png"
            secondImage="https://assets.aceternity.com/code-solution.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[250px] w-[200px] md:h-[500px] md:w-[800px]"
            slideMode="hover"
          />
        </div>
      </div>
    </section>
  );
}
