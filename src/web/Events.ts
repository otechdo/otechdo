// src/web/Events.ts

/**
 * Events class provides methods to manage and handle events on a collection of elements.
 */
export class Events {
    elements: HTMLElement[];

    /**
     * Initializes the Events class with a collection of elements.
     * @param elements - Array of HTMLElements to bind events to.
     */
    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    /**
     * Adds an event listener to each element in the collection.
     * @param event - The event type to listen for (e.g., "click").
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The Events instance to allow chaining.
     */
    on(event: string, callback: (event: Event) => void): this {
        this.elements.forEach(el => el.addEventListener(event, callback));
        return this;
    }

    /**
     * Removes an event listener from each element in the collection.
     * @param event - The event type to remove (e.g., "click").
     * @param callback - The callback function that was previously added.
     * @returns The Events instance to allow chaining.
     */
    off(event: string, callback: (event: Event) => void): this {
        this.elements.forEach(el => el.removeEventListener(event, callback));
        return this;
    }

    /**
     * Adds an event listener that is triggered only once, then automatically removed.
     * @param event - The event type to listen for (e.g., "click").
     * @param callback - The callback function to execute when the event is triggered.
     * @returns The Events instance to allow chaining.
     */
    once(event: string, callback: (event: Event) => void): this {
        const handler = (e: Event) => {
            callback(e);
            this.off(event, handler);
        };
        this.on(event, handler);
        return this;
    }

    /**
     * Manually triggers an event on each element in the collection.
     * @param eventType - The type of event to trigger (e.g., "click").
     * @param data - Optional data to pass with the event.
     * @returns The Events instance to allow chaining.
     */
    trigger(eventType: string, data?: any): this {
        const event = new CustomEvent(eventType, { detail: data });
        this.elements.forEach(el => el.dispatchEvent(event));
        return this;
    }

    /**
     * Delegates an event to a specified child selector, allowing for dynamic event handling.
     * Useful for adding event listeners to elements that may be added later.
     * @param event - The event type to listen for (e.g., "click").
     * @param selector - The CSS selector to match the children.
     * @param callback - The callback function to execute when the delegated event is triggered.
     * @returns The Events instance to allow chaining.
     */
    delegate(event: string, selector: string, callback: (event: Event) => void): this {
        this.elements.forEach(el => {
            el.addEventListener(event, (e: Event) => {
                const target = e.target as HTMLElement;
                if (target && target.matches(selector)) {
                    callback(e);
                }
            });
        });
        return this;
    }
}
