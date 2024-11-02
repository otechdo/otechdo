import { Otechdo } from "../otechdo";

declare global {
    /**
     * Select an element on success
     * to manipulate it
     *
     * @param selector `string`
     * @returns `Otechdo` instance
     */
    export function o(selector: string): Otechdo;

    /**
     * Manipulate the element passed in parameter
     *
     * @param e `HTMLElement` - The element to manipulate
     * @returns `Otechdo` instance
     */
    export function app(e: HTMLElement): Otechdo;
}
