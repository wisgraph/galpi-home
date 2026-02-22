import React from "react";
import HeroTextSection from "./hero/HeroTextSection";
import HeroCinematicSection from "./hero/HeroCinematicSection";

const Hero: React.FC = () => {
  return (
    <section className="bg-white dark:bg-slate-950 overflow-hidden">
      <HeroTextSection />
      <HeroCinematicSection />
    </section>
  );
};

export default Hero;
