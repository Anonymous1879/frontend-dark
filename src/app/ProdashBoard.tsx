// components/ProdashBoard.tsx

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProdashBoard = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const splineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (splineRef.current) {
      gsap.fromTo(
        splineRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: splineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Feature Description on the Left */}
      <div ref={textRef} className="w-full md:w-1/2 p-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Pro Dashboard </h1>
        <p className="text-lg text-gray-700 mb-2">
          Discover the power of our Pro Dashboard, designed to provide you with comprehensive insights and analytics.
        </p>
        <p className="text-lg text-gray-700">
          Our dashboard offers an intuitive interface and advanced features to help you make informed decisions and optimize your operations.
        </p>
      </div>

      {/* Spline 3D Scene on the Right */}
      <div ref={splineRef} className="w-full md:w-1/2 h-full flex items-center justify-center p-4">

      </div>
    </section>
  );
};

export default ProdashBoard;