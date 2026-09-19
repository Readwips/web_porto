"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "./portfolio-data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      menuButton.current?.focus();
    };

    const closeOnClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuButton.current?.contains(event.target as Node) ||
        navRef.current?.contains(event.target as Node)
      ) {
        return;
      }
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

  return (
    <>
      <header className="site-header">
        <div className="container navbar-shell">
          <a className="brand" href="#top" onClick={() => setIsOpen(false)}>
            Setyo Agung
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <nav
        ref={navRef}
        className={`primary-navigation ${isOpen ? "open" : ""}`}
        id="primary-navigation"
        aria-label="Navigasi utama"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={handleNavClick}>
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
      <div
        className={`nav-overlay ${isOpen ? "open" : ""}`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
