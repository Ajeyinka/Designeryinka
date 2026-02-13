(function () {
  "use strict";
  const toggleButton = document.querySelector("#toggle_button");
  const menuBars = document.querySelectorAll(".bar");
  const menuText = document.querySelector(".btn-toggle-hold p");

  if (toggleButton) {
    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();

      menuBars.forEach((bar) => {
        bar.classList.toggle("active");
      });

      if (menuText.textContent === "MENU") {
        menuText.textContent = "CLOSE";
      } else {
        menuText.textContent = "MENU";
      }
    });
  }

  const menu = document.querySelector(".nav_menu");
  const toggle = document.querySelector("#toggle_button");
  const links = menu.querySelectorAll(".nav_menu li");

  const tl = gsap.timeline({
    paused: true,
    reversed: true,
  });

  tl.set(menu, { display: "block" })
    .from(menu, {
      autoAlpha: 0,
      duration: 0.3,
    })
    .from(
      links,
      {
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.1"
    );

  toggle.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });

  tl.eventCallback("onReverseComplete", () => {
    gsap.set(menu, { display: "none" });
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      tl.reverse();
    });
  });

  document.querySelectorAll(".anime").forEach((link) => {
    const text = link.querySelector("span");
    let isAnimating = false;

    function animateText(direction = "up") {
      if (isAnimating) return;
      isAnimating = true;

      // Determine directions
      const exitY = direction === "up" ? -100 : 100; // slide out
      const startY = direction === "up" ? 100 : -100; // snap to opposite side

      gsap.to(text, {
        yPercent: exitY,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(text, { yPercent: startY });
          gsap.to(text, {
            yPercent: 0,
            duration: 0.25,
            ease: "power3.out",
            onComplete: () => {
              isAnimating = false;
            },
          });
        },
      });
    }

    link.addEventListener("mouseenter", () => animateText("up"));
    link.addEventListener("mouseleave", () => animateText("down"));
  });
})();

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".tabs_component .tabs_menu a");
    const sections = document.querySelectorAll(".tabs_pane");

    // Adjust this once
    const OFFSET = 150; // header height + breathing room

    /* ---------- smooth scroll ---------- */
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        const top =
          target.getBoundingClientRect().top + window.pageYOffset - OFFSET;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      });
    });

    /* ---------- intersection observer ---------- */
    let activeId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with the highest visibility
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.id;
        if (id === activeId) return;

        activeId = id;

        links.forEach((link) => {
          link.classList.toggle(
            "selected",
            link.getAttribute("href") === `#${id}`
          );
        });
      },
      {
        root: null,
        rootMargin: `-${OFFSET}px 0px -50% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
  });
})();

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle === "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => {
  item.addEventListener("click", toggleAccordion);
});

gsap.to(".floating-text", {
  y: -8,
  opacity: 1,
  duration: 2,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1,
});

(function () {
  "use strict";

  window.addEventListener("load", () => {
    const hasAnimated = sessionStorage.getItem("hasAnimated");
    const loader = document.querySelector(".page-loader");
    const percent = document.querySelector(".loader-percent");
    const pageContent = document.querySelector(".page-content");

    // Skip loader if animation already played
    if (hasAnimated) {
      if (loader) loader.style.display = "none";
      if (pageContent) pageContent.style.opacity = 1;
      document.body.style.overflow = "auto";
      return;
    }

    // Elements
    const heroEl = document.querySelector(".hero-headings");
    const paraEl = document.querySelector(".ppes");

    let heroText, paraText;

    if (heroEl) {
      heroText = new SplitType(heroEl, {
        types: "lines, words",
        lineClass: "line",
        wordClass: "word",
      });
    }

    if (paraEl) {
      paraText = new SplitType(paraEl, {
        types: "lines, words",
        lineClass: "line",
        wordClass: "word",
      });
    }

    const counter = { value: 0 };

    // Timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => sessionStorage.setItem("hasAnimated", "true"),
    });

    /* Loader + counter */
    tl.to(counter, {
      value: 100,
      duration: 1.6,
      onUpdate: () => {
        if (percent) percent.textContent = `${Math.round(counter.value)}%`;
      },
    })
      .to(".loader-bar", { scaleX: 1, duration: 1.2 }, 0)
      .to(loader, { yPercent: -100, duration: 0.8 })
      .set(loader, { display: "none" })
      .to("body", { overflow: "auto" })
      .to(pageContent, { opacity: 1, duration: 0.4 });

    /* Paragraph animation */
    if (paraText) {
      tl.from(
        paraText.words,
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.025,
        },
        "-=0.2"
      );
    }

    /* UI elements */
    tl.from(".top", { y: -40, opacity: 0, duration: 0.35 }).from(
      ".bts",
      { y: 40, opacity: 0, duration: 0.45 },
      "-=0.2"
    );

    /* Hero heading animation */
    if (heroText) {
      tl.from(
        heroText.words,
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.03,
        },
        "-=0.3"
      );
    }

    /* Image animation */
    tl.from(
      ".image-wrap",
      { scale: 0.92, opacity: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );

    tl.from(".logo-marquee", {
      scale: 0,
      opacity: 0,
      y: 40,
      duration: 0.7,
    });

    /* Section navigation animation */
    tl.from(
      ".two-col-flex",
      { opacity: 0, y: -40, duration: 0.8, ease: "power3.out" },
      "-=0.35"
    );
  });
})();

gsap.registerPlugin(ScrollTrigger);

gsap.from(".logo-marquee", {
  x: 200,
  y: 20,
  width: "100vh",
  opacity: 0.8,
  ease: "none",
  scrollTrigger: {
    trigger: ".scrolls",
    start: "top 90%",
    end: "bottom 20%",
    scrub: true,
  },
});

gsap.utils.toArray(".portfolio-item").forEach((item) => {
  gsap.from(item, {
    scale: 0.88,
    ease: "none",
    scrollTrigger: {
      trigger: item,
      start: "top 95%",
      end: "bottom 40%",
      scrub: true,
    },
  });
});

gsap.utils.toArray(".tabs_pane").forEach((panel) => {
  gsap.from(panel, {
    scale: 1.06,
    opacity: 0.9,
    ease: "none",
    scrollTrigger: {
      trigger: panel,
      start: "top 70%",
      end: "bottom 40%",
      scrub: true,
    },
  });
});

/* const text = new SplitType(".scroll-heading", {
  types: "chars",
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(text.chars, {
  color: "var(--accent-clr)",
  ease: "none",
  stagger: {
    each: 0.04,
    from: "start",
  },
  scrollTrigger: {
    trigger: ".scroll-heading",
    start: "top 75%",
    end: "bottom 40%",
    scrub: true,
  },
}); */

window.addEventListener("load", () => {
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  tl.from(".personalized-img", {
    scale: 0.2,
    opacity: 0.1,
    y: 20,
    duration: 0.8,
  }).from(".contacts", {
    scale: 0.2,
    opacity: 0.1,
    y: 20,
    duration: 0.2,
  });
});

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ trialWarn: false });

    /* ==================================================
       LENIS SETUP (ONLY ONCE)
    ================================================== */

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        } else {
          return lenis.scroll.instance.scroll;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({
      scroller: document.body,
    });

    /* ==================================================
       THEME BLACKS (LAST SECTION PIN)
    ================================================== */

    const themeST = ScrollTrigger.create({
      trigger: ".theme-blacks",
      start: "top top",
      end: "+=1200",
      pin: true,
      scrub: 1,
    });

    /* ==================================================
       CARD SECTION (PINNED)
    ================================================== */

    const cardContainer = document.querySelector(".card-container");
    const stickyHeader = document.querySelector(".sticky-header h2");

    let cardTriggers = [];
    let isGapDone = false;
    let isFlipDone = false;

    function initCardAnimations() {
      cardTriggers.forEach((t) => t.kill());
      cardTriggers = [];

      const mm = gsap.matchMedia();

      mm.add("(max-width:999px)", () => {
        document
          .querySelectorAll(".card, .card-container, .sticky-header h2")
          .forEach((el) => (el.style = ""));
      });

      mm.add("(min-width:1000px)", () => {
        const st = ScrollTrigger.create({
          trigger: ".sticky",
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const p = self.progress;

            /* Header reveal */
            if (p >= 0.1 && p <= 0.25) {
              const hp = gsap.utils.mapRange(0.1, 0.25, 0, 1, p);
              gsap.set(stickyHeader, {
                y: gsap.utils.mapRange(0, 1, 40, 0, hp),
                opacity: hp,
              });
            } else if (p < 0.1) {
              gsap.set(stickyHeader, { y: 40, opacity: 0 });
            } else {
              gsap.set(stickyHeader, { y: 0, opacity: 1 });
            }

            /* Width shrink */
            if (p <= 0.25) {
              const w = gsap.utils.mapRange(0, 0.25, 75, 60, p);
              gsap.set(cardContainer, { width: `${w}%` });
            } else {
              gsap.set(cardContainer, { width: "60%" });
            }

            /* Gap animation */
            if (p >= 0.35 && !isGapDone) {
              gsap.to(cardContainer, { gap: "20px", duration: 0.5 });
              isGapDone = true;
            } else if (p < 0.35 && isGapDone) {
              gsap.to(cardContainer, { gap: "0px", duration: 0.5 });
              isGapDone = false;
            }

            /* Flip animation */
            if (p >= 0.7 && !isFlipDone) {
              gsap.to(".card", {
                rotationY: 180,
                duration: 0.75,
                stagger: 0.1,
              });
              isFlipDone = true;
            } else if (p < 0.7 && isFlipDone) {
              gsap.to(".card", {
                rotationY: 0,
                duration: 0.75,
                stagger: -0.1,
              });
              isFlipDone = false;
            }
          },
        });

        cardTriggers.push(st);
      });

      ScrollTrigger.refresh();
    }

    initCardAnimations();

    /* ==================================================
       RESIZE HANDLING
    ================================================== */

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCardAnimations();
      }, 250);
    });

    /* Final layout stabilization */
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
})();
