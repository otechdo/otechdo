/**
 * The `Otechdo` class provides a fluent API for manipulating a single HTML element.
 * It allows adding styles, managing classes, manipulating DOM content, and attaching events.
 */
export class Otechdo {
    private element: HTMLElement;

    /**
     * Initializes the `Otechdo` class with a specified HTML element.
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
     * @returns The `Otechdo` instance for chaining.
     */
    addClass(...classNames: string[]): this {
        this.element.classList.add(...classNames);
        return this;
    }

    /**
     * Removes one or more CSS classes from the element.
     * @param classNames - The names of the classes to remove.
     * @returns The `Otechdo` instance for chaining.
     */
    removeClass(...classNames: string[]): this {
        this.element.classList.remove(...classNames);
        return this;
    }

    /**
     * Toggles (adds or removes) a CSS class on the element.
     * @param className - The name of the class to toggle.
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining if setting, or the attribute value if getting.
     */
    attr(attribute: string, value?: string): this {
        this.element.setAttribute(attribute, value ?? "");
        return this;
    }

    /**
     * Removes a specified attribute from the element.
     * @param attribute - The name of the attribute to remove.
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
     */
    on(event: string, handler: EventListener): this {
        this.element.addEventListener(event, handler);
        return this;
    }

    /**
     * Removes an event listener from the element.
     * @param event - The event type.
     * @param handler - The event handler function.
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The text content if getting, or the `Otechdo` instance if setting.
     */
    text(): string {
        return this.element.textContent || "";
    }
    /**
     * Toggles the visibility of the element.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleVisibility(): this {
        this.element.style.display = this.element.style.display === 'none' ? 'block' : 'none';
        return this;
    }

    /**
     * Retrieves the computed style of a specified CSS property.
     * @param property - The CSS property name.
     * @returns The computed style value.
     */
    getStyle(property: string): string {
        return window.getComputedStyle(this.element).getPropertyValue(property);
    }

    /**
     * Replaces the current element with a new element.
     * @param newElement - The HTML element to replace with.
     * @returns The `Otechdo` instance for chaining.
     */
    replaceWith(newElement: HTMLElement): this {
        this.element.replaceWith(newElement);
        return this;
    }

