"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, profile } from "./portfolio-data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsOpen(false);
      menuButton.current?.focus();
    };

    const closeOnClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuButton.current?.contains(e.target as Node) ||
        navRef.current?.contains(e.target as Node)
      ) return;
      setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("mousedown", closeOnClickOutside);
    window.addEventListener("touchstart", closeOnClickOutside);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("mousedown", closeOnClickOutside);
      window.removeEventListener("touchstart", closeOnClickOutside);
    };
  }, [isOpen]);

  const nav = (
    <nav
      ref={navRef}
      className={`primary-navigation ${isOpen ? "open" : ""}`}
      id="primary-navigation"
      aria-label="Navigasi utama"
    >
      {navItems.map((item) => (
        <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
          {item.label}
        </a>
      ))}
      <a
        className="button button-small"
        href={profile.cv}
        download
        onClick={() => setIsOpen(false)}
      >
        Download CV
      </a>
    </nav>
  );

  return (
    <>
      <header className="site-header">
        <div className="container navbar-shell">
          <a className="brand" href="#top">
            <img src="/logo_r.png" alt="Setyo Agung" className="brand-logo" />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          {!isMobile && nav}
        </div>
      </header>
      {isMobile && createPortal(
        <>
          {nav}
          <div
            className={`nav-overlay ${isOpen ? "open" : ""}`}
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        </>,
        document.body
      )}
    </>
  );
}
