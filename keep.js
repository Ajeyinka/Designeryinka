/* (function () {
  "use strict";

  const toggleButton = document.querySelector("#toggle_button");
  const navMenu = document.querySelector(".nav_menu");
  const menuBars = document.querySelectorAll(".bar");
  const navBrand = document.querySelector(".nav_brand");
  const navFlex = document.querySelector(".two-col-flex");

  // Mobile menu toggle
  if (toggleButton) {
    toggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleButton.classList.toggle("active");
      navBrand.classList.toggle("active");
      navFlex.classList.toggle("active");
      navMenu.classList.toggle("active");
      navMenu.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });
      menuBars.forEach((bar) => bar.classList.toggle("active"));
    });
  }
})(); 

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav_link");

  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, "") || "/";

    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

/* document.addEventListener("DOMContentLoaded", () => {
  const enhanceText = (elements) => {
    elements.forEach((el) => {
      const text = el.textContent.trim();
      if (!text) return;

      el.textContent = "";

      // outgoing layer
      const outSpan = document.createElement("span");
      outSpan.className = "text-out";
      outSpan.textContent = text;

      // incoming layer
      const inSpan = document.createElement("span");
      inSpan.className = "text-in";

      [...text].forEach((char, i, arr) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = char === " " ? "\u00A0" : char;

        // stagger data
        charSpan.style.setProperty("--i", i);
        charSpan.style.setProperty("--total", arr.length);
        charSpan.style.transitionDelay = `${i * 0.03}s`;

        inSpan.appendChild(charSpan);
      });

      el.append(outSpan, inSpan);
    });
  };

  // nav links
  enhanceText(document.querySelectorAll(".nav_link"));

  // button text
  enhanceText(document.querySelectorAll(".button .text-primary"));

  enhanceText(document.querySelectorAll(".footer_link"));
}); */

/* const form = document.querySelector(".form-block form");
const submitBtn = document.querySelector(".button-submit");
const successMessage = document.querySelector(".form-success");

form.addEventListener("submit", function () {
  submitBtn.classList.add("is-loading");
  form.closest(".form-block").classList.add("is-loading");
});

// Call this after successful submission
function onFormSuccess() {
  submitBtn.classList.remove("is-loading");
  form.closest(".form-block").classList.remove("is-loading");
  form.style.display = "none";
  successMessage.classList.add("is-visible");
} */

/* document.querySelectorAll(".nav_link").forEach((link) => {
  const text = link.textContent.trim();
  if (!text) return;
  console.log("nav stagger script loaded");
  link.textContent = "";

  // outgoing layer
  const outSpan = document.createElement("span");
  outSpan.className = "text-out";
  outSpan.textContent = text;

  // incoming staggered layer
  const inSpan = document.createElement("span");
  inSpan.className = "text-in";

  [...text].forEach((char, i) => {
    const charSpan = document.createElement("span");
    charSpan.className = "char";
    charSpan.textContent = char === " " ? "\u00A0" : char;
    charSpan.style.transitionDelay = `${i * 0.035}s`;
    inSpan.appendChild(charSpan);
  });

  link.append(outSpan, inSpan);
});

document.querySelectorAll(".button .text-primary").forEach((textEl) => {
  const text = textEl.textContent.trim();
  if (!text) return;

  textEl.textContent = "";

  // outgoing layer
  const outSpan = document.createElement("span");
  outSpan.className = "text-out";
  outSpan.textContent = text;

  // incoming staggered layer
  const inSpan = document.createElement("span");
  inSpan.className = "text-in";

  [...text].forEach((char, i) => {
    const charSpan = document.createElement("span");
    charSpan.className = "char";
    charSpan.textContent = char === " " ? "\u00A0" : char;
    charSpan.style.transitionDelay = `${i * 0.03}s`;
    inSpan.appendChild(charSpan);
  });

  textEl.append(outSpan, inSpan);
}); */

/* const heroBox = document.querySelector(".hero-box");
const heroImage = document.querySelector(".hero-image");

if (heroBox && heroImage) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroBox.classList.add("is-active");
        } else {
          heroBox.classList.remove("is-active");
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(heroImage);
}

const accordionHeaders = document.querySelectorAll(".accordion-header");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector(".accordion-content");

    accordionContents.forEach((content) => {
      if (content !== accordionContent) {
        content.classList.remove("active");
        content.style.maxHeight = "0";
      }
    });

    accordionContent.classList.toggle("active");

    if (accordionContent.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = "0";
    }
  });
});
 */

/* (function () {
  "use strict";

  const tabs = document.querySelectorAll(".tabs_link");
  const panes = document.querySelectorAll(".tabs_pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", selectTab);
  });

  function selectTab(event) {
    event.preventDefault();

    const targetId = this.getAttribute("href");
    const targetPane = document.querySelector(targetId);

    // Reset all tabs
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });

    // Reset all panes
    panes.forEach((pane) => {
      pane.classList.remove("is-active");
    });

    // Activate selected tab and pane
    this.classList.add("is-active");
    targetPane.classList.add("is-active");
  }
})();
 */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".tabs_component .tabs_menu a");
  const sections = document.querySelectorAll(".tabs_pane");

  /* ---------- smooth scroll ---------- */
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      const offset = 200;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });

  /* ---------- intersection observer ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        links.forEach((link) => {
          link.classList.toggle(
            "selected",
            link.getAttribute("href") === `#${id}`
          );
        });
      });
    },
    {
      root: null,
      rootMargin: "-150px 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
