// src/desktop/Events.ts
export class Events {
    elements: HTMLElement[];

    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    onKeyboardShortcut(keys: string[], callback: () => void): this {
        const keySet = new Set(keys);
        document.addEventListener("keydown", (event) => {
            if (keySet.has(event.key)) {
                callback();
            }
        });
        return this;
    }
}
