// src/index-web.ts
import { Core } from './core/Core';
import { Events } from './web/Events';
import { Adaptive } from './web/Adaptive';

export default class Web {
    core = new Core([]);
    events = new Events([]) ;
    adaptive = new Adaptive([]);

    /**
     * Static `createElement` method to create HTML elements or dynamic components.
     * @param tag - Can be an HTML tag name (string) or a component function.
     * @param props - The properties of the element, including attributes, styles, and events.
     * @param children - The children of the element, which can include text, other elements, or components.
     * @returns HTMLElement | DocumentFragment - The created element.
     */
    static createElement(tag: string | Function, props: any = {}, ...children: any[]): HTMLElement {
        const element = typeof tag === 'function' ? tag(props) : document.createElement(tag);

        for (const prop in props) {
            if (prop.startsWith("on") && typeof props[prop] === "function") {
                element.addEventListener(prop.substring(2).toLowerCase(), props[prop]);
            } else if (prop === "style" && typeof props[prop] === "object") {
                Object.assign(element.style, props[prop]);
            } else if (prop === "className") {
                // Use `className` property directly on the element
                element.className = props[prop];
            } else {
                element.setAttribute(prop, props[prop]);
            }
        }

        children.flat().forEach(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                element.appendChild(document.createTextNode(child.toString()));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });

        return element;
    }

    /**
     * Static `Fragment` method to create fragments without a container.
     * Useful for grouping multiple elements without adding an extra div.
     * @param children - Child elements to include in the fragment.
     * @returns DocumentFragment - The fragment containing the child elements.
     */
    static Fragment = (...children: any[]): DocumentFragment => {
        const fragment = document.createDocumentFragment();
        children.forEach(child =>
            fragment.appendChild(child instanceof Node ? child : document.createTextNode(String(child)))
        );
        return fragment;
    };

    /**
     * Method to add global style to the page.
     * @param styles - A string of CSS styles to apply to the entire page.
     */
    static addGlobalStyle(styles: string) {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }
}
