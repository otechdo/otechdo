/**
 * The `Core` class provides a fluent API for manipulating a single HTML element.
 * It allows adding styles, managing classes, manipulating DOM content, and attaching events.
 */
export class Core {
    private element: HTMLElement;

    /**
     * Initializes the `Core` class with a specified HTML element.
     * @param element - The HTML element to be manipulated.
     */
    constructor(element: HTMLElement) {
        this.element = element;
    }

    // ================================
    // CSS Class Manipulation
    // ================================

    /**
     * Adds one or more CSS classes to the element.
     * @param classNames - The names of the classes to add.
     * @returns The `Core` instance for chaining.
     */
    addClass(...classNames: string[]): this {
        this.element.classList.add(...classNames);
        return this;
    }

    /**
     * Removes one or more CSS classes from the element.
     * @param classNames - The names of the classes to remove.
     * @returns The `Core` instance for chaining.
     */
    removeClass(...classNames: string[]): this {
        this.element.classList.remove(...classNames);
        return this;
    }

    /**
     * Toggles (adds or removes) a CSS class on the element.
     * @param className - The name of the class to toggle.
     * @returns The `Core` instance for chaining.
     */
    toggleClass(className: string): this {
        this.element.classList.toggle(className);
        return this;
    }

    // ================================
    // CSS Styling
    // ================================

    /**
     * Applies CSS styles to the element.
     * @param styles - An object containing key-value pairs for styles to apply.
     * @returns The `Core` instance for chaining.
     */
    css(styles: { [key: string]: string | number }): this {
        Object.entries(styles).forEach(([key, value]) => {
            (this.element.style as any)[key] = typeof value === "number" ? `${value}px` : value;
        });
        return this;
    }

    // ================================
    // HTML Attributes
    // ================================

    /**
     * Sets or retrieves an attribute of the element.
     * @param attribute - The name of the attribute.
     * @param value - The value of the attribute (optional).
     * @returns The `Core` instance for chaining if setting, or the attribute value if getting.
     */
    attr(attribute: string, value?: string): this {
        this.element.setAttribute(attribute, value ?? "");
        return this;
    }

    /**
     * Removes a specified attribute from the element.
     * @param attribute - The name of the attribute to remove.
     * @returns The `Core` instance for chaining.
     */
    removeAttr(attribute: string): this {
        this.element.removeAttribute(attribute);
        return this;
    }

    // ================================
    // Event Handling
    // ================================

    /**
     * Adds an event listener to the element.
     * @param event - The event type (e.g., 'click', 'mouseover').
     * @param handler - The event handler function.
     * @returns The `Core` instance for chaining.
     */
    on(event: string, handler: EventListener): this {
        this.element.addEventListener(event, handler);
        return this;
    }

    /**
     * Removes an event listener from the element.
     * @param event - The event type.
     * @param handler - The event handler function.
     * @returns The `Core` instance for chaining.
     */
    off(event: string, handler: EventListener): this {
        this.element.removeEventListener(event, handler);
        return this;
    }

    // ================================
    // HTML Content Manipulation
    // ================================

    /**
     * Returns the underlying HTML element.
     * @returns The HTML element.
     */
    html(): HTMLElement {
        return this.element;
    }

    /**
     * Gets or sets the text content of the element.
     * @returns The text content if getting, or the `Core` instance if setting.
     */
    text(): string {
        return this.element.textContent || "";
    }

    /**
     * Appends a child element to the current element.
     * @param child - The HTML element to append.
     * @returns The `Core` instance for chaining.
     */
    append(child: HTMLElement): this {
        this.element.append(child);
        return this;
    }

    /**
     * Prepends one or more children (elements or text) to the current element.
     * @param children - The elements or text to prepend.
     * @returns The `Core` instance for chaining.
     */
    prepend(...children: (string | HTMLElement)[]): this {
        this.element.prepend(...children);
        return this;
    }

    // ================================
    // Visibility Management
    // ================================

    /**
     * Removes the element from the DOM.
     * @returns The `Core` instance for chaining.
     */
    remove(): this {
        this.element.remove();
        return this;
    }

    /**
     * Hides the element by setting `display: none`.
     * @returns The `Core` instance for chaining.
     */
    hide(): this {
        this.element.style.display = 'none';
        return this;
    }

