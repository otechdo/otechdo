import {Otechdo} from "../otechdo";
declare global {
    /**
     *
     * Select an element on success
     * to manipulate it
     *
     * @param selector `string`
     */
    export function o(selector:string): Otechdo;
}
