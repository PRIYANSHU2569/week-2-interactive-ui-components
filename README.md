# Week 2 Task — Interactive FAQ Accordion

## Overview
A responsive, accessible FAQ accordion created using semantic HTML, CSS, and vanilla JavaScript. It requires no build step or third-party library.

## Files
- `index.html` — semantic page and FAQ structure
- `styles.css` — visual styling, responsive layout, focus states, and reduced-motion support
- `script.js` — click handling, open/close behavior, status announcements, and basic error handling

## How to run
1. Download or clone this project.
2. Keep all three files in the same folder.
3. Open `index.html` in a modern browser. No server is required.
4. Select any question to expand its answer. Selecting another question closes the previous one. Select the open question again to close it.

## How to test
- Click each question and verify its answer opens and closes.
- Use `Tab` to focus a question and `Enter` or `Space` to activate it.
- Resize the browser to a narrow mobile width and check that the layout remains readable.
- Check that the status message announces how many questions are open.
- Inspect a button's `aria-expanded` and `aria-controls` values in browser developer tools.
- Temporarily change an `aria-controls` value to a non-existent panel ID and verify the component displays a helpful error message rather than crashing.
- Enable reduced motion in the operating system/browser and confirm transitions are minimized.
- Disable JavaScript to view the fallback notice.

## Accessibility and maintainability
Native buttons provide keyboard interaction by default. Each button has `aria-expanded` and `aria-controls`, and each answer panel is labelled by its associated button. A live region announces the current state. Visible focus styling supports keyboard users, and CSS media queries support small screens and reduced-motion preferences. JavaScript uses event delegation, reusable helper functions, and defensive checks.

## Browser compatibility note
The component targets modern browsers. A fallback click handler is included for environments without `Element.closest()`. If adapting this project for older browsers, test `NodeList.forEach`, `classList`, and other APIs used by the target browser and add polyfills or equivalent loops where necessary.

## Customization
Duplicate an `.faq-item` block in `index.html`. Every question button and answer panel must have unique IDs, and the button's `aria-controls` must match the panel ID. The panel's `aria-labelledby` must match the button ID. Update the text as needed; the delegated event handler automatically supports additional items.
