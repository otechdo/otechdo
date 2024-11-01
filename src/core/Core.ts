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

    // Add one or more classes to the selected elements
    addClass(...classNames: string[]): this {
        this.elements.forEach(el => el.classList.add(...classNames));
        return this;
    }

    // Remove one or more classes from the selected elements
    removeClass(...classNames: string[]): this {
        this.elements.forEach(el => el.classList.remove(...classNames));
        return this;
    }

    // Toggle a class on the selected elements
    toggleClass(className: string): this {
        this.elements.forEach(el => el.classList.toggle(className));
        return this;
    }

    // Set CSS styles on the selected elements
    css(styles: { [key: string]: string | number }): this {
        this.elements.forEach(el => {
            for (const [property, value] of Object.entries(styles)) {
                (el.style as any)[property] = value;
            }
        });
        return this;
    }

    // Set or get attributes on the selected elements
    attr(attribute: string, value?: string): this | string | null {
        if (value === undefined) {
            return this.elements.length ? this.elements[0].getAttribute(attribute) : null;
        }
        this.elements.forEach(el => el.setAttribute(attribute, value));
        return this;
    }

    // Remove an attribute from the selected elements
    removeAttr(attribute: string): this {
        this.elements.forEach(el => el.removeAttribute(attribute));
        return this;
    }

    // Add event listeners to the selected elements
    on(event: string, handler: EventListener): this {
        this.elements.forEach(el => el.addEventListener(event, handler));
        return this;
    }

    // Remove event listeners from the selected elements
    off(event: string, handler: EventListener): this {
        this.elements.forEach(el => el.removeEventListener(event, handler));
        return this;
    }

    // Set or get the inner HTML of the selected elements
    html(content?: string): this | string {
        if (content === undefined) {
            return this.elements.length ? this.elements[0].innerHTML : '';
        }
        this.elements.forEach(el => (el.innerHTML = content));
        return this;
    }

    // Set or get the text content of the selected elements
    text(content?: string): this | string {
        if (content === undefined) {
            return this.elements.length ? this.elements[0].textContent || '' : '';
        }
        this.elements.forEach(el => (el.textContent = content));
        return this;
    }

    // Append HTML or elements to the selected elements
    append(...children: (string | HTMLElement)[]): this {
        this.elements.forEach(el => {
            children.forEach(child => {
                if (typeof child === "string") {
                    el.insertAdjacentHTML('beforeend', child);
                } else {
                    el.appendChild(child);
                }
            });
        });
        return this;
    }

    // Prepend HTML or elements to the selected elements
    prepend(...children: (string | HTMLElement)[]): this {
        this.elements.forEach(el => {
            children.forEach(child => {
                if (typeof child === "string") {
                    el.insertAdjacentHTML('afterbegin', child);
                } else {
                    el.insertBefore(child, el.firstChild);
                }
            });
        });
        return this;
    }

    // Remove the selected elements from the DOM
    remove(): this {
        this.elements.forEach(el => {
            el.remove();
        });
        return this;
    }

    // Hide the selected elements
    hide(): this {
        this.css({ display: "none" });
        return this;
    }

    // Show the selected elements
    show(displayType: string = "block"): this {
        this.css({ display: displayType });
        return this;
    }

    // Get or set the height of the selected elements
    height(value?: number): this | number | null {
        if (value === undefined) {
            return this.elements.length ? this.elements[0].offsetHeight : null;
        }
        this.elements.forEach(el => (el.style.height = `${value}px`));
        return this;
    }

    // Get or set the position of the selected elements
    position(): { top: number; left: number } | null {
        if (!this.elements.length) return null;
        const el = this.elements[0];
        return { top: el.offsetTop, left: el.offsetLeft };
    }

    // Get or set the scroll position of the selected elements
    scrollTop(value?: number): this | number {
        if (value === undefined) {
            return this.elements.length ? this.elements[0].scrollTop : 0;
        }
        this.elements.forEach(el => (el.scrollTop = value));
        return this;
    }

    scrollLeft(value?: number): this | number {
        if (value === undefined) {
            return this.elements.length ? this.elements[0].scrollLeft : 0;
        }
        this.elements.forEach(el => (el.scrollLeft = value));
        return this;
    }

    // Fade in the selected elements (for simple animations)
    fadeIn(duration: number = 400): this {
        this.elements.forEach(el => {
            el.style.opacity = "0";
            el.style.display = "block";
            let last = +new Date();
            const tick = () => {
                el.style.opacity = (parseFloat(el.style.opacity) + (new Date().getTime() - last) / duration).toString();
                last = +new Date();
                if (parseFloat(el.style.opacity) < 1) {
                    requestAnimationFrame(tick);
                }
            };
            tick();
        });
        return this;
    }

    // Fade out the selected elements
    fadeOut(duration: number = 400): this {
        this.elements.forEach(el => {
            el.style.opacity = "1";
            let last = +new Date();
            const tick = () => {
                el.style.opacity = (parseFloat(el.style.opacity) - (new Date().getTime() - last) / duration).toString();
                last = +new Date();
                if (parseFloat(el.style.opacity) > 0) {
                    requestAnimationFrame(tick);
                } else {
                    el.style.display = "none";
                }
            };
            tick();
        });
        return this;
    }

    // Get parent elements of each selected element
    parent(): Core {
        const parents = this.elements.map(el => el.parentElement).filter(el => el) as HTMLElement[];
        return new Core(parents);
    }

    // Get children elements of each selected element
    children(): Core {
        const children = this.elements.reduce((acc, el) => {
            return acc.concat(Array.from(el.children) as HTMLElement[]);
        }, [] as HTMLElement[]);
        return new Core(children);
    }

    // Find descendant elements that match a selector within each selected element
    find(selector: string): Core {
        const foundElements = this.elements.reduce((acc, el) => {
            return acc.concat(Array.from(el.querySelectorAll(selector)) as HTMLElement[]);
        }, [] as HTMLElement[]);
        return new Core(foundElements);
    }

    // Get next sibling elements
    next(): Core {
        const nextSiblings = this.elements.map(el => el.nextElementSibling).filter(el => el) as HTMLElement[];
        return new Core(nextSiblings);
    }

    // Get previous sibling elements
    prev(): Core {
        const previousSiblings = this.elements.map(el => el.previousElementSibling).filter(el => el) as HTMLElement[];
        return new Core(previousSiblings);
    }

    // Replace the content of the selected elements
    replaceWith(content: string | HTMLElement): this {
        this.elements.forEach(el => {
            if (typeof content === "string") {
                el.outerHTML = content;
            } else {
                el.replaceWith(content);
            }
        });
        return this;
    }

    // Clone the selected elements
    clone(): Core {
        const clones = this.elements.map(el => el.cloneNode(true) as HTMLElement);
        return new Core(clones);
    }

    // Trigger a custom event on the selected elements
    trigger(eventType: string, data?: any): this {
        const event = new CustomEvent(eventType, { detail: data });
        this.elements.forEach(el => el.dispatchEvent(event));
        return this;
    }

    // Bind data to the elements, storing in a custom attribute
    data(key: string, value?: any): this | string | null {
        if (value === undefined) {
            return this.elements.length ? this.elements[0].getAttribute(`data-${key}`) : null;
        }
        this.elements.forEach(el => el.setAttribute(`data-${key}`, JSON.stringify(value)));
        return this;
    }

    // Get or set the value of form elements
    val(value?: string): this | string | null {
        if (value === undefined) {
            // If there is an element and it is a form element, return its current value
            if (
                this.elements.length &&
                (this.elements[0] instanceof HTMLInputElement ||
                    this.elements[0] instanceof HTMLTextAreaElement ||
                    this.elements[0] instanceof HTMLSelectElement)
            ) {
                return this.elements[0].value;
            }
            return null; // Return null if no form element is found
        }

        // If a value is provided, set it for each form element
        this.elements.forEach(el => {
            if (
                el instanceof HTMLInputElement ||
                el instanceof HTMLTextAreaElement ||
                el instanceof HTMLSelectElement
            ) {
                el.value = value;
            }
        });
        return this;
    }
}
