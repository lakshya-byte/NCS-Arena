export const level3Questions = [
  {
    id: "l3q1",
    title: "The Vanishing Button Spell",
    problem: `
Create a button that DISAPPEARS when clicked.

Your page must include:
• A visible button with text: "Click Me"
• When clicked → the button should disappear

Rules:
• You may use very small JavaScript
• No libraries allowed

Example behavior:
- Page loads → button visible  
- Click button → it vanishes from the page  
`,
    hints: [
      "Use a <button> element.",
      "Add an onclick handler in JavaScript.",
      "In JS, use element.style.display = 'none'.",
      "You can give the button an id like 'btn'."
    ]
  },

  {
    id: "l3q2",
    title: "The Color-Changing Orb",
    problem: `
Create a box that changes color when clicked.

Requirements:
• A visible square box on the page  
• When clicked → its background color changes  

Allowed:
• HTML + CSS + tiny JS only  

Example:
- First color: blue  
- After click: green (or any different color)
`,
    hints: [
      "Create a div with fixed width/height.",
      "Give it an initial background color in CSS.",
      "Use onclick in JS to change style.backgroundColor.",
      "You can toggle between two colors."
    ]
  },

  {
    id: "l3q3",
    title: "The Hidden Message Vault",
    problem: `
Create a button that REVEALS a hidden message.

Your page must include:
• A button: "Show Message"  
• A hidden text below it, for example:
  "You unlocked the secret!"

Behavior:
• Message is hidden at first  
• Clicking button shows the message  
`,
    hints: [
      "Hide text using CSS: display: none.",
      "Give the message an id.",
      "On click, set display = 'block'.",
      "Use a simple JavaScript function."
    ]
  },

  {
    id: "l3q4",
    title: "The Expanding Card",
    problem: `
Create a card that expands when hovered.

Your card must have:
• Title  
• Short description  
• On hover → card becomes slightly larger  

Allowed:
• HTML + CSS only (JS optional here)

Styling expectations:
• Smooth transition  
• Visible scaling effect  
`,
    hints: [
      "Use a div as the card.",
      "Add CSS: transform: scale(1.05) on hover.",
      "Use transition: transform 0.3s.",
      "Add padding and shadow for effect."
    ]
  },

  {
    id: "l3q5",
    title: "The Toggle Night Mode",
    problem: `
Create a button that toggles Dark Mode.

Requirements:
• A button labeled: "Toggle Dark Mode"
• Clicking it should change background from light → dark  

Allowed:
• HTML + CSS + tiny JS  

Example:
- Default: white background  
- After click: dark background  
`,
    hints: [
      "Use a body class like 'dark-mode'.",
      "In JS, toggle classList on body.",
      "Define dark-mode styles in CSS.",
      "Button only triggers toggle."
    ]
  },

  {
    id: "l3q6",
    title: "The Animated Pulse Beacon",
    problem: `
Create a button that pulses continuously.

Requirements:
• One visible button  
• Button should gently pulse (grow/shrink) automatically  

Allowed:
• HTML + CSS only  

Hint:
Use CSS animation instead of JavaScript.
`,
    hints: [
      "Use @keyframes in CSS.",
      "Animate transform: scale(1) to scale(1.1).",
      "Apply animation to the button.",
      "Keep duration around 1–2 seconds."
    ]
  },

  {
    id: "l3q7",
    title: "The Live Counter Crystal",
    problem: `
Create a counter that increases on every click.

Your page must include:
• A number displayed (start from 0)
• A button: "Increase"

Behavior:
• Each click → number increases by 1  
`,
    hints: [
      "Use a span to show the number.",
      "Store count in a JS variable.",
      "On click, increment and update textContent.",
      "Keep everything simple."
    ]
  },

  {
    id: "l3q8",
    title: "The Image Swap Portal",
    problem: `
Create a button that changes an image.

Requirements:
• Show one image initially  
• Button labeled: "Change Image"  
• On click → image should change to another one  

Allowed:
• HTML + CSS + tiny JS  
`,
    hints: [
      "Give image an id.",
      "Store two image URLs.",
      "In JS, change img.src on click.",
      "You can toggle between two images."
    ]
  },

  {
    id: "l3q9",
    title: "The Accordion Scroll",
    problem: `
Create a simple accordion section.

Your page must have:
• A heading: "Click to Expand"
• Hidden content below it  
• Clicking heading should reveal content  

Allowed:
• HTML + CSS + tiny JS  
`,
    hints: [
      "Hide content using display: none.",
      "Use JS to toggle display.",
      "Wrap content in a div.",
      "Make heading clickable."
    ]
  },

  {
    id: "l3q10",
    title: "The Dynamic Greeting Scroll",
    problem: `
Create a greeting that changes based on time of day.

Rules:
• Display a message like:
  - "Good Morning"
  - "Good Afternoon"
  - "Good Evening"

You may use JavaScript to check time.
`,
    hints: [
      "Use new Date().getHours() in JS.",
      "Use if-else conditions.",
      "Update innerText of a heading.",
      "Default to 'Hello' if unsure."
    ]
  }
];
