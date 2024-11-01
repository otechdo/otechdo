# Web

The Web Module provides essential utilities for manipulating DOM elements, managing events, and adapting the interface to various environmental factors. It is designed for web applications that need powerful, flexible, and responsive UI handling.

## Installation

To add the Web Module to your project, clone the repository or download the files, then include the main script in your project.

### Basic Setup

```html
<script src="dist/web.js"></script>
```

Or, if you're using a module bundler (e.g., Webpack, Vite):

```javascript
import { Core, Adaptive, Events } from "./src/web";
```

## Usage

### Core Class

The `Core` class provides essential DOM manipulation utilities, similar to jQuery but lighter and more focused.

#### Methods

- **addClass**: Add one or more classes to selected elements.
- **css**: Set inline styles on elements.
- **val**: Get or set the value of form elements.

#### Example

```javascript
// Selecting an element by ID and adding a class
const core = new Core("#elementId");
core.addClass("active", "highlight");

// Setting CSS styles
core.css({ color: "blue", fontSize: "16px" });

// Getting the value of an input element
const inputValue = new Core("#inputField").val();

// Setting a value for an input element
new Core("#inputField").val("New value");
```

### Adaptive Class

The `Adaptive` class provides utilities for adapting elements based on environmental factors like screen size, device orientation, and ambient light.

#### Methods

- **ambientLightAdaptation**: Adjusts styles based on ambient light levels (if supported).
- **resizeAdaptation**: Applies styles based on specific screen width breakpoints.
- **orientationAdaptation**: Changes styles depending on the device’s orientation.
- **colorSchemeAdaptation**: Adjusts styles based on the device’s color scheme (light or dark mode).

#### Example

```javascript
const adaptive = new Adaptive([document.getElementById("container")]);

// Adjust brightness and contrast based on ambient light
adaptive.ambientLightAdaptation({ lowLightMode: true, highContrastInDark: true });

// Apply styles based on window width breakpoints
adaptive.resizeAdaptation({
    768: { fontSize: "14px" },
    1024: { fontSize: "16px" }
});

// Adapt styles based on orientation
adaptive.orientationAdaptation({
    landscape: { fontSize: "18px" },
    portrait: { fontSize: "14px" }
});

// Adapt color scheme based on light/dark mode
adaptive.colorSchemeAdaptation(
    { backgroundColor: "#333", color: "#fff" }, // Dark mode styles
    { backgroundColor: "#fff", color: "#000" }  // Light mode styles
);
```

### Events Class

The `Events` class provides a streamlined way to handle events on DOM elements. It includes utilities for adding, removing, and delegating event listeners, as well as triggering events.

#### Methods

- **on**: Add an event listener to elements.
- **off**: Remove an event listener from elements.
- **once**: Add an event listener that triggers only once.
- **trigger**: Manually trigger an event on elements.
- **delegate**: Delegate an event to a specified child selector.

#### Example

```javascript
const elements = [document.getElementById("button")];
const events = new Events(elements);

// Add a click event listener
events.on("click", () => {
    console.log("Button clicked!");
});

// Trigger a custom event
events.trigger("customEvent", { detail: "Event triggered programmatically" });

// Add a one-time event listener
events.once("dblclick", () => {
    console.log("Button double-clicked!");
});

// Delegate a click event to dynamically handle child elements
events.delegate("click", ".child-element", (e) => {
    console.log("Child element clicked:", e.target);
});
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
