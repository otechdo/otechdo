// src/web/Events.ts
export class Events {
    elements: HTMLElement[];

    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    on(event: string, callback: (event: Event) => void): this {
        this.elements.forEach(el => el.addEventListener(event, callback));
        return this;
    }

    off(event: string, callback: (event: Event) => void): this {
        this.elements.forEach(el => el.removeEventListener(event, callback));
        return this;
    }
}
