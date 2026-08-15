window.si =
  window.si ||
  function () {
    (window.si.q = window.si.q || []).push(arguments);
  };
const siScript = document.createElement("script");
siScript.defer = true;
siScript.src = "/_vercel/insights/script.js";
document.head.appendChild(siScript);

window.va =
  window.va ||
  function () {
    (window.va.q = window.va.q || []).push(arguments);
  };
const vaScript = document.createElement("script");
vaScript.defer = true;
vaScript.src = "/_vercel/analytics/script.js";
document.head.appendChild(vaScript);

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const themeKey = "nazilla-theme";
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (!themeToggle) return;
  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Ubah ke mode terang" : "Ubah ke mode gelap"
  );
}

const initialTheme =
  localStorage.getItem(themeKey) ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
  });
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem(themeKey))
      applyTheme(e.matches ? "dark" : "light");
  });

let scrollLockCount = 0;
const lockScroll = () => {
  scrollLockCount++;
  document.body.style.overflow = "hidden";
  if (lenis) lenis.stop();
};
const unlockScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = "";
    if (lenis) lenis.start();
  }
};

let lenis = null;
if (!prefersReducedMotion) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1 });
  root.classList.add("lenis");
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const scrollProgressEl = document.getElementById("scrollProgress");
const scrollPercentEl = document.getElementById("scrollPercent");

function setScrollProgress(p) {
  const clamped = Math.min(1, Math.max(0, p || 0));

  if (scrollProgressEl) {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      scrollProgressEl.style.width = clamped * 100 + "%";
      scrollProgressEl.style.transform = "none";
    } else {
      scrollProgressEl.style.width = "";
      scrollProgressEl.style.transform = `scaleY(${clamped})`;
    }
  }

  if (scrollPercentEl)
    scrollPercentEl.textContent = Math.round(clamped * 100) + "%";
}
function updateScrollProgressNative() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  setScrollProgress(max > 0 ? window.scrollY / max : 0);
}

function syncScrollers() {
  if (window.ScrollTrigger) ScrollTrigger.refresh();
  if (lenis) lenis.resize();
  updateScrollProgressNative();
}

function trackProgressDuring(durationMs, onDone) {
  const start = performance.now();
  function tick(now) {
    updateScrollProgressNative();
    if (now - start < durationMs) {
      requestAnimationFrame(tick);
    } else if (onDone) {
      onDone();
    }
  }
  requestAnimationFrame(tick);
}
if (lenis) {
  lenis.on("scroll", (e) => setScrollProgress(e.progress));
} else {
  updateScrollProgressNative();
  window.addEventListener("scroll", updateScrollProgressNative, {
    passive: true
  });
}
window.addEventListener("resize", syncScrollers);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href === "#") {
      e.preventDefault();
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -20 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function hideLoader() {
  document.body.classList.remove("is-loading");
  const loader = document.getElementById("loader");
  if (loader) setTimeout(() => loader.classList.add("is-hidden"), 400);

  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
}
window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 3500);

