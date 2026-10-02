"use client";

import { useEffect } from "react";
import { catalogStyle, catalogHtml } from "./catalog-content";

export default function Home() {
  // ── HERO BANNER ROTATIVO ──────────────────────────────
  useEffect(() => {
    const banner = document.getElementById("heroBanner");
    if (!banner) return;

    const slides = Array.from(banner.querySelectorAll(".hero-banner-slide"));
    const dots   = Array.from(banner.querySelectorAll(".hero-banner-dot"));
    const prev   = document.getElementById("bannerPrev");
    const next   = document.getElementById("bannerNext");
    let current  = 0;
    let timer;

    function goTo(idx) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    prev?.addEventListener("click", () => { goTo(current - 1); resetAuto(); });
    next?.addEventListener("click", () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); resetAuto(); }));

    // swipe support
    let touchStartX = 0;
    banner.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    banner.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); resetAuto(); }
    });

    startAuto();
    return () => clearInterval(timer);
  }, []);

  // ── LIGHTBOX ──────────────────────────────────────────
  useEffect(() => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    if (!lightbox || !lightboxImg || !lightboxCaption || !closeBtn) return;

    let lastTrigger = null;

    function openLightbox(trigger) {
      const img = trigger.querySelector("img");
      if (!img) return;
      lastTrigger = trigger;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = trigger.getAttribute("data-name") || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lightboxImg.src = "";
      if (lastTrigger) lastTrigger.focus();
    }

    function onKeydown(e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    }

    function onLightboxClick(e) {
      if (e.target === lightbox) closeLightbox();
    }

    const triggers = Array.from(document.querySelectorAll(".zoom-trigger"));
    triggers.forEach((btn) => btn.addEventListener("click", () => openLightbox(btn)));
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", onLightboxClick);
    document.addEventListener("keydown", onKeydown);

    return () => {
      triggers.forEach((btn) => btn.removeEventListener("click", () => openLightbox(btn)));
      closeBtn.removeEventListener("click", closeLightbox);
      lightbox.removeEventListener("click", onLightboxClick);
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: catalogStyle }} />
      <div dangerouslySetInnerHTML={{ __html: catalogHtml }} />
    </>
  );
}
