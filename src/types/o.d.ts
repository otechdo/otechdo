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
}
