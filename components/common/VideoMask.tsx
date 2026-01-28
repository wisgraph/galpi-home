import React from "react";

interface VideoMaskProps {
  src: string;
  /** Radius for the mask corners (e.g., "1rem", "12px") */
  borderRadius?: string;
  /** Container style classes */
  className?: string;
  /**
   * Percentage to crop from each side to remove black bars
   * e.g., { top: 5, bottom: 5, left: 3, right: 3 }
   */
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  /** Standard video attributes */
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  /** Additional classes for the video element itself */
  videoClassName?: string;
  /** Ref to the video element if needed */
  videoRef?: React.RefObject<HTMLVideoElement>;
}

/**
 * VideoMask Component
 *
 * Used to "crop" macOS screen recordings and eliminate black borders/bars.
 * It creates a wrapper with overflow-hidden and sizes the video slightly larger
 * based on the 'crop' percentages.
 */
const VideoMask: React.FC<VideoMaskProps> = ({
  src,
  borderRadius = "1rem",
  className = "",
  crop = { top: 0, bottom: 0, left: 0, right: 0 },
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  videoClassName = "",
  videoRef,
}) => {
  const t = crop.top || 0;
  const b = crop.bottom || 0;
  const l = crop.left || 0;
  const r = crop.right || 0;

  return (
    <div
      className={`overflow-hidden ${!className.includes("absolute") && !className.includes("fixed") ? "relative" : ""} ${className}`}
      style={{ borderRadius }}
    >
      {/* 
        The trick: 
        1. The container hides anything outside its bounds.
        2. We make the video wider/taller than the container by the crop percentages.
        3. We shift the video up/left to center the content area.
      */}
      <div
        style={{
          width: `${100 + l + r}%`,
          marginLeft: `-${l}%`,
          marginTop: `-${t}%`,
          marginBottom: `-${b}%`,
          height: "auto",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          className={`w-full h-auto block ${videoClassName}`}
        />
      </div>
    </div>
  );
};

export default VideoMask;
