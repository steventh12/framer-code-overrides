# Framer Code Overrides

A collection of custom code overrides for use in [Framer](https://framer.com) projects. These TypeScript snippets enhance interactivity and responsiveness without requiring a full React setup.

## 🧩 Included Overrides

### `useFixedTimeZone.ts`
Displays the current time in a fixed time zone (`America/Los_Angeles`) with a GMT offset.

- Updates every second
- Prevents hydration mismatch on initial render
- Intended for text layers
- Example output: `14:38:12 GMT-07:00`

---

### `useTypingEffectAbout.ts`
Simulates a character-by-character typing animation with a blinking cursor and responsive font sizing.

- Blinks the cursor before and after typing
- Types a full sentence progressively
- Adjusts font size and line height based on screen size
- Ideal for use in "About Me" or intro sections

---

## 🛠️ Usage

1. Open the **Code** panel in your Framer project.
2. Copy the desired override into a new `.ts` file.
3. Apply the override to any component using the Override panel.
4. Adjust styling or timing logic as needed.

---

## 📄 License

MIT License