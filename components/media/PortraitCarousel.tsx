"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./PortraitCarousel.module.css";

const INTERVAL_MS = 5000;

type PortraitCarouselProps = {
  images: { src: string; alt: string }[];
};

export function PortraitCarousel({ images }: PortraitCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current || images.length < 2) {
      return;
    }

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, images.length]);

  return (
    <div
      className={styles.frame}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className={styles.corner} data-pos="tl" aria-hidden="true" />
      <span className={styles.corner} data-pos="tr" aria-hidden="true" />
      <span className={styles.corner} data-pos="bl" aria-hidden="true" />
      <span className={styles.corner} data-pos="br" aria-hidden="true" />

      <div className={styles.stack}>
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            priority={index === 0}
            className={styles.image}
            style={{ opacity: index === active ? 1 : 0 }}
          />
        ))}
      </div>

      {images.length > 1 ? (
        <div className={styles.dots} role="tablist" aria-label="Photos">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              className={styles.dot}
              data-active={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