if (!prefersReducedMotion) {
  const timelineList = document.getElementById("timelineList");
  const lineProgress = document.getElementById("tLineProgress");

  if (timelineList && lineProgress) {
    gsap.to(lineProgress, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: timelineList,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.4
      }
    });
    gsap.utils.toArray(".t-dot").forEach((dot) => {
      ScrollTrigger.create({
        trigger: dot,
        start: "top 65%",
        end: "bottom 35%",
        toggleClass: { targets: dot, className: "is-active" }
      });
    });
  }

  const marqueeWrap = document.querySelector(".marquee-wrap");
  if (marqueeWrap) {
    gsap.fromTo(
      marqueeWrap,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: marqueeWrap,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}

function initInteractiveElements() {
  if (!prefersReducedMotion) {
    const container = document.querySelector(".petals");
    if (container) {
      const total = window.innerWidth < 700 ? 6 : 14;
      for (let i = 0; i < total; i++) {
        const petal = document.createElement("span");
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = 10 + Math.random() * 10 + "s";
        petal.style.animationDelay = Math.random() * 12 + "s";
        petal.style.setProperty("--drift", (Math.random() - 0.5) * 40 + "px");
        container.appendChild(petal);
      }
      document.addEventListener("visibilitychange", () => {
        container.querySelectorAll("span").forEach((s) => {
          s.style.animationPlayState = document.hidden ? "paused" : "running";
        });
      });
    }
  }

  document.querySelectorAll(".marquee").forEach((marquee) => {
    const track = marquee.querySelector(".marquee-track");
    if (!track) return;
    Array.from(track.children).forEach((item) => {
      if (item.hasAttribute("aria-hidden")) return;
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");
      track.appendChild(clone);
    });
  });

  const navToggle = document.getElementById("navToggle");
  const navlinks = document.querySelector(".navlinks");
  if (navToggle && navlinks) {
    const closeMenu = () => {
      navToggle.classList.remove("is-open");
      navlinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const open = navlinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navlinks
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));
  }

  document.querySelectorAll(".envelope").forEach((btn) => {
    const contentId = btn.getAttribute("aria-controls");
    const content = contentId ? document.getElementById(contentId) : null;

    if (content) {
      content.setAttribute("data-lenis-prevent", "true");
    }

    const targetHeight = () => {
      const cap =
        window.innerWidth <= 900 ? window.innerHeight * 0.5 : Infinity;
      return Math.min(content.scrollHeight, cap);
    };

    btn.addEventListener("click", () => {
      const willOpen = !btn.classList.contains("is-open");
      btn.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
      if (!content) return;

      if (willOpen) {
        content.hidden = false;
        content.style.maxHeight = "0px";
        void content.offsetHeight;
        requestAnimationFrame(() => {
          content.classList.add("is-visible");
          content.style.maxHeight = targetHeight() + "px";
        });
        trackProgressDuring(520, syncScrollers);
      } else {
        content.style.maxHeight = targetHeight() + "px";
        void content.offsetHeight;
        requestAnimationFrame(() => {
          content.classList.remove("is-visible");
          content.style.maxHeight = "0px";
        });
        trackProgressDuring(500, () => {
          content.hidden = true;
          syncScrollers();
        });
      }
    });
  });

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = document.getElementById("lbImg");
    const lbCaption = document.getElementById("lbCaption");
    const btnClose = document.getElementById("lbClose");
    const btnPrev = document.getElementById("lbPrev");
    const btnNext = document.getElementById("lbNext");
    const items = [];
    let current = 0;
    let lastFocused = null;

    document.querySelectorAll(".marquee-item[data-index]").forEach((btn) => {
      const idx = Number(btn.dataset.index);
      if (!items[idx]) {
        const img = btn.querySelector("img");
        const captionEl = btn.querySelector(".marquee-caption");
        items[idx] = {
          src: img ? img.getAttribute("src") : "",
          caption: captionEl ? captionEl.textContent : ""
        };
      }
      btn.addEventListener("click", () => openLightbox(idx));
    });

    function show(index) {
      current = (index + items.length) % items.length;
      const item = items[current];
      lbImg.style.opacity = "0";
      lbImg.onload = () => {
        lbImg.style.opacity = "1";
      };
      lbImg.src = item.src;
      lbImg.alt = item.caption;
      lbCaption.textContent = item.caption;
    }

    function openLightbox(index) {
      show(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lockScroll();
      lastFocused = document.activeElement;
      btnClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      unlockScroll();
      if (lastFocused) lastFocused.focus();
    }

    btnClose.addEventListener("click", closeLightbox);
    btnPrev.addEventListener("click", () => show(current - 1));
    btnNext.addEventListener("click", () => show(current + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);

      if (e.key === "Tab") {
        e.preventDefault();
        const focusables = [btnClose, btnPrev, btnNext];
        const activeIndex = focusables.indexOf(document.activeElement);
        let nextIndex = e.shiftKey ? activeIndex - 1 : activeIndex + 1;
        if (nextIndex < 0) nextIndex = focusables.length - 1;
        if (nextIndex >= focusables.length) nextIndex = 0;
        focusables[nextIndex].focus();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInteractiveElements);
} else {
  initInteractiveElements();
}
