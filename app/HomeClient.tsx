"use client";

import { useEffect } from "react";
import Particles from "@/bits/particles";
import BG from "@/components/BG";
import Hero from "@/components/Hero";

export default function HomeClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="-z-5 h-screen bg-transparent w-full fixed top-0 left-0 min-h-screen">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={400}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      <Hero />
      <div className="flex-1 fixed -z-10 top-5 left-0 w-full min-h-screen">
        <BG />
      </div>
    </>
  );
}
