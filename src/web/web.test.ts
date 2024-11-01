import Web from "../index-web";

describe("Web.createElement", () => {
    test("should create a div element with text content", () => {
        const element = Web.createElement("div", { className: "test-div" }, "Hello, World!") as HTMLElement;
        expect(element.tagName).toBe("DIV");
        expect(element.className).toBe("test-div");
        expect(element.textContent).toBe("Hello, World!");
    });

    test("should create an element with inline styles", () => {
        const element = Web.createElement("p", { style: { color: "red" } }, "Styled Text") as HTMLElement;
        expect(element.style.color).toBe("red");
    });

    test("should create a fragment with multiple children", () => {
        const fragment = Web.Fragment(
            Web.createElement("p", null, "Child 1"),
            Web.createElement("p", null, "Child 2")
        ) as DocumentFragment;

        expect(fragment.childNodes.length).toBe(2);
        expect((fragment.childNodes[0] as HTMLElement).textContent).toBe("Child 1");
        expect((fragment.childNodes[1] as HTMLElement).textContent).toBe("Child 2");
    });

    test("should add global style", () => {
        Web.addGlobalStyle("body { background-color: black; }");
        const styles = Array.from(document.head.getElementsByTagName("style"));
        expect(styles.some(style => style.innerText.includes("background-color: black"))).toBe(true);
    });
});
