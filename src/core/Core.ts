// src/core/Core.ts
export class Core {
    elements: HTMLElement[];

    constructor(selector: string | HTMLElement | HTMLElement[]) {
        if (typeof selector === "string") {
            this.elements = Array.from(document.querySelectorAll(selector));
        } else if (selector instanceof HTMLElement) {
            this.elements = [selector];
        } else if (Array.isArray(selector)) {
            this.elements = selector;
        } else {
            this.elements = [];
        }
    }

    addClass(...classNames: string[]): this {
        this.elements.forEach(el => el.classList.add(...classNames));
        return this;
    }

    css(styles: { [key: string]: string | number }): this {
        this.elements.forEach(el => {
            for (const [property, value] of Object.entries(styles)) {
                (el.style as any)[property] = value;
            }
        });
        return this;
    }
}