    /**
     * Temporarily removes the element from the DOM.
     * @returns The removed element.
     */
    detach(): HTMLElement {
        return this.element.parentNode?.removeChild(this.element) ?? this.element;
    }
    /**
     * Smoothly scrolls the element into view.
     * @returns The `Otechdo` instance for chaining.
     */
    scroll(): this {
        this.element.scrollIntoView({ behavior: "smooth" });
        return this;
    }
    /**
     * Checks if the element is visible in the viewport.
     * @returns `true` if the element is in the viewport, otherwise `false`.
     */
    isInViewport(): boolean {
        const rect = this.element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Reattaches a detached element to a new parent.
     * @param parent - The new parent element.
     * @returns The `Otechdo` instance for chaining.
     */
    reattach(parent: HTMLElement): this {
        parent.appendChild(this.element);
        return this;
    }
    /**
     * Adds an event listener that triggers only once.
     * @param event - The event type (e.g., 'click', 'mouseover').
     * @param handler - The event handler function.
     * @returns The `Otechdo` instance for chaining.
     */
    once(event: string, handler: EventListener): this {
        const onceHandler = (e: Event) => {
            handler(e);
            this.element.removeEventListener(event, onceHandler);
        };
        this.element.addEventListener(event, onceHandler);
        return this;
    }

    /**
     * Adds a throttled event listener.
     * @param event - The event type (e.g., 'scroll', 'resize').
     * @param handler - The event handler function.
     * @param limit - The time limit in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    throttle(event: string, handler: EventListener, limit: number): this {
        let lastCall = 0;
        const throttledHandler = (e: Event) => {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                handler(e);
            }
        };
        this.element.addEventListener(event, throttledHandler);
        return this;
    }


    /**
     * Adds a debounced event listener.
     * @param event - The event type (e.g., 'input', 'resize').
     * @param handler - The event handler function.
     * @param delay - The debounce delay in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    debounce(event: string, handler: EventListener, delay: number): this {
        let timeoutId: number | undefined;
        const debouncedHandler = (e: Event) => {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => handler(e), delay);
        };
        this.element.addEventListener(event, debouncedHandler);
        return this;
    }
    /**
     * Toggles a boolean attribute on the element.
     * @param attribute - The attribute to toggle.
     * @param force - Whether to add or remove the attribute.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleAttr(attribute: string, force?: boolean): this {
        if (typeof force === "boolean") {
            force ? this.element.setAttribute(attribute, "") : this.element.removeAttribute(attribute);
        } else {
            this.element.hasAttribute(attribute)
                ? this.element.removeAttribute(attribute)
                : this.element.setAttribute(attribute, "");
        }
        return this;
    }
    /**
     * Disables the element by adding a `disabled` attribute.
     * @returns The `Otechdo` instance for chaining.
     */
    disable(): this {
        this.element.setAttribute("disabled", "true");
        return this;
    }

    /**
     * Enables the element by removing the `disabled` attribute.
     * @returns The `Otechdo` instance for chaining.
     */
    enable(): this {
        this.element.removeAttribute("disabled");
        return this;
    }

    /**
     * Adds a CSS class to the element after a delay.
     * @param className - The class name to add.
     * @param delay - The delay in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    addClassDelayed(className: string, delay: number): this {
        setTimeout(() => this.addClass(className), delay);
        return this;
    }
    /**
     * Animates a CSS property to a specified value.
     * @param property - The CSS property to animate.
     * @param value - The end value for the property.
     * @param duration - The duration of the animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    animate(property: string, value: string | number, duration: number): this {
        this.element.style.transition = `${property} ${duration}ms`;
        this.element.style[property as any] = typeof value === "number" ? `${value}px` : value;
        setTimeout(() => (this.element.style.transition = ""), duration);
        return this;
    }

    /**
     * Toggles the element into or out of fullscreen.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleFullscreen(): this {
        if (!document.fullscreenElement) {
            this.element.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
        return this;
    }

    /**
     * Sets ARIA attributes for the element.
     * @param label - The accessible label.
     * @param role - The ARIA role (optional).
     * @returns The `Otechdo` instance for chaining.
     */
    aria(label: string, role?: string): this {
        this.element.setAttribute("aria-label", label);
        if (role) this.element.setAttribute("role", role);
        return this;
    }


    /**
     * Toggles fade in/out on the element.
     * @param duration - The animation duration in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    fadeToggle(duration: string = "400"): this {
        if (this.element.style.display === "none" || this.element.style.opacity === "0") {
            return this.fadeIn(duration);
        } else {
            return this.fadeOut(duration);
        }
    }
    /**
     * Wraps the current element with a new element.
     * @param wrapper - The HTML element to wrap around the current element.
     * @returns The `Otechdo` instance for chaining.
     */
    wrap(wrapper: HTMLElement): this {
        this.element.parentNode?.insertBefore(wrapper, this.element);
        wrapper.appendChild(this.element);
        return this;
    }
    /**
     * Unwraps the current element from its parent.
     * @returns The `Otechdo` instance for chaining.
     */
    unwrap(): this {
        const parent = this.element.parentNode as HTMLElement;
        if (parent && parent.parentNode) {
            parent.parentNode.insertBefore(this.element, parent);
            parent.remove();
        }
        return this;
    }

    /**
     * Adds a class temporarily to create a flash effect.
     * @param className - The class to add.
     * @param duration - Duration to keep the class in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    tempo(className: string, duration: number = 500): this {
        this.addClass(className);
        setTimeout(() => this.removeClass(className), duration);
        return this;
    }

    /**
     * Sets multiple attributes on the element.
     * @param attributes - An object containing attribute names and values.
     * @returns The `Otechdo` instance for chaining.
     */
    setAttributes(attributes: { [key: string]: string }): this {
        Object.entries(attributes).forEach(([key, value]) => {
            this.element.setAttribute(key, value);
        });
        return this;
    }
    /**
     * Toggles the text content of the element between two values.
     * @param text1 - The first text value.
     * @param text2 - The second text value.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleText(text1: string, text2: string): this {
        this.element.textContent = this.element.textContent === text1 ? text2 : text1;
        return this;
    }

    /**
     * Checks if the element has a specific class.
     * @param className - The class name to check.
     * @returns `true` if the element has the class, otherwise `false`.
     */
    hasClass(className: string): boolean {
        return this.element.classList.contains(className);
    }
    /**
     * Enables the element to be draggable.
     * @returns The `Otechdo` instance for chaining.
     */
    draggable(): this {
        this.element.setAttribute("draggable", "true");
        return this;
    }

    /**
     * Disables dragging for the element.
     * @returns The `Otechdo` instance for chaining.
     */
    undraggable(): this {
        this.element.removeAttribute("draggable");
        return this;
    }

    /**
     * Inserts HTML at a specific position within the element.
     * @param html - The HTML content to insert.
     * @param position - The position (e.g., "beforebegin", "afterbegin", "beforeend", "afterend").
     * @returns The `Otechdo` instance for chaining.
     */
    set(html: string, position: InsertPosition): this {
        this.element.insertAdjacentHTML(position, html);
        return this;
    }

    /**
     * Toggles the disabled state of a button element.
     * @param isDisabled - Whether to disable or enable the button.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleButton(isDisabled: boolean): this {
        if (this.element.tagName.toLowerCase() === 'button') {
            (this.element as HTMLButtonElement).disabled = isDisabled;
        }
        return this;
    }
    /**
     * Copies the text content of the element to the clipboard.
     * @returns The `Otechdo` instance for chaining.
     */
    copyTextToClipboard(): this {
        navigator.clipboard.writeText(this.element.textContent || "");
        return this;
    }

    /**
     * Adds multiple event listeners to the element.
     * @param events - An array of objects with event type and handler.
     * @returns The `Otechdo` instance for chaining.
     */
    onMultiple(events: { event: string; handler: EventListener }[]): this {
        events.forEach(({ event, handler }) => this.on(event, handler));
        return this;
    }
    /**
     * Adds a tooltip to the element.
     * @param message - The tooltip text to display.
     * @returns The `Otechdo` instance for chaining.
     */
    tooltip(message: string): this {
        this.element.setAttribute("title", message);
        return this;
    }

    /**
     * Checks if the element is currently focused.
     * @returns `true` if the element is focused, otherwise `false`.
     */
    isFocused(): boolean {
        return document.activeElement === this.element;
    }

    /**
     * Gets the next sibling of the current element.
     * @returns A new `Otechdo` instance for the next sibling.
     */
    next(): Otechdo {
        return new Otechdo(this.element.nextElementSibling as HTMLElement ?? this.element);
    }

    /**
     * Gets the previous sibling of the current element.
     * @returns A new `Otechdo` instance for the previous sibling.
     */
    prev(): Otechdo {
        return new Otechdo(this.element.previousElementSibling as HTMLElement ?? this.element);
    }

    /**
     * Scrolls the element's content to the bottom.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollToBottom(): this {
        this.element.scrollTop = this.element.scrollHeight;
        return this;
    }

    /**
     * Sets focus on the element.
     * @returns The `Otechdo` instance for chaining.
     */
    focus(): this {
        this.element.focus();
        return this;
    }

    /**
     * Removes focus from the element.
     * @returns The `Otechdo` instance for chaining.
     */
    blur(): this {
        this.element.blur();
        return this;
    }

    /**
     * Checks if the element is visible (not `display: none`).
     * @returns `true` if the element is visible, otherwise `false`.
     */
    isVisible(): boolean {
        return this.element.style.display !== "none";
    }

    /**
     * Smoothly scrolls the page to the element.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollTo(): this {
        this.element.scrollIntoView({ behavior: "smooth", block: "center" });
        return this;
    }

    /**
     * Shows a temporary tooltip on the element.
     * @param message - The tooltip message to display.
     * @param duration - The duration in milliseconds to show the tooltip.
     * @returns The `Otechdo` instance for chaining.
     */
    tempTooltip(message: string, duration: number = 2000): this {
        const tooltip = document.createElement("div");
        tooltip.textContent = message;
        tooltip.style.position = "absolute";
        tooltip.style.background = "black";
        tooltip.style.color = "white";
        tooltip.style.padding = "4px";
        tooltip.style.borderRadius = "4px";
        document.body.appendChild(tooltip);

        const rect = this.element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;

        setTimeout(() => tooltip.remove(), duration);
        return this;
    }

    /**
     * Waits for the end of a CSS transition and then executes a callback.
     * @param callback - The function to execute after the transition ends.
     * @returns The `Otechdo` instance for chaining.
     */
    onTransitionEnd(callback: () => void): this {
        const handler = () => {
            this.element.removeEventListener("transitionend", handler);
            callback();
        };
        this.element.addEventListener("transitionend", handler);
        return this;
    }

    /**
     * Toggles an attribute based on a condition.
     * @param attribute - The name of the attribute.
     * @param state - Boolean indicating whether to add or remove the attribute.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleAttribute(attribute: string, state: boolean): this {
        if (state) {
            this.element.setAttribute(attribute, "");
        } else {
            this.element.removeAttribute(attribute);
        }
        return this;
    }

    /**
     * Temporarily highlights the element with a background color.
     * @param color - The highlight color.
     * @param duration - The duration of the highlight in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    highlight(color: string = "yellow", duration: number = 500): this {
        const originalColor = this.element.style.backgroundColor;
        this.element.style.backgroundColor = color;
        setTimeout(() => {
            this.element.style.backgroundColor = originalColor;
        }, duration);
        return this;
    }

    /**
     * Applies multiple CSS styles to the element.
     * @param styles - An object containing CSS property-value pairs.
     * @returns The `Otechdo` instance for chaining.
     */
    style(styles: { [property: string]: string | number }): this {
        Object.entries(styles).forEach(([property, value]) => {
            (this.element.style as any)[property] = typeof value === "number" ? `${value}px` : value;
        });
        return this;
    }
    /**
     * Disables user interaction by adding an overlay.
     * @returns The `Otechdo` instance for chaining.
     */
    disableInteraction(): this {
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(255, 255, 255, 0)";
        overlay.style.pointerEvents = "all";
        this.element.style.position = "relative";
        this.element.appendChild(overlay);
        return this;
    }

    /**
     * Enables user interaction by removing the overlay.
     * @returns The `Otechdo` instance for chaining.
     */
    enableInteraction(): this {
        const overlay = this.element.querySelector("div[style*='position: absolute']");
        overlay?.remove();
        return this;
    }

    /**
     * Adds a shake animation to the element.
     * @returns The `Otechdo` instance for chaining.
     */
    shake(): this {
        this.element.style.animation = "shake 0.5s";
        this.element.addEventListener("animationend", () => {
            this.element.style.animation = "";
        });
        return this;
    }
    /**
     * Adds a pulsing animation to the element.
     * @param duration - The duration of each pulse in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    pulse(duration: number = 500): this {
        this.element.style.animation = `pulse ${duration}ms infinite alternate`;
        this.element.style.animationTimingFunction = "ease-in-out";
        this.element.addEventListener("animationend", () => {
            this.element.style.animation = ""; // Reset animation after pulse
        });
        return this;
    }
    /**
     * Centers the element horizontally and vertically within its parent.
     * @returns The `Otechdo` instance for chaining.
     */
    center(): this {
        this.element.style.position = "absolute";
        this.element.style.top = "50%";
        this.element.style.left = "50%";
        this.element.style.transform = "translate(-50%, -50%)";
        return this;
    }

    /**
     * Cycles the text content of the element through an array of values.
     * @param values - The array of text values to cycle through.
     * @param interval - The interval duration in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    cycleText(values: string[], interval: number = 1000): this {
        let index = 0;
        setInterval(() => {
            this.element.textContent = values[index];
            index = (index + 1) % values.length;
        }, interval);
        return this;
    }

    /**
     * Adds a resize observer to the element to track size changes.
     * @param callback - A function to call when the element is resized.
     * @returns The `Otechdo` instance for chaining.
     */
    onResize(callback: ResizeObserverCallback): this {
        const resizeObserver = new ResizeObserver(callback);
        resizeObserver.observe(this.element);
        return this;
    }
    /**
     * Toggles multiple CSS classes on the element.
     * @param classes - Array of class names to toggle.
     * @param force - Optional boolean to force add/remove.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleClasses(classes: string[], force?: boolean): this {
        classes.forEach(className => {
            this.element.classList.toggle(className, force);
        });
        return this;
    }
    /**
     * Dispatches a custom event with attached detail data.
     * @param eventType - The custom event type.
     * @param detail - The additional data to attach to the event.
     * @returns The `Otechdo` instance for chaining.
     */
    triggerEvent(eventType: string, detail: any): this {
        const event = new CustomEvent(eventType, { detail });
        this.element.dispatchEvent(event);
        return this;
    }
    /**
     * Reveals the element with a fade-in and scale-up animation.
     * @param duration - Animation duration in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    reveal(duration: number = 500): this {
        this.element.style.opacity = "0";
        this.element.style.transform = "scale(0.9)";
        this.element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        setTimeout(() => {
            this.element.style.opacity = "1";
            this.element.style.transform = "scale(1)";
        }, 0);
        return this;
    }

    /**
     * Executes a callback when the element enters or exits the viewport.
     * @param callback - The function to execute with the visibility state (`true` for visible).
     * @returns The `Otechdo` instance for chaining.
     */
    onVisibilityChange(callback: (isVisible: boolean) => void): this {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => callback(entry.isIntersecting));
        });
        observer.observe(this.element);
        return this;
    }
    /**
     * Loads HTML content from a URL and inserts it into the element.
     * @param url - The URL to load the content from.
     * @returns The `Otechdo` instance for chaining.
     */
    load(url: string): this {
        fetch(url)
            .then(response => response.text())
            .then(html => this.element.innerHTML = html);
        return this;
    }
    /**
     * Calculates the position of the element relative to a specified ancestor.
     * @param ancestor - The ancestor element to calculate the position relative to.
     * @returns An object containing `top` and `left` position.
     */
    relativePosition(ancestor: HTMLElement): { top: number; left: number } {
        const elemRect = this.element.getBoundingClientRect();
        const ancestorRect = ancestor.getBoundingClientRect();
        return {
            top: elemRect.top - ancestorRect.top,
            left: elemRect.left - ancestorRect.left
        };
    }
    /**
     * Disables text selection on the element.
     * @returns The `Otechdo` instance for chaining.
     */
    disableTextSelection(): this {
        this.element.style.userSelect = "none";
        return this;
    }

    /**
     * Enables text selection on the element.
     * @returns The `Otechdo` instance for chaining.
     */
    enableTextSelection(): this {
        this.element.style.userSelect = "auto";
        return this;
    }

    /**
     * Checks if the element is empty (has no child nodes).
     * @returns `true` if the element is empty, otherwise `false`.
     */
    isEmpty(): boolean {
        return this.element.childNodes.length === 0;
    }

    /**
     * Mirrors the content of the element horizontally.
     * @returns The `Otechdo` instance for chaining.
     */
    mirrorContent(): this {
        this.element.style.transform = "scaleX(-1)";
        return this;
    }
    /**
     * Lazily loads a background image when the element enters the viewport.
     * @param url - The URL of the background image.
     * @returns The `Otechdo` instance for chaining.
     */
    lazyLoadBackgroundImage(url: string): this {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.element.style.backgroundImage = `url(${url})`;
                    observer.unobserve(this.element);
                }
            });
        });
        observer.observe(this.element);
        return this;
    }

    /**
     * Throttles an action on the element to limit how often it can be triggered.
     * @param action - The action to throttle.
     * @param delay - The minimum time between triggers in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    throttleAction(action: () => void, delay: number): this {
        let lastCall = 0;
        const throttledAction = () => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                action();
            }
        };
        this.on("scroll", throttledAction);  // Example: throttle on scroll
        return this;
    }

    /**
     * Scrolls the element's content to a specified child element.
     * @param child - The child element to scroll to.
     * @returns The `Otechdo` instance for chaining.
     */
    to(child: HTMLElement): this {
        const parentRect = this.element.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
        this.element.scrollTop = childRect.top - parentRect.top + this.element.scrollTop;
        return this;
    }

    /**
     * Counts the number of characters in the element's text content.
     * @returns The character count.
     */
    charCount(): number {
        return this.element.textContent?.length || 0;
    }

    /**
     * Shows or hides the element with a sliding animation.
     * @param show - Whether to show (`true`) or hide (`false`) the element.
     * @param duration - Duration of the slide animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    slideToggle(show: boolean, duration: number = 400): this {
        if (show) {
            this.element.style.height = "0";
            this.element.style.display = "block";
            setTimeout(() => (this.element.style.transition = `height ${duration}ms ease`), 0);
            this.element.style.height = `${this.element.scrollHeight}px`;
        } else {
            this.element.style.transition = `height ${duration}ms ease`;
            this.element.style.height = "0";
            setTimeout(() => (this.element.style.display = "none"), duration);
        }
        return this;
    }
    /**
     * Adds focus styling when the element is focused by keyboard, but not by mouse.
     * @returns The `Otechdo` instance for chaining.
     */
    keyboardFocusOnly(): this {
        this.on("focus", () => this.addClass("focus-visible"))
            .on("blur", () => this.removeClass("focus-visible"))
            .on("mousedown", () => this.removeClass("focus-visible"));
        return this;
    }
    /**
     * Filters input to allow only specific characters.
     * @param pattern - A regex pattern of allowed characters.
     * @returns The `Otechdo` instance for chaining.
     */
    bindInputFilter(pattern: RegExp): this {
        this.on("input", (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (!pattern.test(input.value)) {
                input.value = input.value.replace(pattern, "");
            }
        });
        return this;
    }
    /**
     * Adds a zoom animation to the element.
     * @param inOrOut - Specify "in" for zoom-in or "out" for zoom-out.
     * @param duration - Duration of the animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    zoom(inOrOut: "in" | "out", duration: number = 400): this {
        this.element.style.transition = `transform ${duration}ms ease`;
        this.element.style.transform = inOrOut === "in" ? "scale(1.2)" : "scale(1)";
        setTimeout(() => (this.element.style.transform = ""), duration);
        return this;
    }

    /**
     * Highlights the element when hovered and removes highlight on mouse leave.
     * @param color - The highlight color (default: "yellow").
     * @returns The `Otechdo` instance for chaining.
     */
    highlightOnHover(color: string = "yellow"): this {
        const originalColor = this.element.style.backgroundColor;
        this.on("mouseenter", () => (this.element.style.backgroundColor = color))
            .on("mouseleave", () => (this.element.style.backgroundColor = originalColor));
        return this;
    }

    /**
     * Shakes the element to visually indicate an error.
     * @returns The `Otechdo` instance for chaining.
     */
    shakeOnError(): this {
        this.element.style.animation = "shake 0.3s";
        this.element.addEventListener("animationend", () => {
            this.element.style.animation = "";
        });
        return this;
    }
    /**
     * Cycles through an array of background colors on the element.
     * @param colors - An array of colors to cycle through.
     * @param interval - The interval in milliseconds for each color.
     * @returns The `Otechdo` instance for chaining.
     */
    cycleBackgroundColors(colors: string[], interval: number = 1000): this {
        let index = 0;
        setInterval(() => {
            this.element.style.backgroundColor = colors[index];
            index = (index + 1) % colors.length;
        }, interval);
        return this;
    }

    /**
     * Cycles through an array of background colors on the element.
     * @param images - An array of images to cycle through.
     * @param interval - The interval in milliseconds for each color.
     * @returns The `Otechdo` instance for chaining.
     */
    cycleBackground(images: string[], interval: number = 1000): this {
        let index = 0;
        setInterval(() => {
            this.element.style.backgroundImage = images[index];
            index = (index + 1) % images.length;
        }, interval);
        return this;
    }

    /**
     * Toggles the `readonly` attribute for input fields.
     * @param isReadOnly - Whether to set or remove the readonly state.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleReadOnly(isReadOnly: boolean): this {
        (this.element as HTMLInputElement).readOnly = isReadOnly;
        return this;
    }

    /**
     * Swaps the position of the current element with another element.
     * @param target - The element to swap with.
     * @returns The `Otechdo` instance for chaining.
     */
    swapWith(target: HTMLElement): this {
        const parentA = this.element.parentNode;
        const siblingA = this.element.nextSibling === target ? this.element : this.element.nextSibling;
        target.parentNode?.insertBefore(this.element, target);
        parentA?.insertBefore(target, siblingA);
        return this;
    }

    /**
     * Moves the element with arrow keys (up, down, left, right).
     * @param step - The number of pixels to move per key press.
     * @returns The `Otechdo` instance for chaining.
     */
    moveWithArrowKeys(step: number = 10): this {
        window.addEventListener("keydown", (event) => {
            const currentTop = parseInt(this.element.style.top || "0", 10);
            const currentLeft = parseInt(this.element.style.left || "0", 10);
            switch (event.key) {
                case "ArrowUp":
                    this.element.style.top = `${currentTop - step}px`;
                    break;
                case "ArrowDown":
                    this.element.style.top = `${currentTop + step}px`;
                    break;
                case "ArrowLeft":
                    this.element.style.left = `${currentLeft - step}px`;
                    break;
                case "ArrowRight":
                    this.element.style.left = `${currentLeft + step}px`;
                    break;
            }
        });
        return this;
    }

    /**
     * Adds a scroll progress indicator to the element.
     * @param progressBar - The HTML element to act as the progress bar.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollProgress(progressBar: HTMLElement): this {
        this.on("scroll", () => {
            const scrollTop = this.element.scrollTop;
            const scrollHeight = this.element.scrollHeight - this.element.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
        return this;
    }
    /**
     * Limits text content to a specified length and adds an ellipsis if exceeded.
     * @param maxLength - Maximum number of characters to display.
     * @returns The `Otechdo` instance for chaining.
     */
    limitText(maxLength: number): this {
        if (this.element.textContent && this.element.textContent.length > maxLength) {
            this.element.textContent = `${this.element.textContent.slice(0, maxLength)}...`;
        }
        return this;
    }
    /**
     * Displays a temporary flash message inside the element.
     * @param message - The message to display.
     * @param duration - Duration in milliseconds before the message fades out.
     * @returns The `Otechdo` instance for chaining.
     */
    flash(message: string, duration: number = 3000): this {
        const flash = document.createElement("div");
        flash.textContent = message;
        flash.style.position = "absolute";
        flash.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        flash.style.color = "white";
        flash.style.padding = "10px";
        flash.style.borderRadius = "5px";
        flash.style.opacity = "1";
        this.element.appendChild(flash);

        setTimeout(() => {
            flash.style.transition = "opacity 1s";
            flash.style.opacity = "0";
            flash.addEventListener("transitionend", () => flash.remove());
        }, duration);

        return this;
    }

    /**
     * Adjusts the font size based on the screen width.
     * @param minSize - Minimum font size in pixels.
     * @param maxSize - Maximum font size in pixels.
     * @returns The `Otechdo` instance for chaining.
     */
    adjust(minSize: number = 12, maxSize: number = 24): this {
        const resizeFont = () => {
            const screenWidth = window.innerWidth;
            const fontSize = Math.max(minSize, Math.min(maxSize, screenWidth / 50));
            this.element.style.fontSize = `${fontSize}px`;
        };
        window.addEventListener("resize", resizeFont);
        resizeFont();
        return this;
    }
    /**
     * Saves the element's current inner HTML or text content to a variable.
     * @returns The saved state.
     */
    saveState(): string {
        return this.element.innerHTML || this.element.textContent || "";
    }

    /**
     * Restores the saved state to the element's content.
     * @param state - The state to restore (previously saved inner HTML or text).
     * @returns The `Otechdo` instance for chaining.
     */
    restoreState(state: string): this {
        this.element.innerHTML = state;
        return this;
    }

    /**
     * Scrolls the element's content to the top on button click.
     * @param button - The button element to trigger the scroll.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollToTopOnClick(button: HTMLElement): this {
        button.addEventListener("click", () => {
            this.element.scrollTop = 0;
        });
        return this;
    }

    /**
     * Toggles inline content editing by setting the `contenteditable` attribute.
     * @param isEditable - Whether to enable or disable editing.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleContentEditable(isEditable: boolean): this {
        this.element.contentEditable = isEditable ? "true" : "false";
        return this;
    }
    /**
     * Adds a loading spinner overlay to the element.
     * @returns The `Otechdo` instance for chaining.
     */
    showLoadingSpinner(): this {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner"); // Requires CSS for styling
        spinner.style.position = "absolute";
        spinner.style.width = "100%";
        spinner.style.height = "100%";
        spinner.style.display = "flex";
        spinner.style.alignItems = "center";
        spinner.style.justifyContent = "center";
        this.element.appendChild(spinner);
        return this;
    }

    /**
     * Removes the loading spinner overlay from the element.
     * @returns The `Otechdo` instance for chaining.
     */
    hideLoadingSpinner(): this {
        const spinner = this.element.querySelector(".spinner");
        spinner?.remove();
        return this;
    }

    /**
     * Animates the background color of the element.
     * @param color - The target color.
     * @param duration - The duration in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    animateBackgroundColor(color: string, duration: number = 1000): this {
        this.element.style.transition = `background-color ${duration}ms ease`;
        this.element.style.backgroundColor = color;
        return this;
    }
    /**
     * Toggles the checked state of a checkbox or radio input.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleCheck(): this {
        if (this.element instanceof HTMLInputElement && (this.element.type === "checkbox" || this.element.type === "radio")) {
            this.element.checked = !this.element.checked;
        }
        return this;
    }

    /**
     * Monitors height changes and triggers a callback when the element's height changes.
     * @param callback - The function to call when the height changes.
     * @returns The `Otechdo` instance for chaining.
     */
    onHeightChange(callback: () => void): this {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.contentRect.height !== entry.target.clientHeight) {
                    callback();
                }
            }
        });
        observer.observe(this.element);
        return this;
    }
    /**
     * Displays a tooltip on hover with a specified message.
     * @param message - The tooltip message.
     * @returns The `Otechdo` instance for chaining.
     */
    displayTooltip(message: string): this {
        this.on("mouseenter", () => {
            const tooltip = document.createElement("div");
            tooltip.textContent = message;
            tooltip.style.position = "absolute";
            tooltip.style.padding = "5px";
            tooltip.style.backgroundColor = "black";
            tooltip.style.color = "white";
            tooltip.style.borderRadius = "3px";
            tooltip.style.top = `${this.element.getBoundingClientRect().top - 30}px`;
            tooltip.style.left = `${this.element.getBoundingClientRect().left}px`;
            document.body.appendChild(tooltip);

            this.on("mouseleave", () => tooltip.remove());
        });
        return this;
    }

    /**
     * Adds a pulse animation effect when the element is clicked.
     * @returns The `Otechdo` instance for chaining.
     */
    pulseOnClick(): this {
        this.on("click", () => {
            this.element.style.animation = "pulse 0.4s";
            this.element.addEventListener("animationend", () => {
                this.element.style.animation = "";
            });
        });
        return this;
    }

    /**
     * Toggles visibility of the element with a fade effect.
     * @param duration - Duration of the fade animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleFade(duration: number = 400): this {
        const isHidden = window.getComputedStyle(this.element).display === "none";
        this.element.style.transition = `opacity ${duration}ms`;
        this.element.style.opacity = isHidden ? "0" : "1";
        this.element.style.display = isHidden ? "block" : "none";

        setTimeout(() => {
            this.element.style.opacity = isHidden ? "1" : "0";
            if (!isHidden) this.element.style.display = "none";
        }, duration);
        return this;
    }
    /**
     * Adds a double-click event listener to the element.
     * @param handler - The event handler function.
     * @returns The `Otechdo` instance for chaining.
     */
    onDoubleClick(handler: EventListener): this {
        this.element.addEventListener("dblclick", handler);
        return this;
    }
    /**
     * Adds a glowing effect to the element.
     * @param color - The glow color.
     * @param intensity - The glow intensity.
     * @returns The `Otechdo` instance for chaining.
     */
    glow(color: string = "blue", intensity: number = 10): this {
        this.element.style.boxShadow = `0 0 ${intensity}px ${color}`;
        return this;
    }

    /**
     * Removes the glow effect from the element.
     * @returns The `Otechdo` instance for chaining.
     */
    removeGlow(): this {
        this.element.style.boxShadow = "none";
        return this;
    }

    /**
     * Gets the element's position relative to the viewport.
     * @returns An object with `top` and `left` properties.
     */
    getPositionRelativeToWindow(): { top: number; left: number } {
        const rect = this.element.getBoundingClientRect();
        return { top: rect.top, left: rect.left };
    }

    /**
     * Cycles through a list of classes, applying each one sequentially.
     * @param classes - Array of class names to cycle through.
     * @param interval - Time in milliseconds for each class change.
     * @returns The `Otechdo` instance for chaining.
     */
    cycleClasses(classes: string[], interval: number = 1000): this {
        let index = 0;
        setInterval(() => {
            this.element.classList.remove(...classes);
            this.element.classList.add(classes[index]);
            index = (index + 1) % classes.length;
        }, interval);
        return this;
    }
    /**
     * Makes the element sticky within the viewport on scroll.
     * @param offset - The offset from the top of the viewport in pixels.
     * @returns The `Otechdo` instance for chaining.
     */
    makeSticky(offset: number = 0): this {
        this.on("scroll", () => {
            const rect = this.element.getBoundingClientRect();
            this.element.style.position = rect.top <= offset ? "fixed" : "static";
            this.element.style.top = rect.top <= offset ? `${offset}px` : "";
        });
        return this;
    }
    /**
     * Automatically resizes a textarea based on content.
     * @returns The `Otechdo` instance for chaining.
     */
    autoResizeTextarea(): this {
        this.on("input", () => {
            this.element.style.height = "auto";
            this.element.style.height = `${this.element.scrollHeight}px`;
        });
        return this;
    }
    /**
     * Slides the element in from a specified direction.
     * @param direction - The direction ("left", "right", "top", or "bottom").
     * @param duration - The duration of the animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    slideIn(direction: "left" | "right" | "top" | "bottom", duration: number = 500): this {
        this.element.style.transition = `transform ${duration}ms ease`;
        this.element.style.transform = `translate${direction === "left" || direction === "right" ? "X" : "Y"}(${direction === "left" || direction === "top" ? "-" : ""}100%)`;
        setTimeout(() => (this.element.style.transform = "translate(0, 0)"), 0);
        return this;
    }

    /**
     * Slides the element out in a specified direction.
     * @param direction - The direction ("left", "right", "top", or "bottom").
     * @param duration - The duration of the animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    slideOut(direction: "left" | "right" | "top" | "bottom", duration: number = 500): this {
        this.element.style.transition = `transform ${duration}ms ease`;
        this.element.style.transform = `translate${direction === "left" || direction === "right" ? "X" : "Y"}(${direction === "left" || direction === "top" ? "-" : ""}100%)`;
        return this;
    }
    /**
     * Scrambles the text content with a random character effect.
     * @param iterations - Number of times to scramble each character.
     * @param duration - Duration in milliseconds for the effect.
     * @returns The `Otechdo` instance for chaining.
     */
    scrambleText(iterations: number = 5, duration: number = 50): this {
        const originalText = this.element.textContent || "";
        let currentIteration = 0;
        const interval = setInterval(() => {
            if (currentIteration >= iterations) {
                clearInterval(interval);
                this.element.textContent = originalText;
                return;
            }
            this.element.textContent = Array.from(originalText).map(char =>
                Math.random() > 0.5 ? char : String.fromCharCode(33 + Math.floor(Math.random() * 94))
            ).join("");
            currentIteration++;
        }, duration);
        return this;
    }
    /**
     * Adds a bounce animation to the element.
     * @param duration - Duration of the bounce animation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    bounce(duration: number = 500): this {
        this.element.style.animation = `bounce ${duration}ms ease-in-out`;
        this.element.addEventListener("animationend", () => (this.element.style.animation = ""));
        return this;
    }
    /**
     * Replaces the content of the element with a smooth transition.
     * @param newContent - The HTML content to switch to.
     * @param duration - Duration of the transition in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    switchContent(newContent: string, duration: number = 500): this {
        this.element.style.transition = `opacity ${duration / 2}ms`;
        this.element.style.opacity = "0";
        setTimeout(() => {
            this.element.innerHTML = newContent;
            this.element.style.opacity = "1";
        }, duration / 2);
        return this;
    }

    /**
     * Hides the element when clicking outside of it.
     * @returns The `Otechdo` instance for chaining.
     */
    closeOnOutsideClick(): this {
        const outsideClickListener = (event: MouseEvent) => {
            if (!this.element.contains(event.target as Node)) {
                this.element.style.display = "none";
                document.removeEventListener("click", outsideClickListener);
            }
        };
        document.addEventListener("click", outsideClickListener);
        return this;
    }

    /**
     * Automatically hides the element after a specified delay.
     * @param delay - The time in milliseconds before hiding.
     * @returns The `Otechdo` instance for chaining.
     */
    autoDismiss(delay: number = 3000): this {
        setTimeout(() => {
            this.element.style.display = "none";
        }, delay);
        return this;
    }

    /**
     * Smoothly transitions the text or background color.
     * @param color - The target color.
     * @param duration - Duration of the transition in milliseconds.
     * @param isBackground - Whether to change background (true) or text color (false).
     * @returns The `Otechdo` instance for chaining.
     */
    colorTransition(color: string, duration: number = 500, isBackground: boolean = true): this {
        const property = isBackground ? "backgroundColor" : "color";
        this.element.style.transition = `${property} ${duration}ms ease`;
        (this.element.style as any)[property] = color;
        return this;
    }



    /**
     * Blinks the element for a specified number of times.
     * @param times - Number of blinks.
     * @param interval - Duration of each blink in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    blink(times: number = 3, interval: number = 200): this {
        let count = 0;
        const blinkInterval = setInterval(() => {
            this.element.style.visibility = this.element.style.visibility === "hidden" ? "visible" : "hidden";
            count++;
            if (count >= times * 2) {
                clearInterval(blinkInterval);
                this.element.style.visibility = "visible";
            }
        }, interval);
        return this;
    }
    /**
     * Cycles through a list of states, applying each one sequentially.
     * @param states - An array of state objects with style and content properties.
     * @param interval - Duration for each state in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    cycleStates(states: { style?: { [key: string]: string }, content?: string }[], interval: number): this {
        let index = 0;
        setInterval(() => {
            const state = states[index];
            if (state.style) {
                Object.assign(this.element.style, state.style);
            }
            if (state.content !== undefined) {
                this.element.innerHTML = state.content;
            }
            index = (index + 1) % states.length;
        }, interval);
        return this;
    }

    /**
     * Snaps the element to a specified grid size.
     * @param gridSize - The size of the grid cells in pixels.
     * @returns The `Otechdo` instance for chaining.
     */
    snapToGrid(gridSize: number): this {
        const rect = this.element.getBoundingClientRect();
        const left = Math.round(rect.left / gridSize) * gridSize;
        const top = Math.round(rect.top / gridSize) * gridSize;
        this.element.style.position = "absolute";
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        return this;
    }

    /**
     * Adds a shake animation to the element with adjustable intensity.
     * @param intensity - Intensity of the shake in pixels.
     * @param duration - Duration of each shake cycle in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    shakeWithIntensity(intensity: number = 5, duration: number = 100): this {
        const originalPosition = this.element.style.position;
        this.element.style.position = "relative";
        let count = 0;
        const shakeInterval = setInterval(() => {
            this.element.style.left = `${(count % 2 === 0 ? intensity : -intensity)}px`;
            count++;
            if (count >= 4) {
                clearInterval(shakeInterval);
                this.element.style.left = "0";
                this.element.style.position = originalPosition;
            }
        }, duration);
        return this;
    }
    /**
     * Triggers focus styles on the element only when accessed via keyboard.
     * @returns The `Otechdo` instance for chaining.
     */
    focusOnlyOnKeyboard(): this {
        this.on("focus", () => {
            if (window.matchMedia("(hover: none)").matches) {
                this.addClass("focus-visible");
            }
        }).on("blur", () => this.removeClass("focus-visible"));
        return this;
    }

    /**
     * Tracks scroll percentage and updates an indicator element.
     * @param indicator - The element that visually represents the scroll progress.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollPercentage(indicator: HTMLElement): this {
        this.on("scroll", () => {
            const scrollHeight = this.element.scrollHeight - this.element.clientHeight;
            const scrollTop = this.element.scrollTop;
            const percentScrolled = (scrollTop / scrollHeight) * 100;
            indicator.style.width = `${percentScrolled}%`;
        });
        return this;
    }

    /**
     * Generates and triggers a download link for text content or data.
     * @param data - The data to download as a string or Blob.
     * @param filename - The name of the file to be downloaded.
     * @returns The `Otechdo` instance for chaining.
     */
    downloadAsFile(data: string | Blob, filename: string): this {
        const link = document.createElement("a");
        link.href = typeof data === "string" ? `data:text/plain;charset=utf-8,${encodeURIComponent(data)}` : URL.createObjectURL(data);
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return this;
    }

    /**
     * Adds a horizontal scrolling marquee effect to the text content.
     * @param speed - Speed of the scroll in pixels per second.
     * @returns The `Otechdo` instance for chaining.
     */
    marquee(speed: number = 50): this {
        const textContent = this.element.textContent || "";
        const clone = this.element.cloneNode(true);
        this.element.appendChild(clone);
        this.element.style.whiteSpace = "nowrap";
        this.element.style.overflow = "hidden";
        let position = 0;
        const marqueeInterval = setInterval(() => {
            position -= speed / 60;
            this.element.scrollLeft = position;
            if (Math.abs(position) >= this.element.scrollWidth / 2) {
                position = 0;
            }
        }, 1000 / 60);
        return this;
    }

    /**
     * Saves the element's inner HTML to local storage.
     * @param key - The local storage key to save the content under.
     * @returns The `Otechdo` instance for chaining.
     */
    saveToLocalStorage(key: string): this {
        localStorage.setItem(key, this.element.innerHTML);
        return this;
    }

    /**
     * Restores the element's inner HTML from local storage.
     * @param key - The local storage key to retrieve the content from.
     * @returns The `Otechdo` instance for chaining.
     */
    restoreFromLocalStorage(key: string): this {
        const savedContent = localStorage.getItem(key);
        if (savedContent) {
            this.element.innerHTML = savedContent;
        }
        return this;
    }
    /**
     * Detects when the element enters the viewport within a custom threshold.
     * @param callback - Function to trigger when the element is in view.
     * @param threshold - Threshold (0 to 1) of the element’s visibility to trigger the callback.
     * @returns The `Otechdo` instance for chaining.
     */
    onInView(callback: () => void, threshold: number = 0.5): this {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
                        callback();
                    }
                });
            },
            { threshold }
        );
        observer.observe(this.element);
        return this;
    }
    /**
     * Limits character input and shows a counter.
     * @param maxChars - Maximum number of characters.
     * @param counterElement - Element to display the character count.
     * @returns The `Otechdo` instance for chaining.
     */
    limitInputWithCounter(maxChars: number, counterElement: HTMLElement): this {
        this.on("input", (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.value.length > maxChars) {
                input.value = input.value.slice(0, maxChars);
            }
            counterElement.textContent = `${maxChars - input.value.length} characters left`;
        });
        return this;
    }

    /**
     * Creates and shows a modal dialog with specified content.
     * @param content - The HTML content for the modal.
     * @returns The `Otechdo` instance for chaining.
     */
    showModal(content: string): this {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.zIndex = "1000";
        modal.style.padding = "20px";
        modal.style.backgroundColor = "#fff";
        modal.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        modal.innerHTML = content;
        document.body.appendChild(modal);

        // Close on click outside modal
        this.on("click", event => {
            if (event.target === modal) {
                modal.remove();
            }
        });
        return this;
    }
    /**
     * Adds a typewriter effect to the element's text.
     * @param text - The text to display.
     * @param speed - Speed of typing in milliseconds per character.
     * @returns The `Otechdo` instance for chaining.
     */
    typewriterEffect(text: string, speed: number = 100): this {
        let index = 0;
        this.element.textContent = "";
        const interval = setInterval(() => {
            this.element.textContent += text[index];
            index++;
            if (index === text.length) clearInterval(interval);
        }, speed);
        return this;
    }

    /**
     * Flashes the background color for emphasis.
     * @param color - Color to flash.
     * @param duration - Duration of the flash in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    flashBackground(color: string = "yellow", duration: number = 200): this {
        const originalColor = this.element.style.backgroundColor;
        this.element.style.backgroundColor = color;
        setTimeout(() => {
            this.element.style.transition = `background-color ${duration}ms ease`;
            this.element.style.backgroundColor = originalColor;
        }, duration);
        return this;
    }

    /**
     * Exports the element's content as a JSON file.
     * @param filename - The name of the JSON file to download.
     * @returns The `Otechdo` instance for chaining.
     */
    downloadAsJSON(filename: string = "data.json"): this {
        const data = JSON.stringify(this.element.innerHTML);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return this;
    }

    /**
     * Detects when the user scrolls to the bottom of the element and triggers a callback to load more content.
     * @param callback - Function to execute when reaching the bottom.
     * @returns The `Otechdo` instance for chaining.
     */
    infiniteScroll(callback: () => void): this {
        this.on("scroll", () => {
            const { scrollTop, scrollHeight, clientHeight } = this.element;
            if (scrollTop + clientHeight >= scrollHeight) {
                callback();
            }
        });
        return this;
    }

    /**
     * Creates a deep clone of the element with all styles and attributes.
     * @returns A new `Otechdo` instance of the cloned element.
     */
    deepClone(): Otechdo {
        const clone = this.element.cloneNode(true) as HTMLElement;
        const newOtechdo = new Otechdo(clone);
        Array.from(this.element.attributes).forEach(attr => {
            newOtechdo.element.setAttribute(attr.name, attr.value);
        });
        newOtechdo.element.style.cssText = this.element.style.cssText;
        return newOtechdo;
    }
    /**
     * Animates the element along a specified path.
     * @param path - An array of coordinates to follow, e.g., [{ x: 0, y: 0 }, { x: 100, y: 100 }]
     * @param duration - Duration in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    animatePath(path: { x: number; y: number }[], duration: number = 1000): this {
        const stepDuration = duration / path.length;
        let currentStep = 0;
        const animateStep = () => {
            if (currentStep >= path.length) return;
            const { x, y } = path[currentStep];
            this.element.style.transition = `transform ${stepDuration}ms linear`;
            this.element.style.transform = `translate(${x}px, ${y}px)`;
            currentStep++;
            setTimeout(animateStep, stepDuration);
        };
        animateStep();
        return this;
    }

    /**
     * Plays a sound file when a specified event is triggered.
     * @param event - The event to trigger the sound (e.g., "click").
     * @param audioUrl - URL of the audio file.
     * @returns The `Otechdo` instance for chaining.
     */
    playSoundOnEvent(event: string, audioUrl: string): this {
        const audio = new Audio(audioUrl);
        this.on(event, () => audio.play());
        return this;
    }

    /**
     * Plays a music file
     * @param audioUrl - URL of the audio file.
     * @returns The `Otechdo` instance for chaining.
     */
    play(audioUrl: string): this {
        const audio = new Audio(audioUrl);
        audio.play().then(()=> {
            return this;
        }).finally(()=> {
            return this;
        });
        return this;
    }

    /**
     * Rotates the element 360 degrees on click.
     * @param duration - Duration of the rotation in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    rotateOnClick(duration: number = 1000): this {
        this.on("click", () => {
            this.element.style.transition = `transform ${duration}ms`;
            this.element.style.transform = `rotate(360deg)`;
            setTimeout(() => (this.element.style.transform = ""), duration);
        });
        return this;
    }

    /**
     * Animates the element when it scrolls into the viewport.
     * @param animationClass - The CSS class to add for the animation.
     * @returns The `Otechdo` instance for chaining.
     */
    animateOnScroll(animationClass: string): this {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.addClass(animationClass);
                    observer.unobserve(this.element);
                }
            });
        });
        observer.observe(this.element);
        return this;
    }
    /**
     * Adjusts font size to fit within the container.
     * @param minSize - Minimum font size in pixels.
     * @param maxSize - Maximum font size in pixels.
     * @returns The `Otechdo` instance for chaining.
     */
    fitTextToContainer(minSize: number = 12, maxSize: number = 100): this {
        let fontSize = maxSize;
        this.element.style.fontSize = `${fontSize}px`;
        while (this.element.scrollWidth > this.element.clientWidth && fontSize > minSize) {
            fontSize--;
            this.element.style.fontSize = `${fontSize}px`;
        }
        return this;
    }

    /**
     * Makes the element sticky at the top of the viewport.
     * @returns The `Otechdo` instance for chaining.
     */
    stickyHeader(): this {
        const initialPosition = this.element.offsetTop;
        window.addEventListener("scroll", () => {
            if (window.scrollY > initialPosition) {
                this.element.style.position = "fixed";
                this.element.style.top = "0";
                this.element.style.width = "100%";
            } else {
                this.element.style.position = "static";
            }
        });
        return this;
    }
    /**
     * Morphs the element into another shape or size.
     * @param targetStyles - The target CSS styles.
     * @param duration - Duration of the morphing effect.
     * @returns The `Otechdo` instance for chaining.
     */
    morph(targetStyles: { [key: string]: string }, duration: number = 1000): this {
        Object.assign(this.element.style, targetStyles, { transition: `all ${duration}ms ease` });
        return this;
    }
    /**
     * Displays a real-time clock inside the element.
     * @returns The `Otechdo` instance for chaining.
     */
    showRealTimeClock(): this {
        const updateTime = () => {
            const now = new Date();
            this.element.textContent = now.toLocaleTimeString();
        };
        updateTime();
        setInterval(updateTime, 1000);
        return this;
    }
    /**
     * Automatically refreshes the element's content at specified intervals.
     * @param callback - Function to refresh the content.
     * @param interval - Refresh interval in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    autoRefreshContent(callback: () => void, interval: number = 5000): this {
        setInterval(() => {
            callback();
        }, interval);
        return this;
    }
    /**
     * Locks or unlocks scrolling within the element.
     * @param lock - Whether to lock (`true`) or unlock (`false`) scrolling.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollLock(lock: boolean = true): this {
        if (lock) {
            this.element.style.overflow = "hidden";
        } else {
            this.element.style.overflow = "auto";
        }
        return this;
    }

    /**
     * Transforms the element's text to uppercase when hovered.
     * @returns The `Otechdo` instance for chaining.
     */
    uppercaseOnHover(): this {
        this.on("mouseenter", () => {
            this.element.style.textTransform = "uppercase";
        }).on("mouseleave", () => {
            this.element.style.textTransform = "initial";
        });
        return this;
    }

    /**
     * Flips the element with an animation.
     * @param direction - Direction of flip ("horizontal" or "vertical").
     * @param duration - Duration of the flip animation.
     * @returns The `Otechdo` instance for chaining.
     */
    flip(direction: "horizontal" | "vertical" = "horizontal", duration: number = 500): this {
        const axis = direction === "horizontal" ? "Y" : "X";
        this.element.style.transition = `transform ${duration}ms`;
        this.element.style.transform = `rotate${axis}(180deg)`;
        setTimeout(() => (this.element.style.transform = ""), duration);
        return this;
    }
    /**
     * Synchronizes the scroll position with another element.
     * @param target - The element to sync scroll with.
     * @returns The `Otechdo` instance for chaining.
     */
    synchro(target: HTMLElement): this {
        this.on("scroll", () => {
            target.scrollTop = this.element.scrollTop;
            target.scrollLeft = this.element.scrollLeft;
        });
        return this;
    }
    /**
     * Lazily loads an image with a placeholder.
     * @param placeholder - The placeholder image URL.
     * @param imageUrl - The actual image URL to load.
     * @returns The `Otechdo` instance for chaining.
     */
    lazyLoadImageWithPlaceholder(placeholder: string, imageUrl: string): this {
        const img = this.element as HTMLImageElement;
        img.src = placeholder;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.src = imageUrl;
                    observer.unobserve(img);
                }
            });
        });
        observer.observe(img);
        return this;
    }
    /**
     * Starts a countdown timer with a visual progress bar.
     * @param seconds - Countdown duration in seconds.
     * @param progressBar - Element to display progress.
     * @param onComplete - Callback when the countdown ends.
     * @returns The `Otechdo` instance for chaining.
     */
    countdownWithProgress(seconds: number, progressBar: HTMLElement, onComplete: () => void): this {
        let remainingTime = seconds;
        const updateProgress = () => {
            const progress = ((seconds - remainingTime) / seconds) * 100;
            progressBar.style.width = `${progress}%`;
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                onComplete();
            }
            remainingTime--;
        };
        updateProgress();
        const countdownInterval = setInterval(updateProgress, 1000);
        return this;
    }

    /**
     * Sets multiple ARIA attributes on the element.
     * @param attributes - An object of ARIA attributes and their values.
     * @returns The `Otechdo` instance for chaining.
     */
    setAriaAttributes(attributes: { [key: string]: string }): this {
        Object.entries(attributes).forEach(([key, value]) => {
            this.element.setAttribute(`aria-${key}`, value);
        });
        return this;
    }


    /**
     * Adds a pulsing shadow effect to the element.
     * @param color - Shadow color.
     * @param size - Shadow size in pixels.
     * @param duration - Duration of the pulse animation.
     * @returns The `Otechdo` instance for chaining.
     */
    shadowPulse(color: string = "rgba(0, 0, 0, 0.5)", size: number = 15, duration: number = 1000): this {
        this.element.style.boxShadow = `0 0 ${size}px ${color}`;
        this.element.style.animation = `pulse ${duration}ms infinite alternate`;
        return this;
    }

    /**
     * Displays a notification that auto-dismisses after a specified duration.
     * @param message - The notification message.
     * @param duration - Duration in milliseconds before it disappears.
     * @returns The `Otechdo` instance for chaining.
     */
    notify(message: string, duration: number = 3000): this {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.classList.add("notification");
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.padding = "10px";
        notification.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        notification.style.color = "white";
        notification.style.borderRadius = "5px";
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), duration);
        return this;
    }

    /**
     * Toggles between expanded and collapsed states with animation.
     * @param expandedHeight - The expanded height.
     * @param collapsedHeight - The collapsed height.
     * @param duration - Duration of the transition in milliseconds.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleExpandCollapse(expandedHeight: string, collapsedHeight: string, duration: number = 300): this {
        const isExpanded = this.element.style.height === expandedHeight;
        this.element.style.transition = `height ${duration}ms ease`;
        this.element.style.height = isExpanded ? collapsedHeight : expandedHeight;
        return this;
    }

    /**
     * Positions the element as a floating button in the bottom corner.
     * @param position - "left" or "right" bottom corner position.
     * @returns The `Otechdo` instance for chaining.
     */
    makeFloatingButton(position: "left" | "right" = "right"): this {
        this.element.style.position = "fixed";
        this.element.style.bottom = "20px";
        this.element.style[position] = "20px";
        this.element.style.zIndex = "1000";
        this.element.style.padding = "10px";
        this.element.style.borderRadius = "50%";
        return this;
    }
    /**
     * Masks the input field with a specified format.
     * @param mask - A mask format string (e.g., "(###) ###-####").
     * @returns The `Otechdo` instance for chaining.
     */
    applyInputMask(mask: string): this {
        this.on("input", (event: Event) => {
            const input = event.target as HTMLInputElement;
            let value = input.value.replace(/\D/g, "");
            let formatted = "";
            let maskIndex = 0;
            for (const char of mask) {
                if (maskIndex >= value.length) break;
                if (char === "#") {
                    formatted += value[maskIndex++];
                } else {
                    formatted += char;
                }
            }
            input.value = formatted;
        });
        return this;
    }

    /**
     * Toggles collapsing and expanding the content on double-click.
     * @param collapsedHeight - Height when collapsed.
     * @param expandedHeight - Height when expanded.
     * @returns The `Otechdo` instance for chaining.
     */
    toggleCollapseOnDoubleClick(collapsedHeight: string = "0", expandedHeight: string = "auto"): this {
        let isCollapsed = true;
        this.on("dblclick", () => {
            this.element.style.height = isCollapsed ? expandedHeight : collapsedHeight;
            isCollapsed = !isCollapsed;
        });
        return this;
    }

    /**
     * Adds a reveal animation when the element scrolls into view.
     * @param animation - The CSS animation name to apply.
     * @returns The `Otechdo` instance for chaining.
     */
    revealOnScroll(animation: string): this {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.addClass(animation);
                    observer.unobserve(this.element);
                }
            });
        });
        observer.observe(this.element);
        return this;
    }
    /**
     * Shows a quick tooltip on hover.
     * @param text - Tooltip text to display.
     * @param position - "top", "bottom", "left", or "right" of the element.
     * @returns The `Otechdo` instance for chaining.
     */
    quickTooltip(text: string, position: "top" | "bottom" | "left" | "right" = "top"): this {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = text;
        tooltip.style.position = "absolute";
        tooltip.style.padding = "5px";
        tooltip.style.backgroundColor = "#333";
        tooltip.style.color = "#fff";
        tooltip.style.borderRadius = "4px";
        tooltip.style.zIndex = "1000";
        this.on("mouseenter", () => {
            document.body.appendChild(tooltip);
            const rect = this.element.getBoundingClientRect();
            switch (position) {
                case "top":
                    tooltip.style.left = `${rect.left + window.scrollX}px`;
                    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
                    break;
                case "bottom":
                    tooltip.style.left = `${rect.left + window.scrollX}px`;
                    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
                    break;
                case "left":
                    tooltip.style.left = `${rect.left + window.scrollX - tooltip.offsetWidth}px`;
                    tooltip.style.top = `${rect.top + window.scrollY}px`;
                    break;
                case "right":
                    tooltip.style.left = `${rect.right + window.scrollX}px`;
                    tooltip.style.top = `${rect.top + window.scrollY}px`;
                    break;
            }
        }).on("mouseleave", () => {
            tooltip.remove();
        });
        return this;
    }

    /**
     * Applies a CSS filter to the element.
     * @param filter - The CSS filter to apply (e.g., "blur(5px)").
     * @returns The `Otechdo` instance for chaining.
     */
    applyFilter(filter: string): this {
        this.element.style.filter = filter;
        return this;
    }

    /**
     * Removes any applied CSS filter from the element.
     * @returns The `Otechdo` instance for chaining.
     */
    removeFilter(): this {
        this.element.style.filter = "none";
        return this;
    }

    /**
     * Toggles between dark and light mode for the element.
     * @param isDark - Boolean to specify dark mode (`true`) or light mode (`false`).
     * @returns The `Otechdo` instance for chaining.
     */
    toggleDarkMode(isDark: boolean): this {
        this.element.style.backgroundColor = isDark ? "#333" : "#fff";
        this.element.style.color = isDark ? "#fff" : "#000";
        return this;
    }
    /**
     * Rotates the element in 3D space.
     * @param xAngle - Rotation angle along the X-axis.
     * @param yAngle - Rotation angle along the Y-axis.
     * @param zAngle - Rotation angle along the Z-axis.
     * @param duration - Duration of the animation.
     * @returns The `Otechdo` instance for chaining.
     */
    rotate3D(xAngle: number, yAngle: number, zAngle: number, duration: number = 500): this {
        this.element.style.transition = `transform ${duration}ms`;
        this.element.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg) rotateZ(${zAngle}deg)`;
        return this;
    }

    /**
     * Applies a CSS grid layout with specified columns and rows.
     * @param columns - CSS grid-template-columns value.
     * @param rows - CSS grid-template-rows value.
     * @returns The `Otechdo` instance for chaining.
     */
    grid(columns: string, rows: string): this {
        this.element.style.display = "grid";
        this.element.style.gridTemplateColumns = columns;
        this.element.style.gridTemplateRows = rows;
        return this;
    }
    /**
     * Applies Flexbox layout to the element with specified properties.
     * @param direction - Flex direction (`row`, `column`, etc.).
     * @param justifyContent - Alignment along the main axis (e.g., `center`, `space-between`).
     * @param alignItems - Alignment along the cross axis (e.g., `center`, `stretch`).
     * @returns The `Otechdo` instance for chaining.
     */
    flex(direction: "row" | "column" = "row", justifyContent: string = "flex-start", alignItems: string = "stretch"): this {
        this.element.style.display = "flex";
        this.element.style.flexDirection = direction;
        this.element.style.justifyContent = justifyContent;
        this.element.style.alignItems = alignItems;
        return this;
    }
    /**
     * Enables flex wrapping for the element.
     * @param wrap - Specifies whether items should wrap (`wrap`, `nowrap`, `wrap-reverse`).
     * @returns The `Otechdo` instance for chaining.
     */
    enableFlexWrap(wrap: "wrap" | "nowrap" | "wrap-reverse" = "wrap"): this {
        this.element.style.flexWrap = wrap;
        return this;
    }

    /**
     * Sets the alignment of a specific flex item.
     * @param index - Index of the child element to align.
     * @param alignSelf - Alignment for the specific item (`auto`, `flex-start`, `center`, etc.).
     * @returns The `Otechdo` instance for chaining.
     */
    alignFlexItem(index: number, alignSelf: "auto" | "flex-start" | "center" | "flex-end" | "baseline" | "stretch"): this {
        const child = this.element.children[index] as HTMLElement;
        if (child) {
            child.style.alignSelf = alignSelf;
        }
        return this;
    }
    /**
     * Sets the flex-basis for a specific item within the flex container.
     * @param index - Index of the child element to set flex-basis for.
     * @param basis - Flex-basis size (e.g., `100px`, `50%`).
     * @returns The `Otechdo` instance for chaining.
     */
    setFlexItemBasis(index: number, basis: string): this {
        const child = this.element.children[index] as HTMLElement;
        if (child) {
            child.style.flexBasis = basis;
        }
        return this;
    }
    /**
     * Applies responsive flexbox layout settings based on the screen width.
     * @param mobileDirection - Flex direction on small screens (`row`, `column`).
     * @param desktopDirection - Flex direction on larger screens.
     * @returns The `Otechdo` instance for chaining.
     */
    applyResponsiveFlex(mobileDirection: "row" | "column", desktopDirection: "row" | "column"): this {
        const updateFlex = () => {
            this.element.style.flexDirection = window.innerWidth < 768 ? mobileDirection : desktopDirection;
        };
        window.addEventListener("resize", updateFlex);
        updateFlex();
        return this;
    }

    /**
     * Sets flex-grow, flex-shrink, and flex-basis for a specific item.
     * @param index - Index of the child element.
     * @param grow - Flex-grow value.
     * @param shrink - Flex-shrink value.
     * @param basis - Flex-basis value (e.g., `auto`, `100px`, `50%`).
     * @returns The `Otechdo` instance for chaining.
     */
    setFlexItemProperties(index: number, grow: number = 1, shrink: number = 1, basis: string = "auto"): this {
        const child = this.element.children[index] as HTMLElement;
        if (child) {
            child.style.flex = `${grow} ${shrink} ${basis}`;
        }
        return this;
    }

    /**
     * Sets the order of a specific flex item.
     * @param index - Index of the child element.
     * @param order - The order value for this item.
     * @returns The `Otechdo` instance for chaining.
     */
    setFlexItemOrder(index: number, order: number): this {
        const child = this.element.children[index] as HTMLElement;
        if (child) {
            child.style.order = `${order}`;
        }
        return this;
    }
    /**
     * Centers content within the element both horizontally and vertically using flexbox.
     * @returns The `Otechdo` instance for chaining.
     */
    centerContentWithFlex(): this {
        this.element.style.display = "flex";
        this.element.style.justifyContent = "center";
        this.element.style.alignItems = "center";
        return this;
    }

    /**
     * Distributes space evenly between items in the flex container.
     * @returns The `Otechdo` instance for chaining.
     */
    distributeEvenly(): this {
        this.element.style.display = "flex";
        this.element.style.justifyContent = "space-around";
        return this;
    }
    /**
     * Applies a responsive CSS grid layout to the element.
     * @param mobileCols - Number of columns on mobile.
     * @param desktopCols - Number of columns on larger screens.
     * @returns The `Otechdo` instance for chaining.
     */
    applyResponsiveGrid(mobileCols: number = 1, desktopCols: number = 3): this {
        const updateGrid = () => {
            this.element.style.display = "grid";
            this.element.style.gridTemplateColumns = window.innerWidth < 768
                ? `repeat(${mobileCols}, 1fr)`
                : `repeat(${desktopCols}, 1fr)`;
        };
        window.addEventListener("resize", updateGrid);
        updateGrid();
        return this;
    }
    /**
     * Sets the grid columns to be of equal width.
     * @param columns - Number of columns.
     * @returns The `Otechdo` instance for chaining.
     */
    equalWidthGridColumns(columns: number): this {
        this.element.style.display = "grid";
        this.element.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        return this;
    }
    /**
     * Sets up a responsive grid that auto-fits columns based on available space.
     * @param minColumnWidth - Minimum width of each column.
     * @returns The `Otechdo` instance for chaining.
     */
    autoFitGrid(minColumnWidth: string = "150px"): this {
        this.element.style.display = "grid";
        this.element.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
        return this;
    }
    /**
     * Sets the gap between grid items.
     * @param gap - The gap size (e.g., `10px`, `1rem`).
     * @returns The `Otechdo` instance for chaining.
     */
    setGridGap(gap: string): this {
        this.element.style.gap = gap;
        return this;
    }
    /**
     * Sets a named grid area for positioning grid items.
     * @param area - The grid area name.
     * @returns The `Otechdo` instance for chaining.
     */
    setGridArea(area: string): this {
        this.element.style.gridArea = area;
        return this;
    }

    /**
     * Defines grid template areas within the grid container.
     * @param areas - Array of strings defining grid template areas.
     * @returns The `Otechdo` instance for chaining.
     */
    defineGridTemplateAreas(areas: string[]): this {
        this.element.style.display = "grid";
        this.element.style.gridTemplateAreas = areas.join(" ");
        return this;
    }

    /**
     * Sets up a masonry-style grid layout using CSS grid.
     * @param columns - Number of columns in the grid.
     * @param gap - Gap between grid items.
     * @returns The `Otechdo` instance for chaining.
     */
    applyMasonryGrid(columns: number = 3, gap: string = "10px"): this {
        this.element.style.display = "grid";
        this.element.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        this.element.style.gridAutoRows = "min-content";
        this.element.style.gap = gap;
        return this;
    }

    /**
     * Displays a tooltip showing the element's width and height on hover.
     * @returns The `Otechdo` instance for chaining.
     */
    showSizeOnHover(): this {
        const tooltip = document.createElement("span");
        tooltip.style.position = "absolute";
        tooltip.style.backgroundColor = "#000";
        tooltip.style.color = "#fff";
        tooltip.style.padding = "4px";
        tooltip.style.borderRadius = "4px";
        tooltip.style.display = "none";

        this.on("mouseenter", () => {
            tooltip.textContent = `Width: ${this.element.offsetWidth}px, Height: ${this.element.offsetHeight}px`;
            document.body.appendChild(tooltip);
            const rect = this.element.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 5}px`;
            tooltip.style.top = `${rect.top}px`;
            tooltip.style.display = "block";
        }).on("mouseleave", () => tooltip.remove());
        return this;
    }

    /**
     * Formats a date to a specified string format.
     * @param date - The date to format.
     * @param format - The format string (e.g., "YYYY-MM-DD", "DD/MM/YYYY").
     * @returns Formatted date string.
     */
    formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        const hours = (`0${date.getHours()}`).slice(-2);
        const minutes = (`0${date.getMinutes()}`).slice(-2);
        const seconds = (`0${date.getSeconds()}`).slice(-2);

        return format
            .replace("YYYY", `${year}`)
            .replace("MM", `${month}`)
            .replace("DD", `${day}`)
            .replace("HH", `${hours}`)
            .replace("mm", `${minutes}`)
            .replace("ss", `${seconds}`);
    }

    /**
     * Calculates the number of days between two dates.
     * @param date1 - The start date.
     * @param date2 - The end date.
     * @returns Number of days between the two dates.
     */
    getDaysBetween(date1: Date, date2: Date): number {
        const diffInMs = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }

    /**
     * Adds or subtracts days from a given date.
     * @param date - The date to modify.
     * @param days - The number of days to add (or subtract if negative).
     * @returns The modified date.
     */
    addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * Checks if a given date is in the past.
     * @param date - The date to check.
     * @returns True if the date is in the past; otherwise, false.
     */
    isPastDate(date: Date): boolean {
        return date < new Date();
    }

    /**
     * Converts a date to a localized string.
     * @param date - The date to localize.
     * @param locale - The locale string (e.g., "en-US", "fr-FR").
     * @returns Localized date string.
     */
    toLocaleString(date: Date, locale: string = "en-US"): string {
        return date.toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        });
    }

    /**
     * Returns a string representing the time since a given date.
     * @param date - The past date.
     * @returns A string like "5 days ago" or "3 hours ago".
     */
    since(date: Date): string {
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals: { label: string; seconds: number }[] = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count > 0) {
                return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
            }
        }
        return "just now";
    }

    /**
     * Calculates the difference between two dates in years, months, and days.
     * @param date1 - The start date.
     * @param date2 - The end date.
     * @returns An object with the number of years, months, and days.
     */
    getDetailedDateDifference(date1: Date, date2: Date): { years: number; months: number; days: number } {
        const start = new Date(date1);
        const end = new Date(date2);

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            days += new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        return { years, months, days };
    }

    /**
     * Calculates the difference between two dates.
     * @param date1 - The first date.
     * @param date2 - The second date.
     * @param unit - Unit of difference ("days", "hours", "minutes", "seconds").
     * @returns The difference between the two dates in the specified unit.
     */
    dateDifference(date1: Date, date2: Date, unit: "days" | "hours" | "minutes" | "seconds"): number {
        const msDiff = Math.abs(date2.getTime() - date1.getTime());
        const units = {
            days: 1000 * 60 * 60 * 24,
            hours: 1000 * 60 * 60,
            minutes: 1000 * 60,
            seconds: 1000
        };
        return Math.floor(msDiff / units[unit]);
    }
    /**
     * Parses a date string into a Date object based on a specified format.
     * @param dateString - The date string to parse.
     * @param format - The format of the date string (e.g., "YYYY-MM-DD").
     * @returns Parsed Date object or null if parsing fails.
     */
    parseDate(dateString: string, format: string = "YYYY-MM-DD"): Date | null {
        const parts: { [key: string]: number } = {};
        const formatParts = format.split(/[^A-Za-z]+/);
        const dateParts = dateString.split(/[^0-9]+/);

        if (formatParts.length !== dateParts.length) return null;

        formatParts.forEach((part, index) => {
            parts[part] = parseInt(dateParts[index], 10);
        });

        const year = parts["YYYY"] || new Date().getFullYear();
        const month = (parts["MM"] || 1) - 1; // Months are 0-indexed
        const day = parts["DD"] || 1;
        return new Date(year, month, day);
    }

    /**
     * Gets the start of the day for a given date.
     * @param date - The date for which to get the start of the day.
     * @returns Date object representing the start of the day.
     */
    getStartOfDay(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }

    /**
     * Gets the end of the day for a given date.
     * @param date - The date for which to get the end of the day.
     * @returns Date object representing the end of the day.
     */
    getEndOfDay(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }

    /**
     * Adds a specified number of months to a date.
     * @param date - The date to modify.
     * @param months - Number of months to add (or subtract if negative).
     * @returns Modified date.
     */
    addMonths(date: Date, months: number): Date {
        const result = new Date(date);
        const targetMonth = result.getMonth() + months;
        result.setMonth(targetMonth);

        // Adjust for month overflow
        if (result.getMonth() !== (targetMonth % 12 + 12) % 12) {
            result.setDate(0); // Set to last day of the previous month
        }
        return result;
    }

    /**
     * Adds a specified number of years to a date.
     * @param date - The date to modify.
     * @param years - Number of years to add (or subtract if negative).
     * @returns Modified date.
     */
    addYears(date: Date, years: number): Date {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }

    /**
     * Converts a date to an ISO 8601 string (e.g., "2023-10-31T23:59:59.999Z").
     * @param date - The date to convert.
     * @returns ISO 8601 formatted string.
     */
    toISOString(date: Date): string {
        return date.toISOString();
    }
    /**
     * Gets the end of the week (Saturday) for a given date.
     * @param date - The reference date.
     * @returns Date object representing the end of the week.
     */
    getEndOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() + (6 - day); // Adjust to Saturday
        return new Date(date.setDate(diff));
    }

    /**
     * Gets the start of the week (Sunday) for a given date.
     * @param date - The reference date.
     * @returns Date object representing the start of the week.
     */
    getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day; // Adjust to Sunday
        return new Date(date.setDate(diff));
    }
    /**
     * Gets the start of the month for a given date.
     * @param date - The reference date.
     * @returns Date object representing the start of the month.
     */
    getStartOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    /**
     * Gets the end of the month for a given date.
     * @param date - The reference date.
     * @returns Date object representing the end of the month.
     */
    getEndOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    /**
     * Gets the start of the year for a given date.
     * @param date - The reference date.
     * @returns Date object representing the start of the year.
     */
    getStartOfYear(date: Date): Date {
        return new Date(date.getFullYear(), 0, 1);
    }

    /**
     * Gets the end of the year for a given date.
     * @param date - The reference date.
     * @returns Date object representing the end of the year.
     */
    getEndOfYear(date: Date): Date {
        return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
    }

    /**
     * Sets a date to a specific time of day.
     * @param date - The original date.
     * @param hours - The hour to set (0-23).
     * @param minutes - The minute to set (0-59).
     * @param seconds - The second to set (0-59).
     * @returns Modified date with the specified time.
     */
    setTime(date: Date, hours: number, minutes: number, seconds: number = 0): Date {
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, seconds, 0);
        return newDate;
    }

    /**
     * Checks if a given year is a leap year.
     * @param year - The year to check.
     * @returns True if the year is a leap year; otherwise, false.
     */
    isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * Gets the number of days in a given month and year.
     * @param month - The month (0 = January, 11 = December).
     * @param year - The year.
     * @returns Number of days in the specified month.
     */
    getDaysInMonth(month: number, year: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Checks if a date falls within a specified range.
     * @param date - The date to check.
     * @param startDate - The start of the range.
     * @param endDate - The end of the range.
     * @returns True if the date is within the range; otherwise, false.
     */
    isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
        return date >= startDate && date <= endDate;
    }
    /**
     * Gets the current quarter of the year for a given date.
     * @param date - The date to check.
     * @returns The quarter (1, 2, 3, or 4).
     */
    getCurrentQuarter(date: Date): number {
        return Math.floor(date.getMonth() / 3) + 1;
    }

    /**
     * Gets the start of the quarter for a given date.
     * @param date - The date to get the start of the quarter for.
     * @returns Date object representing the start of the quarter.
     */
    getStartOfQuarter(date: Date): Date {
        const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
        return new Date(date.getFullYear(), quarterStartMonth, 1, 0, 0, 0, 0);
    }

    /**
     * Gets the end of the quarter for a given date.
     * @param date - The date to get the end of the quarter for.
     * @returns Date object representing the end of the quarter.
     */
    getEndOfQuarter(date: Date): Date {
        const quarterEndMonth = Math.floor(date.getMonth() / 3) * 3 + 2;
        return new Date(date.getFullYear(), quarterEndMonth + 1, 0, 23, 59, 59, 999);
    }
    /**
     * Gets the date for the next day.
     * @param date - The current date.
     * @returns Date object representing the next day.
     */
    nextDay(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }

    /**
     * Gets the date for the previous day.
     * @param date - The current date.
     * @returns Date object representing the previous day.
     */
    previousDay(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    }
    /**
     * Finds the date of the next specified day of the week.
     * @param date - The current date.
     * @param dayOfWeek - The desired day of the week (0 for Sunday, 1 for Monday, etc.).
     * @returns Date object representing the next occurrence of the specified day.
     */
    nextDayOfWeek(date: Date, dayOfWeek: number): Date {
        const result = new Date(date);
        result.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7 || 7));
        return result;
    }
    /**
     * Formats a date in relative terms (e.g., "Tomorrow", "Next Week").
     * @param date - The date to format.
     * @returns A string representing the relative date.
     */
    formatRelative(date: Date): string {
        const now = new Date();
        const diffDays = this.getDaysBetween(now, date);

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        if (diffDays === -1) return "Yesterday";

        if (diffDays < 7 && diffDays > 0) return `In ${diffDays} days`;
        if (diffDays < 0 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;

        if (diffDays >= 7 && diffDays <= 13) return "Next Week";
        if (diffDays <= -7 && diffDays >= -13) return "Last Week";

        return date.toLocaleDateString();
    }
    /**
     * Gets the ISO week number of a given date.
     * @param date - The date to find the week number for.
     * @returns The ISO week number.
     */
    getISOWeekNumber(date: Date): number {
        const tempDate = new Date(date);
        tempDate.setHours(0, 0, 0, 0);
        tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
        const startOfYear = new Date(tempDate.getFullYear(), 0, 4);
        return Math.floor((tempDate.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    }
    /**
     * Returns a relative time string like "5 minutes ago" or "2 days ago".
     * @param date - The date to compare.
     * @returns A string representing the relative time.
     */
    ago(date: Date): string {
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
        const weeks = Math.floor(days / 7);
        if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
        const years = Math.floor(days / 365);
        return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
    /**
     * Returns a simple "X days ago" or "in X days" based on the date comparison.
     * @param date - The date to compare.
     * @returns A string with days difference, either past or future.
     */
    agoOrUntil(date: Date): string {
        const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return days >= 0 ? `${days} day${days !== 1 ? "s" : ""} ago` : `in ${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""}`;
    }
    /**
     * Capitalizes the first letter of a string.
     * @param text - The string to capitalize.
     * @returns The capitalized string.
     */
    capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    /**
     * Capitalizes the first letter of each word in a string.
     * @param text - The string to transform.
     * @returns The string with each word capitalized.
     */
    capitalizeEachWord(text: string): string {
        return text.replace(/\b\w/g, char => char.toUpperCase());
    }
    /**
     * Truncates text to a specified length, adding ellipsis if necessary.
     * @param text - The text to truncate.
     * @param length - The maximum length.
     * @returns The truncated string with ellipsis if needed.
     */
    truncateWithEllipsis(text: string, length: number): string {
        return text.length > length ? text.slice(0, length) + "..." : text;
    }
    /**
     * Converts a string to snake_case.
     * @param text - The string to convert.
     * @returns The snake_case string.
     */
    toSnakeCase(text: string): string {
        return text
            .replace(/\s+/g, "_")
            .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
            .toLowerCase()
            .replace(/^_/, "");
    }

    /**
     * Converts a string to kebab-case.
     * @param text - The string to convert.
     * @returns The kebab-case string.
     */
    toKebabCase(text: string): string {
        return text
            .replace(/\s+/g, "-")
            .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
            .toLowerCase()
            .replace(/^-/, "");
    }

    /**
     * Reverses the characters in a string.
     * @param text - The string to reverse.
     * @returns The reversed string.
     */
    reverseString(text: string): string {
        return text.split("").reverse().join("");
    }
    /**
     * Counts the number of words in a string.
     * @param text - The string to count words in.
     * @returns The word count.
     */
    countWords(text: string): number {
        return text.trim().split(/\s+/).length;
    }

    /**
     * Converts a string to a URL-friendly slug.
     * @param text - The string to slugify.
     * @returns The slugified string.
     */
    slugify(text: string): string {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }
    /**
     * Removes extra whitespace between words in a string.
     * @param text - The string to clean.
     * @returns The cleaned string with extra spaces removed.
     */
    trim(text: string): string {
        return text.replace(/\s+/g, " ").trim();
    }
    /**
     * Obfuscates an email address by hiding part of it for privacy.
     * @param email - The email address to obfuscate.
     * @returns The obfuscated email string.
     */
    obfuscateEmail(email: string): string {
        const [localPart, domain] = email.split("@");
        return `${localPart[0]}***${localPart.slice(-1)}@${domain}`;
    }

    /**
     * Repeats a string a specified number of times.
     * @param text - The string to repeat.
     * @param times - The number of repetitions.
     * @returns The repeated string.
     */
    str_repeat(text: string, times: number): string {
        return text.repeat(times);
    }

    /**
     * Converts newlines in a string to <br> HTML tags.
     * @param text - The string with newlines.
     * @returns The string with <br> tags.
     */
    nl2br(text: string): string {
        return text.replace(/\n/g, "<br>");
    }

    /**
     * Checks if a string is a palindrome.
     * @param text - The string to check.
     * @returns True if the string is a palindrome; otherwise, false.
     */
    isPalindrome(text: string): boolean {
        const cleaned = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return cleaned === cleaned.split("").reverse().join("");
    }
    /**
     * Loads an image with a fallback URL in case of an error.
     * @param imgElement - The image element to set the source on.
     * @param src - The primary image URL.
     * @param fallbackSrc - The fallback image URL.
     */
    loadImageWithFallback(imgElement: HTMLImageElement, src: string, fallbackSrc: string): void {
        imgElement.src = src;
        imgElement.onerror = () => imgElement.src = fallbackSrc;
    }

    /**
     * Lazily loads images by observing them as they appear in the viewport.
     * @param imgElement - The image element to lazy load.
     * @param src - The actual source of the image.
     */
    lazyLoadImage(imgElement: HTMLImageElement, src: string): void {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imgElement.src = src;
                    observer.unobserve(imgElement);
                }
            });
        });
        observer.observe(imgElement);
    }

    /**
     * Sets a placeholder image if the image source is missing.
     * @param imgElement - The image element to set the placeholder on.
     * @param placeholderText - Text to display on the placeholder.
     * @param width - Width of the placeholder.
     * @param height - Height of the placeholder.
     */
    setPlaceholderImage(imgElement: HTMLImageElement, placeholderText: string, width: number, height: number): void {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.fillStyle = "#ddd";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(placeholderText, width / 2, height / 2);
            imgElement.src = canvas.toDataURL();
        }
    }

    /**
     * Makes an element draggable by tracking mouse movements.
     * @param element - The element to make draggable.
     */
    makeDraggable(element: HTMLElement): void {
        let offsetX = 0, offsetY = 0;

        element.onmousedown = event => {
            event.preventDefault();
            offsetX = event.clientX - element.offsetLeft;
            offsetY = event.clientY - element.offsetTop;

            document.onmousemove = e => {
                e.preventDefault();
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
    /**
     * Restricts a draggable element to a specific container.
     * @param element - The element to make draggable.
     * @param container - The container within which the element should be restricted.
     */
    restrictDraggableToContainer(element: HTMLElement, container: HTMLElement): void {
        let offsetX = 0, offsetY = 0;

        element.onmousedown = event => {
            event.preventDefault();
            offsetX = event.clientX - element.offsetLeft;
            offsetY = event.clientY - element.offsetTop;

            document.onmousemove = e => {
                e.preventDefault();
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;

                // Constrain to container boundaries
                const containerRect = container.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                x = Math.max(containerRect.left, Math.min(containerRect.right - elementRect.width, x));
                y = Math.max(containerRect.top, Math.min(containerRect.bottom - elementRect.height, y));

                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    /**
     * Sets a poster image for a video element.
     * @param videoElement - The video element.
     * @param posterUrl - The URL of the poster image.
     */
    setVideoPoster(videoElement: HTMLVideoElement, posterUrl: string): void {
        videoElement.poster = posterUrl;
    }
    /**
     * Auto-plays and mutes a video when it becomes visible in the viewport.
     * @param videoElement - The video element.
     */
    autoPlayAndMuteVideo(videoElement: HTMLVideoElement): void {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoElement.muted = true;
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            });
        });
        observer.observe(videoElement);
    }

    /**
     * Plays the video on hover and pauses it when the mouse leaves.
     * @param videoElement - The video element.
     */
    playVideoOnHover(videoElement: HTMLVideoElement): void {
        videoElement.onmouseenter = () => videoElement.play();
        videoElement.onmouseleave = () => videoElement.pause();
    }


    /**
     * Appends a child element to the current element.
     * @param child - The HTML element to append.
     * @returns The `Otechdo` instance for chaining.
     */
    append(child: HTMLElement): this {
        this.element.append(child);
        return this;
    }
    /**
     * Makes an AJAX GET request and returns the JSON response.
     * @param url - The URL to request.
     * @returns A promise that resolves to the JSON response.
     */
    async get(url: string): Promise<any> {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    }
    /**
     * Makes an AJAX POST request with JSON data.
     * @param url - The URL to request.
     * @param data - The data to send in the body of the request.
     * @returns A promise that resolves to the JSON response.
     */
    async post(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    }

    /**
     * Makes an AJAX PUT request with JSON data.
     * @param url - The URL to request.
     * @param data - The data to send in the body of the request.
     * @returns A promise that resolves to the JSON response.
     */
    async put(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    }

    /**
     * Sends a GET request to the specified URL.
     * @param url - The URL to send the request to.
     * @returns A Promise that resolves with the response data.
     */
    async getRequest(url: string): Promise<any> {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) throw new Error(`GET request failed: ${response.statusText}`);
        return response.json();
    }

    /**
     * Sends a POST request with JSON data.
     * @param url - The URL to send the request to.
     * @param data - The data to send in the request body.
     * @returns A Promise that resolves with the response data.
     */
    async postRequest(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`POST request failed: ${response.statusText}`);
        return response.json();
    }
    /**
     * Sends a PUT request with JSON data.
     * @param url - The URL to send the request to.
     * @param data - The data to update in the request body.
     * @returns A Promise that resolves with the response data.
     */
    async putRequest(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`PUT request failed: ${response.statusText}`);
        return response.json();
    }
    /**
     * Sends a DELETE request to the specified URL.
     * @param url - The URL to send the request to.
     * @returns A Promise that resolves with the response data.
     */
    async deleteRequest(url: string): Promise<any> {
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok) throw new Error(`DELETE request failed: ${response.statusText}`);
        return response.json();
    }
    /**
     * Sends a request with custom headers and returns the response data.
     * @param url - The URL to send the request to.
     * @param method - The HTTP method (GET, POST, etc.).
     * @param headers - Custom headers to include in the request.
     * @param data - Optional data to include in the request body (for POST, PUT).
     * @returns A Promise that resolves with the response data.
     */
    async requestWithHeaders(url: string, method: string, headers: { [key: string]: string }, data?: any): Promise<any> {
        const options: RequestInit = {
            method,
            headers: { "Content-Type": "application/json", ...headers }
        };
        if (data) options.body = JSON.stringify(data);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`${method} request failed: ${response.statusText}`);
        return response.json();
    }
    /**
     * Sends a GET request with query parameters.
     * @param url - The base URL.
     * @param params - An object representing query parameters.
     * @returns A Promise that resolves with the response data.
     */
    async getRequestWithParams(url: string, params: { [key: string]: any }): Promise<any> {
        const query = new URLSearchParams(params).toString();
        return this.getRequest(`${url}?${query}`);
    }

    /**
     * Parses and handles JSON response, throwing an error if the response is invalid.
     * @param response - The fetch response to parse.
     * @returns A Promise that resolves with the parsed JSON data.
     */
    async handleJSONResponse(response: Response): Promise<any> {
        if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
        return response.json();
    }
    /**
     * Uploads a file using a POST request with FormData.
     * @param url - The URL to send the request to.
     * @param file - The file to upload.
     * @param additionalData - Any additional data to send with the file.
     * @returns A Promise that resolves with the response data.
     */
    async uploadFile(url: string, file: File, additionalData?: { [key: string]: any }): Promise<any> {
        const formData = new FormData();
        formData.append("file", file);

        if (additionalData) {
            Object.keys(additionalData).forEach(key => formData.append(key, additionalData[key]));
        }

        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        return this.handleJSONResponse(response);
    }
    /**
     * Sends a request with retries on failure.
     * @param url - The URL to send the request to.
     * @param method - The HTTP method (GET, POST, etc.).
     * @param retries - The number of times to retry if the request fails.
     * @param delay - The delay in milliseconds between retries.
     * @returns A Promise that resolves with the response data.
     */
    async requestWithRetry(url: string, method: string = "GET", retries: number = 3, delay: number = 1000): Promise<any> {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await fetch(url, { method });
                if (response.ok) return response.json();
            } catch (error) {
                if (attempt === retries - 1) throw new Error(`Request failed after ${retries} attempts: ${error}`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    /**
     * Makes an AJAX request with a specified timeout.
     * @param url - The URL to request.
     * @param options - Fetch options (method, headers, etc.).
     * @param timeout - Timeout duration in milliseconds.
     * @returns A promise that resolves to the response or rejects on timeout.
     */
    async fetchWithTimeout(url: string, options: RequestInit, timeout: number = 5000): Promise<Response> {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timer);
        return response;
    }
    /**
     * Sends a JSONP request for cross-origin requests.
     * @param url - The URL to send the JSONP request to.
     * @param callbackName - The name of the callback function.
     * @returns A Promise that resolves with the JSONP response data.
     */
    async jsonpRequest(url: string, callbackName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `${url}?callback=${callbackName}`;
            script.onerror = () => reject(new Error("JSONP request failed"));

            (window as any)[callbackName] = (data: any) => {
                resolve(data);
                delete (window as any)[callbackName];
                document.body.removeChild(script);
            };

            document.body.appendChild(script);
        });
    }
    /**
     * Sends a request with a timeout period.
     * @param url - The URL to send the request to.
     * @param method - The HTTP method (GET, POST, etc.).
     * @param timeout - The timeout in milliseconds.
     * @returns A Promise that resolves with the response data.
     */
    async requestWithTimeout(url: string, method: string = "GET", timeout: number = 5000): Promise<any> {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { method, signal: controller.signal });
            clearTimeout(id);
            return await response.json();
        } catch (error) {
            if (controller.signal.aborted) throw new Error("Request timed out");
            throw error;
        }
    }
    /**
     * Uploads a file and tracks the progress.
     * @param url - The URL to send the request to.
     * @param file - The file to upload.
     * @param onProgress - Callback to track upload progress.
     * @returns A Promise that resolves with the response data.
     */
    async uploadWithProgress(url: string, file: File, onProgress: (percent: number) => void): Promise<any> {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);

        return new Promise((resolve, reject) => {
            xhr.open("POST", url);

            xhr.upload.onprogress = event => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    onProgress(percentComplete);
                }
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`Upload failed: ${xhr.statusText}`));
                }
            };

            xhr.onerror = () => reject(new Error("Network error"));
            xhr.send(formData);
        });
    }

    /**
     * Sends multiple requests concurrently and returns an array of responses.
     * @param requests - An array of request configurations { url, method, data }.
     * @returns A Promise that resolves with an array of responses.
     */
    async batchRequests(requests: { url: string; method: string; data?: any }[]): Promise<any[]> {
        const promises = requests.map(request => {
            const { url, method, data } = request;
            return method === "GET"
                ? this.getRequest(url)
                : method === "POST"
                    ? this.postRequest(url, data)
                    : method === "PUT"
                        ? this.putRequest(url, data)
                        : this.deleteRequest(url);
        });
        return Promise.all(promises);
    }

    /**
     * Sends a request with retries using exponential backoff.
     * @param url - The URL to send the request to.
     * @param method - HTTP method (GET, POST, etc.).
     * @param retries - Number of retries.
     * @param baseDelay - Initial delay in milliseconds for backoff.
     * @returns A Promise that resolves with the response data.
     */
    async requestWithExponentialBackoff(url: string, method: string = "GET", retries: number = 3, baseDelay: number = 500): Promise<any> {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await fetch(url, { method });
                if (response.ok) return response.json();
            } catch (error) {
                if (attempt === retries - 1) throw new Error(`Request failed after ${retries} attempts: ${error}`);
                await new Promise(resolve => setTimeout(resolve, baseDelay * 2 ** attempt));
            }
        }
    }
    /**
     * Polls a server endpoint at specified intervals until a condition is met.
     * @param url - The URL to poll.
     * @param interval - Polling interval in milliseconds.
     * @param condition - A function that evaluates the response and returns true when done.
     * @returns A Promise that resolves when the condition is met.
     */
    async pollRequest(url: string, interval: number, condition: (response: any) => boolean): Promise<any> {
        while (true) {
            const response = await this.getRequest(url);
            if (condition(response)) return response;
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
    /**
     * Executes multiple requests sequentially and returns an array of responses.
     * @param requests - Array of request configurations { url, method, data }.
     * @returns A Promise that resolves with an array of responses.
     */
    async sequentialRequests(requests: { url: string; method: string; data?: any }[]): Promise<any[]> {
        const responses: any[] = [];
        for (const { url, method, data } of requests) {
            const response = method === "GET"
                ? await this.getRequest(url)
                : method === "POST"
                    ? await this.postRequest(url, data)
                    : method === "PUT"
                        ? await this.putRequest(url, data)
                        : await this.deleteRequest(url);
            responses.push(response);
        }
        return responses;
    }
    /**
     * Sends a request with the ability to cancel it.
     * @param url - The URL to send the request to.
     * @param method - HTTP method (GET, POST, etc.).
     * @returns A Promise that resolves with the response data and a cancel function.
     */
    cancelableRequest(url: string, method: string = "GET"): { promise: Promise<any>; cancel: () => void } {
        const controller = new AbortController();
        const promise = fetch(url, { method, signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error(`${method} request failed: ${response.statusText}`);
                return response.json();
            });
        return {
            promise,
            cancel: () => controller.abort()
        };
    }

    /**
     * Sends a request and retries only on specific HTTP status codes (e.g., 502, 503).
     * @param url - The URL to send the request to.
     * @param method - HTTP method (GET, POST, etc.).
     * @param retries - Number of retries on specific status codes.
     * @param retryStatuses - Array of HTTP statuses that should trigger a retry.
     * @returns A Promise that resolves with the response data.
     */
    async retryOnSpecificErrors(url: string, method: string = "GET", retries: number = 3, retryStatuses: number[] = [502, 503, 504]): Promise<any> {
        for (let attempt = 0; attempt < retries; attempt++) {
            const response = await fetch(url, { method });
            if (response.ok) return response.json();
            if (!retryStatuses.includes(response.status)) throw new Error(`${method} request failed: ${response.statusText}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
    }
    /**
     * Sends a request with headers conditionally set based on the URL.
     * @param url - The URL to send the request to.
     * @param method - HTTP method (GET, POST, etc.).
     * @param data - Optional data to include in the request body.
     * @returns A Promise that resolves with the response data.
     */
    async conditionalHeadersRequest(url: string, method: string = "GET", data?: any): Promise<any> {
        const headers: { [key: string]: string } = { "Content-Type": "application/json" };
        if (url.includes("secure")) {
            headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        }

        const options: RequestInit = {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined
        };

        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
        return response.json();
    }


    /**
     * Submits a form with text data and files.
     * @param url - The URL to send the request to.
     * @param formData - A FormData object containing text fields and files.
     * @returns A Promise that resolves with the response data.
     */
    async submit(url: string, formData: FormData): Promise<any> {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) throw new Error(`Form submission failed: ${response.statusText}`);
        return response.json();
    }

    /**
     * Sends a request and applies a transformation to the response data.
     * @param url - The URL to send the request to.
     * @param method - HTTP method (GET, POST, etc.).
     * @param transform - A function to transform the response data.
     * @returns A Promise that resolves with the transformed response data.
     */
    async requestWithTransform(url: string, method: string = "GET", transform: (data: any) => any): Promise<any> {
        const response = await fetch(url, { method });
        if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);

        const data = await response.json();
        return transform(data);
    }

    /**
     * Removes duplicate elements from an array.
     * @param array - The array with potential duplicates.
     * @returns A new array with duplicates removed.
     */
    uniqueArray<T>(array: T[]): T[] {
        return Array.from(new Set(array));
    }

    /**
     * Flattens a nested array.
     * @param array - The nested array.
     * @returns A flat array with all nested elements.
     */
    flattenArray<T>(array: any[]): T[] {
        return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flattenArray(val) : val), []);
    }

    /**
     * Generates a random alphanumeric string of a specified length.
     * @param length - The length of the string.
     * @returns A random alphanumeric string.
     */
    generateRandomString(length: number): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
    }
    /**
     * Capitalizes the first letter of each word in a sentence.
     * @param sentence - The sentence to capitalize.
     * @returns The capitalized sentence.
     */
    capitalizeWords(sentence: string): string {
        return sentence.replace(/\b\w/g, char => char.toUpperCase());
    }

    /**
     * Splits an array into smaller chunks of a specified size.
     * @param array - The array to split.
     * @param size - The chunk size.
     * @returns A two-dimensional array with chunks.
     */
    chunkArray<T>(array: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }


    /**
     * Prepends one or more children (elements or text) to the current element.
     * @param children - The elements or text to prepend.
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
     */
    remove(): this {
        this.element.remove();
        return this;
    }

    /**
     * Hides the element by setting `display: none`.
     * @returns The `Otechdo` instance for chaining.
     */
    hide(): this {
        this.element.style.display = 'none';
        return this;
    }

    /**
     * Shows the element by setting `display` to a specified value.
     * @param displayType - The display type (default is "block").
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
     */
    scrollTop(value: number): this {
        this.element.scrollTop = value;
        return this;
    }

    /**
     * Sets the horizontal scroll position of the element.
     * @param value - The scroll value.
     * @returns The `Otechdo` instance for chaining.
     */
    scrollLeft(value: number): this {
        this.element.scrollLeft = value;
        return this;
    }

    /**
     * Fades in the element with an animation duration.
     * @param duration - The animation duration (in ms).
     * @returns The `Otechdo` instance for chaining.
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
     * @returns The `Otechdo` instance for chaining.
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
     * @returns A new `Otechdo` instance for the parent element.
     */
    parent(): Otechdo {
        return new Otechdo(this.element.parentElement ?? this.element);
    }

    /**
     * Gets the first child of the current element.
     * @returns A new `Otechdo` instance for the child element.
     */
    child(): Otechdo {
        return new Otechdo(this.element.children.item(0) as HTMLElement ?? this.element);
    }

    /**
     * Finds a descendant element that matches a selector within the current element.
     * @param selector - The CSS selector to match.
     * @returns A new `Otechdo` instance for the matched element.
     */
    find(selector: string): Otechdo {
        return new Otechdo(this.element.querySelector(selector) as HTMLElement ?? this.element);
    }

    // ================================
    // Utility Methods
    // ================================

    /**
     * Appends text to the current element.
     * @param text - The text to append.
     * @returns The `Otechdo` instance for chaining.
     */
    appendText(text: string): this {
        this.element.appendChild(document.createTextNode(text));
        return this;
    }

    /**
     * Clones the current element.
     * @returns A new `Otechdo` instance for the cloned element.
     */
    clone(): Otechdo {
        return new Otechdo(this.element.cloneNode(true) as HTMLElement);
    }

    /**
     * Triggers a custom event on the current element.
     * @param eventType - The event type to trigger.
     * @param data - Additional data for the event.
     * @returns The `Otechdo` instance for chaining.
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
