export const level2Questions = [
  {
    id: "l2q1",
    title: "Responsive Navbar",
    problem:
      "Create a responsive navbar with a logo, at least three links, and a mobile toggle.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const nav =
          document.querySelector("nav") ||
          document.querySelector("header") ||
          document.querySelector("[role='navigation']");

        const links = document.querySelectorAll("a");
        const toggle =
          document.querySelector("button") ||
          document.querySelector("[aria-label*='menu']") ||
          document.querySelector(".menu, .hamburger");

        return Boolean(nav && links.length >= 3 && toggle);
      });
    },
  },

  {
    id: "l2q2",
    title: "Centered Hero Section",
    problem:
      "Build a hero section with heading, subtitle, and CTA centered.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const container =
          document.querySelector(".hero, section, main, header") ||
          document.body;

        const h1 =
          document.querySelector("h1") ||
          document.querySelector("[role='heading']");

        const subtitle =
          document.querySelector("p") ||
          document.querySelector(".subtitle, .tagline");

        const cta =
          document.querySelector("button") ||
          document.querySelector("a.cta");

        const styles = window.getComputedStyle(container);
        const isCentered =
          styles.display === "flex" &&
          (styles.justifyContent === "center" ||
            styles.alignItems === "center");

        return Boolean(h1 && subtitle && cta && isCentered);
      });
    },
  },

  {
    id: "l2q3",
    title: "Card Grid Layout",
    problem:
      "Create a responsive grid with at least 3 cards.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const cards = document.querySelectorAll(
          ".card, article, .card-item, section"
        );

        const grid =
          document.querySelector(".grid, .cards, main") ||
          cards[0]?.parentElement;

        const styles = window.getComputedStyle(grid || document.body);

        const isGrid =
          styles.display === "grid" ||
          styles.display === "flex";

        return cards.length >= 3 && isGrid;
      });
    },
  },

  {
    id: "l2q4",
    title: "Interactive Button",
    problem: "Create a button that visually changes when clicked.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const btn = document.querySelector("button");
        if (!btn) return false;

        const before = window.getComputedStyle(btn).backgroundColor;

        btn.click();
        await new Promise(r => setTimeout(r, 200));

        const after = window.getComputedStyle(btn).backgroundColor;

        return before !== after || btn.classList.length > 0;
      });
    },
  },

  {
    id: "l2q5",
    title: "Simple Form",
    problem: "Create a form with name input and submit button.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const form = document.querySelector("form") || document.body;
        const input =
          document.querySelector("input[type='text'], input") ||
          document.querySelector("textarea");
        const button =
          document.querySelector("button") ||
          document.querySelector("input[type='submit']");

        return Boolean(form && input && button);
      });
    },
  },

  {
    id: "l2q6",
    title: "Image Card",
    problem: "Create a card with image, title, and description.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const card =
          document.querySelector(".card, article, section") ||
          document.body;

        const img = card.querySelector("img");
        const title =
          card.querySelector("h2, h3, .title");
        const text =
          card.querySelector("p, .description");

        return Boolean(img && title && text);
      });
    },
  },

  {
    id: "l2q7",
    title: "Sticky Header",
    problem: "Create a sticky header that stays on top.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const header =
          document.querySelector("header, nav, .header");

        if (!header) return false;

        const styles = window.getComputedStyle(header);
        return styles.position === "sticky" || styles.position === "fixed";
      });
    },
  },

  {
    id: "l2q8",
    title: "Footer Layout",
    problem: "Create a footer with three columns of links.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const footer = document.querySelector("footer");
        if (!footer) return false;

        const columns =
          footer.querySelectorAll(
            ".col, .column, section, nav, ul"
          );

        const styles = window.getComputedStyle(footer);

        const isLayout =
          styles.display === "grid" ||
          styles.display === "flex";

        return columns.length >= 3 && isLayout;
      });
    },
  },

  {
    id: "l2q9",
    title: "Toggle Theme",
    problem: "Create a dark/light toggle.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const btn =
          document.querySelector("button") ||
          document.querySelector(".theme-toggle");

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
    id: "l2q10",
    title: "Simple To-Do",
    problem: "Create a to-do list with input and add button.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const input = document.querySelector("input");
        const addBtn = document.querySelector("button");

        if (!input || !addBtn) return false;

        input.value = "test task";
        addBtn.click();

        const item =
          document.querySelector("li") ||
          document.querySelector(".todo-item");

        return Boolean(item);
      });
    },
  },
];
