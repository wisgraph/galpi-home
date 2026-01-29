import React, { forwardRef } from "react";
import { Persona } from "./personaData";
import { useTheme } from "../../contexts/ThemeContext";

interface PersonaPanelProps {
  persona: Persona;
  index: number;
  total: number;
}

const PersonaPanel = forwardRef<HTMLDivElement, PersonaPanelProps>(
  ({ persona, index, total }, ref) => {
    const { isDark } = useTheme();

    const accentColor = isDark
      ? persona.theme.accent
      : persona.theme.accentLight;

    return (
      <div
        ref={ref}
        className="h-screen w-full relative overflow-hidden flex flex-col md:flex-row items-center justify-center bg-white dark:bg-slate-950 px-6 md:px-10 lg:px-16"
      >
        {/* 1. Immersive Apple-Style Background */}
        <div
          className={`persona-bg absolute inset-0 transition-colors duration-1000 pointer-events-none`}
        >
          {/* Subtle Deep Glows */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[200px] opacity-10 mix-blend-screen"
            style={{ backgroundColor: accentColor }}
          />

          {/* Outlined Counter - Repositioned to top left */}
          <div
            className="absolute left-[4%] top-[6%] text-[6rem] md:text-[10rem] lg:text-[14rem] font-black leading-none select-none opacity-[0.15] dark:opacity-[0.2]"
            style={{
              WebkitTextStroke: isDark ? "2px rgba(255,255,255,0.4)" : "2px rgba(0,0,0,0.1)",
              color: "transparent",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* 2. Cinematic Content Area (Left Focus) */}
        <div className="persona-content relative z-20 w-full md:w-[40%] flex flex-col items-start gap-1 md:translate-y-8">
          {/* H1: Role */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
            {persona.role}
          </h1>

          {/* H2: Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-700 dark:text-white/80 leading-[1.15] tracking-tight mt-6 max-w-xl">
            {persona.title}
          </h2>

          <div className="h-0.5 w-12 bg-slate-200 dark:bg-white/20 mt-10 mb-6" />

          {/* H5: PainPoint */}
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight max-w-lg leading-relaxed">
            {persona.painPoint.replace(/\*\*/g, "")}
          </p>
        </div>

        {/* 3. Central Visual Section (Right Focus) */}
        <div className="persona-solution relative z-10 w-full md:w-[60%] flex flex-col items-center justify-center mt-12 md:mt-0 md:-ml-20">
          {/* Asset Composition Stack - Container simplified, images adjusted size */}
          <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center group scale-100 md:scale-110 lg:scale-[1.25]">
            {/* 1. Bottom Layer: Base App (Obsidian/PDF) - Raw Image (No Shadow/Border) */}
            <div className="relative z-10 w-[60%] transform transition-all duration-1000 group-hover:scale-[1.01]">
              <img
                src={persona.image}
                alt="Workspace"
                className="w-full h-auto"
              />
            </div>

            {/* ... (secondary and extra layers) ... */}

            {/* 2. Middle Layer: Secondary result - Raw Image */}
            {persona.secondaryImages && persona.secondaryImages[1] && (
              <div className="absolute z-20 bottom-[-18%] left-1/2 -translate-x-1/2 w-[50%] transform rotate-1 group-hover:rotate-0 transition-transform duration-1000 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <img
                  src={persona.secondaryImages[1]}
                  alt="Result"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* 3. Extra Layer: Tertiary result (Top-Left) - Raw Image */}
            {persona.secondaryImages && persona.secondaryImages[2] && (
              <div className="absolute z-25 top-[-10%] left-[-5%] w-[40%] transform -rotate-2 group-hover:rotate-0 transition-transform duration-1000 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                <img
                  src={persona.secondaryImages[2]}
                  alt="Extra context"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* 4. Top Layer: Main Launcher - Raw Image (Enlarged) */}
            {persona.secondaryImages && persona.secondaryImages[0] && (
              <div className="absolute z-30 top-1/2 right-7 -translate-y-1/2 w-[65%] transform transition-all duration-700 group-hover:scale-[1.05] group-hover:-translate-y-[55%] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                <img
                  src={persona.secondaryImages[0]}
                  alt="Launcher Focus"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* H4: Solution (Positioned lower with high Z-index and subtle contrast glow) */}
          <div className="mt-24 md:mt-32 text-center max-w-xl relative z-40">
            {/* Subtle Gradient Glow for readability */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full bg-white/40 dark:bg-slate-950/40 blur-3xl rounded-full" />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 mb-1">
                The Solution
              </span>
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {persona.solution}
              </h4>
              <div className="h-px w-8 bg-slate-200 dark:bg-white/20 mt-3" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PersonaPanel.displayName = "PersonaPanel";

export default PersonaPanel;
