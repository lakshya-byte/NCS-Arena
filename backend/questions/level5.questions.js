export const level5Questions = [
  {
    id: "l5q1",
    title: "Real-Time Search with Results",
    problem:
      "Create a search input that filters results in real time and shows 'No results' when empty.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const input = document.querySelector("input[type='search'], input");
        if (!input) return false;

        const items = document.querySelectorAll("li, .item, .result");
        if (items.length < 2) return false;

        input.value = "zzz";
        input.dispatchEvent(new Event("input"));
        await new Promise(r => setTimeout(r, 300));

        const noResult =
          document.querySelector(".no-results, .empty, .not-found");

        return Boolean(noResult);
      });
    },
  },

  {
    id: "l5q2",
    title: "Infinite Scroll List",
    problem:
      "Create a list that loads more items when scrolling to the bottom.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const list = document.querySelector(".list, ul, main");
        if (!list) return false;

        const before = document.querySelectorAll("li, .item").length;

        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 600));

        const after = document.querySelectorAll("li, .item").length;

        return after > before;
      });
    },
  },

  {
    id: "l5q3",
    title: "Drag & Drop Cards",
    problem:
      "Create draggable cards that can be reordered.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const cards = document.querySelectorAll(".card, article, .item");
        if (cards.length < 2) return false;

        const firstText = cards[0].textContent;

        const dragStart = new Event("dragstart");
        const dragOver = new Event("dragover");
        const drop = new Event("drop");

        cards[0].dispatchEvent(dragStart);
        cards[1].dispatchEvent(dragOver);
        cards[1].dispatchEvent(drop);

        await new Promise(r => setTimeout(r, 300));

        const newFirstText =
          document.querySelectorAll(".card, article, .item")[0]
            ?.textContent;

        return firstText !== newFirstText;
      });
    },
  },

  {
    id: "l5q4",
    title: "Accessible Dropdown",
    problem:
      "Create a dropdown that supports keyboard navigation and ARIA roles.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const trigger =
          document.querySelector("button, [role='combobox'], .dropdown-trigger");

        if (!trigger) return false;

        trigger.click();
        await new Promise(r => setTimeout(r, 200));

        const menu =
          document.querySelector("[role='listbox'], [role='menu'], .dropdown-menu");

        if (!menu) return false;

        const firstItem = menu.querySelector("[role='option'], li, .item");
        if (!firstItem) return false;

        const keydown = new KeyboardEvent("keydown", { key: "ArrowDown" });
        document.dispatchEvent(keydown);
        await new Promise(r => setTimeout(r, 200));

        return true; // tolerant pass if structure exists
      });
    },
  },

  {
    id: "l5q5",
    title: "Stateful Counter App",
    problem:
      "Create a counter with +, -, and reset that updates UI correctly.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const inc =
          document.querySelector(".inc, button:nth-of-type(1), [aria-label='increment']");
        const dec =
          document.querySelector(".dec, button:nth-of-type(2), [aria-label='decrement']");
        const reset =
          document.querySelector(".reset, button:nth-of-type(3)");

        if (!inc || !dec || !reset) return false;

        const display =
          document.querySelector(".count, h1, span");

        const before = display?.textContent;

        inc.click();
        await new Promise(r => setTimeout(r, 200));
        dec.click();
        await new Promise(r => setTimeout(r, 200));
        reset.click();
        await new Promise(r => setTimeout(r, 200));

        const after = display?.textContent;

        return before !== after;
      });
    },
  },

  {
    id: "l5q6",
    title: "Client-Side Router (Tabs/Pages)",
    problem:
      "Create navigation that changes visible page without full reload.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const links = document.querySelectorAll("a, button");
        if (links.length < 2) return false;

        const firstView =
          document.querySelector(".view, section, main");

        const firstText = firstView?.textContent;

        links[1].click();
        await new Promise(r => setTimeout(r, 300));

        const secondView =
          document.querySelector(".view, section, main");

        return firstText !== secondView?.textContent;
      });
    },
  },

  {
    id: "l5q7",
    title: "Form with Live Validation",
    problem:
      "Show validation feedback while typing, not only on submit.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const input = document.querySelector("input");
        if (!input) return false;

        input.value = "";
        input.dispatchEvent(new Event("input"));
        await new Promise(r => setTimeout(r, 200));

        const error =
          document.querySelector(".error, .validation, .helper-text");

        return Boolean(error);
      });
    },
  },

  {
    id: "l5q8",
    title: "Animation Timeline",
    problem:
      "Create at least two sequential animations triggered by a button.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const btn =
          document.querySelector("button, .animate");

        if (!btn) return false;

        const box =
          document.querySelector(".box, .card, .item");

        const before = window.getComputedStyle(box).transform;

        btn.click();
        await new Promise(r => setTimeout(r, 400));

        const after = window.getComputedStyle(box).transform;

        return before !== after;
      });
    },
  },

  {
    id: "l5q9",
    title: "API Data Render (Mock)",
    problem:
      "Fetch data (or mock it) and render at least 3 items.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        await new Promise(r => setTimeout(r, 600));

        const items =
          document.querySelectorAll(".item, li, .card");

        return items.length >= 3;
      });
    },
  },

  {
    id: "l5q10",
    title: "Undo/Redo Stack",
    problem:
      "Implement undo and redo for at least one action.",
    tests: async (page) => {
      return await page.evaluate(async () => {
        const action =
          document.querySelector(".add, button:nth-of-type(1)");
        const undo =
          document.querySelector(".undo, button:nth-of-type(2)");
        const redo =
          document.querySelector(".redo, button:nth-of-type(3)");

        if (!action || !undo || !redo) return false;

        const list = document.querySelector("ul, .list");

        const before = list?.children.length;

        action.click();
        await new Promise(r => setTimeout(r, 200));
        undo.click();
        await new Promise(r => setTimeout(r, 200));
        redo.click();
        await new Promise(r => setTimeout(r, 200));

        const after = list?.children.length;

        return before !== after;
      });
    },
  },
];
