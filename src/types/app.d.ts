import {Otechdo} from "../otechdo";
declare global {
    /**
     *
     * Manipulate the element passed in parameter
     *
     * @param e `HTMLElement`
     */
    export function app(e:HTMLElement): Otechdo;
}
