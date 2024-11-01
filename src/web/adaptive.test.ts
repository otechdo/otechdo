// src/web/adaptive.test.ts
import { Adaptive } from "./Adaptive";

// Helper function to create mock elements
function createMockElement(id: string): HTMLElement {
    const element = document.createElement("div");
    element.id = id;
    document.body.appendChild(element);
    return element;
}

// Helper functions to set and reset innerWidth and innerHeight
function setWindowDimensions(width: number, height: number) {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
}

describe("Adaptive class", () => {
    let element: HTMLElement;
    let adaptive: Adaptive;

    beforeEach(() => {
        element = createMockElement("test-element");
        adaptive = new Adaptive([element]);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    describe("resizeAdaptation", () => {
        it("should apply styles based on width breakpoints", () => {
            const breakpoints = {
                768: { fontSize: "14px" },
                1024: { fontSize: "16px" }
            };

            setWindowDimensions(800, 600); // Simulate window width
            adaptive.resizeAdaptation(breakpoints);
            window.dispatchEvent(new Event("resize"));

            expect(element.style.fontSize).toBe("14px");

            setWindowDimensions(1080, 600); // Simulate larger width
            window.dispatchEvent(new Event("resize"));

            expect(element.style.fontSize).toBe("16px");
        });
    });

    describe("orientationAdaptation", () => {
        it("should apply landscape styles when in landscape mode", () => {
            const styles = {
                landscape: { fontSize: "18px" },
                portrait: { fontSize: "14px" }
            };

            setWindowDimensions(1200, 800); // Simulate landscape orientation
            adaptive.orientationAdaptation(styles);
            window.dispatchEvent(new Event("resize"));

            expect(element.style.fontSize).toBe("18px");
        });

        it("should apply portrait styles when in portrait mode", () => {
            const styles = {
                landscape: { fontSize: "18px" },
                portrait: { fontSize: "14px" }
            };

            setWindowDimensions(800, 1200); // Simulate portrait orientation
            adaptive.orientationAdaptation(styles);
            window.dispatchEvent(new Event("resize"));

            expect(element.style.fontSize).toBe("14px");
        });
    });
});