    /**
     * Shows the element by setting `display` to a specified value.
     * @param displayType - The display type (default is "block").
     * @returns The `Core` instance for chaining.
     */
    show(displayType: string = "block"): this {
        this.element.style.display = displayType;
        return this;
    }

    // ================================
    // Positioning and Size
    // ================================

    /**
     * Sets the height of the element with a specified unit.
     * @param value - The height value.
     * @param unit - The unit of height (default is "px").
     * @returns The `Core` instance for chaining.
     */
    height(value: string, unit: string = "px"): this {
        this.element.style.height = value.concat(unit);
        return this;
    }

    /**
     * Sets the position and coordinates of the element.
     * @param pos - The CSS position type (e.g., "absolute").
     * @param y - The top position value.
     * @param x - The left position value.
     * @param unit - The unit for the coordinates (default is "px").
     * @returns The `Core` instance for chaining.
     */
    position(pos: string, y: string, x: string, unit: string = "px"): this {
        this.element.style.position = pos;
        this.element.style.top = y.concat(unit);
        this.element.style.left = x.concat(unit);
        return this;
    }

    // ================================
    // Scrolling and Animation
    // ================================

    /**
     * Sets the vertical scroll position of the element.
     * @param value - The scroll value.
     * @returns The `Core` instance for chaining.
     */
    scrollTop(value: number): this {
        this.element.scrollTop = value;
        return this;
    }

    /**
     * Sets the horizontal scroll position of the element.
     * @param value - The scroll value.
     * @returns The `Core` instance for chaining.
     */
    scrollLeft(value: number): this {
        this.element.scrollLeft = value;
        return this;
    }

    /**
     * Fades in the element with an animation duration.
     * @param duration - The animation duration (in ms).
     * @returns The `Core` instance for chaining.
     */
    fadeIn(duration: string = "400"): this {
        this.element.style.opacity = "0";
        this.element.style.animation = "fadeIn";
        this.element.style.display = "block";
        this.element.style.animationDuration = duration;
        return this;
    }

    /**
     * Fades out the element with an animation duration.
     * @param duration - The animation duration (in ms).
     * @returns The `Core` instance for chaining.
     */
    fadeOut(duration: string = "400"): this {
        this.element.style.opacity = "1";
        this.element.style.display = "none";
        this.element.style.animationDuration = duration;
        return this;
    }

    // ================================
    // DOM Navigation
    // ================================

    /**
     * Gets the parent of the current element.
     * @returns A new `Core` instance for the parent element.
     */
    parent(): Core {
        return new Core(this.element.parentElement ?? this.element);
    }

    /**
     * Gets the first child of the current element.
     * @returns A new `Core` instance for the child element.
     */
    child(): Core {
        return new Core(this.element.children.item(0) as HTMLElement ?? this.element);
    }

    /**
     * Finds a descendant element that matches a selector within the current element.
     * @param selector - The CSS selector to match.
     * @returns A new `Core` instance for the matched element.
     */
    find(selector: string): Core {
        return new Core(this.element.querySelector(selector) as HTMLElement ?? this.element);
    }

    // ================================
    // Utility Methods
    // ================================

    /**
     * Appends text to the current element.
     * @param text - The text to append.
     * @returns The `Core` instance for chaining.
     */
    appendText(text: string): this {
        this.element.appendChild(document.createTextNode(text));
        return this;
    }

    /**
     * Clones the current element.
     * @returns A new `Core` instance for the cloned element.
     */
    clone(): Core {
        return new Core(this.element.cloneNode(true) as HTMLElement);
    }

    /**
     * Triggers a custom event on the current element.
     * @param eventType - The event type to trigger.
     * @param data - Additional data for the event.
     * @returns The `Core` instance for chaining.
     */
    trigger(eventType: string, data: any): this {
        const event = new CustomEvent(eventType, { detail: data });
        this.element.dispatchEvent(event);
        return this;
    }

    /**
     * Gets or sets the value of a form element.
     * @returns The value of the form element.
     */
    val(): string {
        return this.element.ariaValueText ?? "";
    }

    replace(content: HTMLElement):this {
        this.append(content).append(this.element);
        return this;
    }
}
