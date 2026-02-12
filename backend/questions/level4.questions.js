export const level4Questions = [
  {
    id: "l4q1",
    title: "The Living Navigation Crown",
    problem: `
Build a navigation bar where the ACTIVE link gets highlighted.

Your page must include:
• A navbar with at least 4 links:
  - Home
  - Services
  - Projects
  - Contact  

Behavior:
• When you click any link:
  - That link should become highlighted (different color)
  - Previously active link should return to normal

You may use small JavaScript.
`,
    hints: [
      "Give all links a common class like 'nav-link'.",
      "On click, remove 'active' from all links.",
      "Then add 'active' to the clicked link.",
      "Style .active in CSS with a different color."
    ]
  },

  {
    id: "l4q2",
    title: "The Expanding Knowledge Card",
    problem: `
Create a card that expands to show more text.

Requirements:
• A visible card with:
  - Title
  - Short preview text
  - Button: "Read More"

Behavior:
• Initially show only preview text  
• On clicking "Read More":
  - Reveal full content
  - Change button text to "Show Less"
• Clicking again hides content

Allowed:
• HTML + CSS + small JS
`,
    hints: [
      "Keep full text in a hidden div.",
      "Use display: none to hide initially.",
      "Toggle visibility using JavaScript.",
      "Also toggle button text."
    ]
  },

  {
    id: "l4q3",
    title: "The Image Carousel Gate",
    problem: `
Build a very simple image carousel.

Your page must have:
• At least 3 images  
• Two buttons:
  - "Next"
  - "Previous"

Behavior:
• Only ONE image visible at a time  
• Clicking Next shows next image  
• Clicking Previous shows previous image  
• Loop around at the ends

Allowed:
• HTML + CSS + JS
`,
    hints: [
      "Store images in an array.",
      "Keep a currentIndex variable.",
      "Change img.src when buttons clicked.",
      "Wrap index when reaching ends."
    ]
  },

  {
    id: "l4q4",
    title: "The Search Scroll",
    problem: `
Create a search filter for a list.

Your page must include:
• An input box labeled: "Search"
• A list of at least 5 items, e.g.:
  - Apple
  - Banana
  - Mango
  - Orange
  - Pineapple

Behavior:
• As user types, hide items that don't match  
• Show only matching items
`,
    hints: [
      "Listen to input event in JavaScript.",
      "Loop through list items.",
      "Compare text with input value.",
      "Use style.display = 'none' to hide."
    ]
  },

  {
    id: "l4q5",
    title: "The Countdown Relic",
    problem: `
Create a countdown timer.

Requirements:
• Start from 60 seconds  
• Display time in format: 00:60 → 00:00  
• When reaches zero, show:
  "Time's Up!"

Allowed:
• HTML + CSS + JS
`,
    hints: [
      "Use setInterval in JavaScript.",
      "Decrease seconds every 1000ms.",
      "Update a span with remaining time.",
      "Clear interval when time hits 0."
    ]
  },

  {
    id: "l4q6",
    title: "The Modal Shadow Portal",
    problem: `
Create a popup modal window.

Your page must include:
• Button: "Open Modal"

Behavior:
• Clicking button opens a popup with message:
  "Welcome to the modal!"
• Popup should have a close (×) button  
• Clicking outside should also close it
`,
    hints: [
      "Create a hidden modal div.",
      "Use position: fixed with overlay.",
      "Toggle visibility in JavaScript.",
      "Add click listener on overlay to close."
    ]
  },

  {
    id: "l4q7",
    title: "The Progress Bar Forge",
    problem: `
Create a progress bar that fills over time.

Requirements:
• Start at 0%  
• Automatically fill to 100% in 10 seconds  
• Show percentage text (e.g., 45%)

Allowed:
• HTML + CSS + JS
`,
    hints: [
      "Use a container div as track.",
      "Use inner div as fill bar.",
      "Increase width with setInterval.",
      "Update text simultaneously."
    ]
  },

  {
    id: "l4q8",
    title: "The Theme Toggle Shrine",
    problem: `
Create a light/dark mode toggle.

Your page must include:
• Button: "Toggle Theme"

Behavior:
• Default: light mode  
• Click → switch to dark mode  
• Click again → back to light mode  
• Change background + text colors
`,
    hints: [
      "Use a body class like 'dark'.",
      "Toggle classList in JS.",
      "Define CSS for both modes.",
      "Ensure readable contrast."
    ]
  },

  {
    id: "l4q9",
    title: "The Live Character Counter",
    problem: `
Create a textarea with live character count.

Requirements:
• A text box where user types  
• Display text like:
  "Characters: 0 / 200"
• Limit input to 200 characters

Allowed:
• HTML + CSS + JS
`,
    hints: [
      "Listen to input event.",
      "Use textarea.value.length.",
      "Update a span with count.",
      "Prevent typing beyond 200."
    ]
  },

  {
    id: "l4q10",
    title: "The Click Tracker Tablet",
    problem: `
Create a button click tracker.

Your page must include:
• Button: "Click Me"
• Text showing: "Clicks: 0"

Behavior:
• Every click increases counter by 1  
• Counter updates live
`,
    hints: [
      "Use a JS variable count = 0.",
      "Increment on button click.",
      "Update a span with new value.",
      "Keep logic simple."
    ]
  }
];
