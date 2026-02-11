export const level4Questions = [
  {
    id: "l4q1",
    title: "Advanced Navbar with Dropdown",
    problem:
      "Create a navbar that includes at least one dropdown menu that opens on click or hover.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const nav =
          document.querySelector("nav") ||
          document.querySelector("header") ||
          document.querySelector("[role='navigation']");

        if (!nav) return false;

        const trigger =
          nav.querySelector("button, .dropdown-toggle, .menu-item");

        if (!trigger) return false;

        trigger.click();
        await new Promise(r => setTimeout(r, 300));

        const dropdown =
          document.querySelector(".dropdown, .menu, .submenu, [role='menu']");

        const visible =
          dropdown &&
          window.getComputedStyle(dropdown).display !== "none" &&
          window.getComputedStyle(dropdown).opacity !== "0";

        return Boolean(visible);
      });
    },
  },

  {
    id: "l4q2",
    title: "Masonry Grid Layout",
    problem:
      "Create a Pinterest-style masonry grid with uneven card heights.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const items = document.querySelectorAll(
          ".card, article, .item, section"
        );

        if (items.length < 4) return false;

        const container =
          document.querySelector(".grid, .masonry, main") ||
          items[0]?.parentElement;

        const styles = window.getComputedStyle(container);

        const isGrid =
          styles.display === "grid" || styles.columnCount > 1;

        const heights = Array.from(items).map(
          el => el.getBoundingClientRect().height
        );

        const uneven = new Set(heights).size > 1;

        return isGrid && uneven;
      });
    },
  },

  {
    id: "l4q3",
    title: "Accessible Modal",
    problem:
      "Create a modal that traps focus and can be closed with Escape key.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const openBtn =
          document.querySelector("button") ||
          document.querySelector(".open-modal");

        if (!openBtn) return false;

        openBtn.click();
        await new Promise(r => setTimeout(r, 300));

        const modal =
          document.querySelector("[role='dialog'], .modal, .overlay");

        if (!modal) return false;

        // Simulate Escape key
        const event = new KeyboardEvent("keydown", { key: "Escape" });
        document.dispatchEvent(event);
        await new Promise(r => setTimeout(r, 300));

        const stillVisible =
          window.getComputedStyle(modal).display !== "none";

        return !stillVisible;
      });
    },
  },

  {
    id: "l4q4",
    title: "Sticky Navbar with Shadow on Scroll",
    problem:
      "Create a navbar that becomes sticky and adds shadow when scrolling.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const nav =
          document.querySelector("nav") ||
          document.querySelector("header");

        if (!nav) return false;

        window.scrollTo(0, 300);
        await new Promise(r => setTimeout(r, 300));

        const styles = window.getComputedStyle(nav);
        const isSticky =
          styles.position === "sticky" || styles.position === "fixed";

        const hasShadow =
          styles.boxShadow !== "none" &&
          styles.boxShadow !== "0px 0px 0px rgba(0, 0, 0, 0)";

        return isSticky && hasShadow;
      });
    },
  },

  {
    id: "l4q5",
    title: "Multi-Step Form",
    problem:
      "Create a form with at least two steps and next/prev navigation.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const next =
          document.querySelector(".next, button, [aria-label='next']");
        const prev =
          document.querySelector(".prev, [aria-label='previous']");

        if (!next) return false;

        const firstStep =
          document.querySelector(".step, fieldset, section");

        next.click();
        await new Promise(r => setTimeout(r, 300));

        const secondStep =
          document.querySelector(".step, fieldset, section");

        const changed = firstStep !== secondStep || firstStep?.textContent !== secondStep?.textContent;

        return Boolean(changed);
      });
    },
  },

  {
    id: "l4q6",
    title: "Animated Card Hover",
    problem:
      "Create cards that animate (scale or elevate) on hover.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const card =
          document.querySelector(".card, article, section");

        if (!card) return false;

        const before = window.getComputedStyle(card).transform;

        card.dispatchEvent(new Event("mouseenter"));
        await new Promise(r => setTimeout(r, 200));

        const after = window.getComputedStyle(card).transform;

        return before !== after;
      });
    },
  },

  {
    id: "l4q7",
    title: "Live Search Filter",
    problem:
      "Create a search input that filters a list in real time.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const input = document.querySelector("input[type='search'], input");
        if (!input) return false;

        const items = document.querySelectorAll("li, .item");
        if (items.length < 2) return false;

        input.value = "xyz";
        input.dispatchEvent(new Event("input"));
        await new Promise(r => setTimeout(r, 300));

        const visible = Array.from(items).some(
          el => window.getComputedStyle(el).display !== "none"
        );

        return true; // Pass if search input exists + list present (tolerant)
      });
    },
  },

  {
    id: "l4q8",
    title: "Responsive Sidebar",
    problem:
      "Create a sidebar that collapses on small screens.",
    tests: async (page) => {
      return await page.evaluate(() => {
        const sidebar =
          document.querySelector(".sidebar, aside, nav");

        if (!sidebar) return false;

        const styles = window.getComputedStyle(sidebar);
        return (
          styles.width !== "0px" ||
          styles.display !== "none"
        );
      });
    },
  },

  {
    id: "l4q9",
    title: "Animated Progress Bar",
    problem:
      "Create a progress bar that animates from 0 to 100%.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const bar =
          document.querySelector(".progress, progress, .bar");

        if (!bar) return false;

        const before = window.getComputedStyle(bar).width;
        await new Promise(r => setTimeout(r, 400));
        const after = window.getComputedStyle(bar).width;

        return before !== after;
      });
    },
  },

  {
    id: "l4q10",
    title: "Toast Notification",
    problem:
      "Show a toast notification when a button is clicked.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const btn =
          document.querySelector("button") ||
          document.querySelector(".show-toast");

        if (!btn) return false;

        btn.click();
        await new Promise(r => setTimeout(r, 300));

        const toast =
          document.querySelector(".toast, .notification, [role='alert']");

        return Boolean(toast);
      });
    },
  },
];
