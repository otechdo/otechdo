import { Otechdo } from "../otechdo";

declare global {
    /**
     * Manipulate the element passed in parameter
     *
     * @param e `HTMLElement` - The element to manipulate
     * @returns `Otechdo` instance
     */
    export function app(e: HTMLElement): Otechdo;
}
