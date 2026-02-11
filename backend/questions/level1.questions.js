// Curated question pool for LEVEL 1 — Beginner (HTML + very light CSS)

export const level1Questions = [
  {
    id: "l1q1",
    title: "Portfolio Header",
    problem:
      "Create a hero header with a main heading, a navbar, and at least one image.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasHeading =
          !!document.querySelector("h1") ||
          !!document.querySelector("header") ||
          !!document.querySelector(".hero-title");

        const hasNav = !!document.querySelector("nav");
        const hasImage = !!document.querySelector("img");

        return hasHeading && hasNav && hasImage;
      });
    },
  },

  {
    id: "l1q2",
    title: "Simple Landing Section",
    problem:
      "Create a landing section with a heading and a call-to-action button.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasHeading =
          !!document.querySelector("h1") ||
          !!document.querySelector("header");

        const hasButton = !!document.querySelector("button");

        return hasHeading && hasButton;
      });
    },
  },

  {
    id: "l1q3",
    title: "About Me Card",
    problem:
      "Create a card with your photo, name, and one paragraph about yourself.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasImage = !!document.querySelector("img");
        const hasText = document.body.innerText.trim().length > 20;
        const hasCardLikeContainer =
          !!document.querySelector(".card") ||
          !!document.querySelector(".about-card") ||
          !!document.querySelector("section");

        return hasImage && hasText && hasCardLikeContainer;
      });
    },
  },

  {
    id: "l1q4",
    title: "Profile Page",
    problem:
      "Make a page with a title, profile image, and a short bio paragraph.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasTitle =
          !!document.querySelector("h1") ||
          !!document.querySelector("title");
        const hasImage = !!document.querySelector("img");
        const hasParagraph = !!document.querySelector("p");

        return hasTitle && hasImage && hasParagraph;
      });
    },
  },

  {
    id: "l1q5",
    title: "Navigation Bar",
    problem:
      "Create a horizontal navigation bar with Home, About, and Contact links.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const nav = document.querySelector("nav");
        const links = nav
          ? nav.querySelectorAll("a")
          : document.querySelectorAll("a");

        return links.length >= 3;
      });
    },
  },

  {
    id: "l1q6",
    title: "Simple Webpage Layout",
    problem: "Create a layout with header, main section, and footer.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasHeader =
          !!document.querySelector("header") ||
          !!document.querySelector(".header");
        const hasMain = !!document.querySelector("main");
        const hasFooter = !!document.querySelector("footer");

        return hasHeader && hasMain && hasFooter;
      });
    },
  },

  {
    id: "l1q7",
    title: "Contact Button Section",
    problem:
      "Create a section with a heading and a styled 'Contact Me' button.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasHeading =
          !!document.querySelector("h1") ||
          !!document.querySelector("h2");
        const hasButton = !!document.querySelector("button");

        return hasHeading && hasButton;
      });
    },
  },

  {
    id: "l1q8",
    title: "Image Gallery",
    problem: "Display at least 3 images in a row.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const images = document.querySelectorAll("img");
        return images.length >= 3;
      });
    },
  },

  {
    id: "l1q9",
    title: "Student Intro Section",
    problem:
      "Show your name, branch, year, and a photo in one section.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasImage = !!document.querySelector("img");
        const text = document.body.innerText.toLowerCase();
        const hasDetails =
          text.includes("year") || text.includes("branch");

        return hasImage && hasDetails;
      });
    },
  },

  {
    id: "l1q10",
    title: "Simple Hero Banner",
    problem:
      "Create a hero banner with a main heading and a background image.",

    tests: async (page) => {
      return await page.evaluate(() => {
        const hasHeading =
          !!document.querySelector("h1") ||
          !!document.querySelector("header");

        const hasImage =
          !!document.querySelector("img") ||
          document.body.style.backgroundImage !== "";

        return hasHeading && hasImage;
      });
    },
  },
];
