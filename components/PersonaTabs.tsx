import React, { useRef } from "react";
import { personas } from "./persona/personaData";
import PersonaHeader from "./persona/PersonaHeader";
import PersonaPanel from "./persona/PersonaPanel";
import PersonaCTA from "./persona/PersonaCTA";
import { usePersonaAnimation } from "../hooks/usePersonaAnimation";

const PersonaTabs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  usePersonaAnimation(containerRef, panelsRef, personas.length);

  return (
    <section ref={containerRef} id="personas" className="relative bg-slate-350">
      <PersonaHeader />

      {personas.map((persona, index) => (
        <PersonaPanel
          key={persona.id}
          ref={(el) => {
            if (el) panelsRef.current[index] = el;
          }}
          persona={persona}
          index={index}
          total={personas.length}
        />
      ))}

      <PersonaCTA />
    </section>
  );
};

export default PersonaTabs;
