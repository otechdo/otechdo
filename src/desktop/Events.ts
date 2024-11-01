// src/desktop/Events.ts

/**
 * Events class for desktop environments.
 * Manages system-level or global events.
 */
export class Events {
    private listeners: { [key: string]: (event: Event) => void } = {};

    /**
     * Adds a system-level event listener, such as window focus or resize.
     * @param event - The event type (e.g., "focus", "resize").
     * @param callback - The callback function to execute when the event is triggered.
     */
    addSystemEvent(event: string, callback: (event: Event) => void): this {
        this.listeners[event] = callback;
        window.addEventListener(event, callback);
        return this;
    }

    /**
     * Removes a previously added system-level event listener.
     * @param event - The event type (e.g., "focus", "resize").
     */
    removeSystemEvent(event: string): this {
        const callback = this.listeners[event];
        if (callback) {
            window.removeEventListener(event, callback);
            delete this.listeners[event];
        }
        return this;
    }
}
