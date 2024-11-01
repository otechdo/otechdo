// src/web/events.test.ts
import { Events } from "./Events";

// Helper function to create a mock element
function createMockElement(id: string): HTMLElement {
    const element = document.createElement("div");
    element.id = id;
    document.body.appendChild(element);
    return element;
}

describe("Events class", () => {
    let element: HTMLElement;
    let events: Events;

    beforeEach(() => {
        element = createMockElement("test-element");
        events = new Events([element]);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    describe("on and off", () => {
        it("should add and remove event listeners", () => {
            const callback = jest.fn();

            events.on("click", callback);
            element.click();
            expect(callback).toHaveBeenCalledTimes(1);

            events.off("click", callback);
            element.click();
            expect(callback).toHaveBeenCalledTimes(1); // Should not increase, as event listener is removed
        });
    });

    describe("once", () => {
        it("should only trigger the event once", () => {
            const callback = jest.fn();

            events.once("click", callback);
            element.click();
            element.click();

            expect(callback).toHaveBeenCalledTimes(1); // Callback should only be triggered once
        });
    });

    describe("trigger", () => {
        it("should manually trigger an event", () => {
            const callback = jest.fn();

            events.on("customEvent", callback);
            events.trigger("customEvent");

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should pass custom data with the triggered event", () => {
            const callback = jest.fn((e) => {
                expect(e.detail).toBeDefined();
                expect(e.detail).toEqual({ message: "hello" });
            });

            events.on("customEvent", callback);
            events.trigger("customEvent", { message: "hello" });

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe("delegate", () => {
        it("should delegate an event to a child element", () => {
            const child = document.createElement("div");
            child.className = "child";
            element.appendChild(child);

            const callback = jest.fn();
            events.delegate("click", ".child", callback);

            child.click();
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it("should not trigger the delegated event if a non-matching element is clicked", () => {
            const nonChild = document.createElement("div");
            element.appendChild(nonChild);

            const callback = jest.fn();
            events.delegate("click", ".child", callback);

            nonChild.click();
            expect(callback).not.toHaveBeenCalled(); // Callback should not be called
        });
    });
});
