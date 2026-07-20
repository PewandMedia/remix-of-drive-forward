import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Rendert ein Video in ein <canvas>, damit Browser-Overlays
 * (Opera "Video-Popout", Chrome Media-Hover-Controls) nicht erscheinen.
 * Das <video>-Element bleibt offscreen und liefert nur die Frames.
 */
export function HeroCanvasVideo({ src, poster, className, ariaLabel }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = parent.clientWidth * dpr;
        const h = parent.clientHeight * dpr;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (vw && vh && video.readyState >= 2) {
        const cw = canvas.width;
        const ch = canvas.height;
        // object-cover
        const scale = Math.max(cw / vw, ch / vh);
        const dw = vw * scale;
        const dh = vh * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;
        ctx.drawImage(video, dx, dy, dw, dh);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const startPlay = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", startPlay);
    startPlay();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", startPlay);
      video.pause();
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"

        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          left: -9999,
          top: -9999,
        }}
      />
      <canvas
        ref={canvasRef}
        className={className}
        aria-label={ariaLabel}
        role="img"
      />
    </>
  );
}
