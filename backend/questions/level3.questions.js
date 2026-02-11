export const level3Questions = [
  {
    id: "l3q1",
    title: "Modern Hero with Background",
    problem:
      "Create a full-width hero section with background (image/gradient), headline, and CTA.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const hero =
          document.querySelector(".hero, header, section") ||
          document.body;

        const h1 = document.querySelector("h1");
        const cta =
          document.querySelector("button") ||
          document.querySelector("a");

        const styles = window.getComputedStyle(hero);
        const hasBg =
          styles.backgroundImage !== "none" ||
          styles.backgroundColor !== "rgba(0, 0, 0, 0)";

        return Boolean(hero && h1 && cta && hasBg);
      });
    },
  },

  {
    id: "l3q2",
    title: "Responsive Card Grid",
    problem:
      "Create a responsive grid that changes columns on different screen sizes.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const cards = document.querySelectorAll(
          ".card, article, .card-item"
        );

        const container =
          document.querySelector(".grid, .cards, main") ||
          cards[0]?.parentElement;

        if (!container || cards.length < 3) return false;

        const styles = window.getComputedStyle(container);
        const isLayout =
          styles.display === "grid" || styles.display === "flex";

        // Check responsiveness hint via media query or wrap behavior
        const hasWrap =
          styles.flexWrap === "wrap" || styles.gridTemplateColumns;

        return isLayout && hasWrap;
      });
    },
  },

  {
    id: "l3q3",
    title: "Interactive Modal",
    problem:
      "Create a button that opens a modal overlay with content.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const openBtn =
          document.querySelector("button") ||
          document.querySelector(".open-modal");

        if (!openBtn) return false;

        openBtn.click();
        await new Promise(r => setTimeout(r, 300));

        const modal =
          document.querySelector(".modal, .overlay, [role='dialog']");

        const isVisible =
          modal &&
          window.getComputedStyle(modal).display !== "none" &&
          window.getComputedStyle(modal).opacity !== "0";

        return Boolean(isVisible);
      });
    },
  },

  {
    id: "l3q4",
    title: "Navigation with Active State",
    problem:
      "Create a navbar where the active link is visually highlighted.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const nav =
          document.querySelector("nav") ||
          document.querySelector("header");

        if (!nav) return false;

        const active =
          nav.querySelector(".active, [aria-current='page']");

        return Boolean(active);
      });
    },
  },

  {
    id: "l3q5",
    title: "Form with Validation",
    problem:
      "Create a form that shows an error message when input is empty.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const form = document.querySelector("form");
        const btn =
          document.querySelector("button") ||
          document.querySelector("input[type='submit']");

        if (!form || !btn) return false;

        btn.click();
        await new Promise(r => setTimeout(r, 300));

        const error =
          document.querySelector(".error, .error-msg, .validation");

        return Boolean(error);
      });
    },
  },

  {
    id: "l3q6",
    title: "Carousel / Slider",
    problem:
      "Create a basic image slider with next/prev controls.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const next =
          document.querySelector(".next, [aria-label='next'], button:last-of-type");
        const prev =
          document.querySelector(".prev, [aria-label='previous'], button:first-of-type");

        if (!next || !prev) return false;

        const slides = document.querySelectorAll("img, .slide");
        if (slides.length < 2) return false;

        const firstSrc = slides[0].getAttribute("src");

        next.click();
        await new Promise(r => setTimeout(r, 300));

        const newSrc = slides[0].getAttribute("src");

        return firstSrc !== newSrc;
      });
    },
  },

  {
    id: "l3q7",
    title: "Sticky Sidebar",
    problem:
      "Create a sidebar that stays visible while scrolling.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const sidebar =
          document.querySelector(".sidebar, aside");

        if (!sidebar) return false;

        const styles = window.getComputedStyle(sidebar);
        return styles.position === "sticky" || styles.position === "fixed";
      });
    },
  },

  {
    id: "l3q8",
    title: "Interactive Tabs",
    problem:
      "Create tabbed navigation that switches visible content.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const tabs =
          document.querySelectorAll(".tab, button, li");

        if (tabs.length < 2) return false;

        const firstContent =
          document.querySelector(".panel, .content");

        const firstText = firstContent?.textContent;

        tabs[1].click();
        await new Promise(r => setTimeout(r, 300));

        const secondContent =
          document.querySelector(".panel, .content");

        return firstText !== secondContent?.textContent;
      });
    },
  },

  {
    id: "l3q9",
    title: "Dark Mode Toggle",
    problem:
      "Create a button that toggles dark mode.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const btn =
          document.querySelector(".theme-toggle, button");

        if (!btn) return false;

        const before = document.documentElement.className;

        btn.click();
        await new Promise(r => setTimeout(r, 200));

        const after = document.documentElement.className;

        return before !== after || document.body.classList.length > 0;
      });
    },
  },

  {
    id: "l3q10",
    title: "Dynamic List",
    problem:
      "Create a list where items can be added dynamically.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const input = document.querySelector("input");
        const addBtn = document.querySelector("button");

        if (!input || !addBtn) return false;

        input.value = "test item";
        addBtn.click();
        await new Promise(r => setTimeout(r, 200));

        const items =
          document.querySelectorAll("li, .item");

        return items.length >= 1;
      });
    },
  },
];
