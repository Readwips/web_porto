"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroPhoto() {
  const [showsProfile, setShowsProfile] = useState(false);

  useEffect(() => {
    const swapInterval = window.setInterval(() => {
      setShowsProfile((current) => !current);
    }, 4000);

    return () => window.clearInterval(swapInterval);
  }, []);

  return (
    <div
      className="hero-photo"
      role="img"
      aria-label="Foto Setyo Agung Prabowo berganti dengan avatar pixel art"
    >
      <div
        className={`hero-photo-layer hero-photo-pixel ${showsProfile ? "is-hidden" : "is-active"}`}
        aria-hidden={showsProfile}
      >
        <Image
          src="/vivy.jpg"
          alt=""
          width={960}
          height={960}
          sizes="(max-width: 768px) 78vw, 360px"
          priority
        />
      </div>
      <div
        className={`hero-photo-layer hero-photo-profile ${showsProfile ? "is-active" : "is-hidden"}`}
        aria-hidden={!showsProfile}
      >
        <Image
          src="/setyo-profile.jpg"
          alt=""
          width={506}
          height={608}
          sizes="(max-width: 768px) 78vw, 360px"
        />
      </div>
      <div className="availability">
        <span aria-hidden="true" />
        Terbuka untuk peluang kerja
      </div>
    </div>
  );
}
