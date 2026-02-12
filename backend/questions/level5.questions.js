export const level5Questions = [
  {
    id: "l5q1",
    title: "The Memory Keeper To-Do List",
    problem: `
Build a working To-Do App.

Your app must have:
• An input box to type a task  
• An "Add Task" button  
• A visible list of tasks  
• Each task must have a "Delete" button  

Bonus (optional, not mandatory):
• Persist tasks in localStorage  

Expected behavior:
• User types a task → clicks Add → it appears in list  
• Clicking Delete removes that task  
`,
    hints: [
      "Use an array to store tasks in JavaScript.",
      "Render the list dynamically using innerHTML or DOM methods.",
      "Attach a delete handler to each task.",
      "If using localStorage, save the array after every change.",
      "On page load, read tasks from localStorage."
    ]
  },

  {
    id: "l5q2",
    title: "The Mystic Form Validator",
    problem: `
Create a registration form with real validation.

Form fields required:
• Name  
• Email  
• Password  

Validation rules:
• Name must be at least 3 characters  
• Email must look valid (contain @)  
• Password must be at least 6 characters  

Behavior:
• Show error message below each invalid field  
• Show "Registration Successful" when all fields are valid  
`,
    hints: [
      "Use event.preventDefault() on submit.",
      "Check each field separately in JavaScript.",
      "Display error messages in small <span> elements.",
      "Clear errors when input becomes valid.",
      "Only show success message when all checks pass."
    ]
  },

  {
    id: "l5q3",
    title: "The Live Search Codex",
    problem: `
Build a searchable product list.

You must have:
• A search input at the top  
• At least 6 product names displayed  

Behavior:
• As user types, filter the list in real time  
• Only matching products should remain visible  

Example products:
• Laptop  
• Phone  
• Tablet  
• Headphones  
• Keyboard  
• Mouse  
`,
    hints: [
      "Store product names in an array.",
      "Listen to input event on search box.",
      "Filter array based on input value.",
      "Re-render the visible list dynamically.",
      "Make search case-insensitive."
    ]
  },

  {
    id: "l5q4",
    title: "The Dynamic Cart Engine",
    problem: `
Build a mini shopping cart.

Your page must include:
• At least 3 products with prices  
• "Add to Cart" button for each product  
• Cart section showing:
  - Items added  
  - Total price  

Behavior:
• Clicking Add adds item to cart  
• Total updates automatically  
• Same product can be added multiple times  
`,
    hints: [
      "Use an array to store cart items.",
      "On click, push item into cart array.",
      "Recalculate total using reduce().",
      "Render cart items dynamically.",
      "Keep UI updated after every action."
    ]
  },

  {
    id: "l5q5",
    title: "The Login Gate of Shadows",
    problem: `
Create a fake login system.

Requirements:
• Email field  
• Password field  
• Login button  

Behavior:
• If email = test@example.com AND password = 123456  
  → Show "Access Granted"  
• Else → Show "Invalid Credentials"  

No backend required — pure frontend logic.
`,
    hints: [
      "Store valid credentials as constants.",
      "Compare input values in JS.",
      "Use conditional statements.",
      "Display result in a message div.",
      "Prevent default form submission."
    ]
  },

  {
    id: "l5q6",
    title: "The Image Slider Dimension",
    problem: `
Build an automatic image slider.

Requirements:
• At least 3 images  
• Images should change every 3 seconds  
• Also include Next / Previous buttons  

Behavior:
• Auto-rotate images  
• Buttons must override auto slide  
`,
    hints: [
      "Use setInterval for auto slide.",
      "Store images in an array.",
      "Keep track of current index.",
      "Clear interval when user clicks buttons.",
      "Loop images at start/end."
    ]
  },

  {
    id: "l5q7",
    title: "The Real-Time Clock Relic",
    problem: `
Display a live digital clock.

Format required:
HH:MM:SS (24-hour format)

Behavior:
• Clock must update every second  
• Should start automatically on page load  
`,
    hints: [
      "Use new Date() in JavaScript.",
      "Use setInterval every 1000ms.",
      "Extract hours, minutes, seconds.",
      "Pad single digits with leading zero.",
      "Update a heading element."
    ]
  },

  {
    id: "l5q8",
    title: "The Quiz Engine of Truth",
    problem: `
Build a simple quiz with 3 questions.

Each question should have:
• 4 multiple-choice options  
• One correct answer  

Behavior:
• User selects answers  
• On submit, show final score (e.g., 2/3)  
`,
    hints: [
      "Store correct answers in an array.",
      "Capture user selections via radio buttons.",
      "Compare answers on submit.",
      "Calculate total correct.",
      "Display result in a message box."
    ]
  },

  {
    id: "l5q9",
    title: "The Theme Guardian",
    problem: `
Create a persistent dark/light mode toggle.

Requirements:
• A button to toggle theme  
• Default should be light mode  
• Choice must persist after page refresh  

Behavior:
• Clicking toggle switches theme  
• Refreshing page keeps last choice  
`,
    hints: [
      "Use localStorage to save theme.",
      "Toggle a class on body.",
      "Read theme from localStorage on load.",
      "Apply styles based on class.",
      "Ensure contrast for readability."
    ]
  },

  {
    id: "l5q10",
    title: "The Mini Dashboard Nexus",
    problem: `
Build a small dashboard with:

• Sidebar with 3 buttons:
  - Home  
  - Profile  
  - Settings  

• Main panel that changes content based on click  

Behavior:
• Clicking Home shows Home content  
• Clicking Profile shows Profile content  
• Clicking Settings shows Settings content  
`,
    hints: [
      "Create three content sections.",
      "Hide all sections by default except Home.",
      "Use click handlers on sidebar buttons.",
      "Show only the selected section.",
      "Use CSS transitions for smooth feel."
    ]
  }
];
