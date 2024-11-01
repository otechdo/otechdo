// src/core/__tests__/Core.test.ts

import { Core } from '../Core';

describe('Core class', () => {
    let core: Core;

    beforeEach(() => {
        core = new Core(document.createElement("div"));
    });

    test("should create a div inside a div using append", () => {
        const childDiv = document.createElement("div");
        expect(core.append(childDiv).html().children.length).toBe(1);
        expect(core.html().children[0]).toBe(childDiv);
    });

    test("should prepend a div inside a div", () => {
        const firstChild = document.createElement("div");
        firstChild.className = "first-child";
        const secondChild = document.createElement("div");
        secondChild.className = "second-child";
        core.append(secondChild);
        core.prepend(firstChild);
        expect(core.html().children.length).toBe(2);
        expect(core.html().children[0]).toBe(firstChild);
        expect(core.html().children[1]).toBe(secondChild);
    });

    test("should replace the content of the element", () => {
        const replacementDiv = document.createElement("div");
        replacementDiv.className = "replacement-div";
        core.replace(replacementDiv);
        expect(core.html()).toBe(replacementDiv);
    });

    test("should remove the element from the DOM", () => {
        document.body.appendChild(core.html());
        expect(document.body.contains(core.html())).toBe(true);
        core.remove();
        expect(document.body.contains(core.html())).toBe(false);
    });

    test("should clone the element with its content", () => {
        const childDiv = document.createElement("div");
        childDiv.className = "child-div";
        core.append(childDiv);
        // Clone l'élément principal avec l'enfant
        const cloneCore = core.clone();

        // Vérifie que le clone a le même contenu et n'est pas le même objet
        expect(cloneCore.html().isEqualNode(core.html())).toBe(true);
        expect(cloneCore.html()).not.toBe(core.html());
    });
});
