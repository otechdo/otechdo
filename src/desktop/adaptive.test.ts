// src/desktop/desktop.test.ts

import { Adaptive } from "./Adaptive";

describe("Adaptive", () => {
    let adaptive: Adaptive;

    beforeEach(() => {
        adaptive = new Adaptive();
    });

    it("should apply styles based on DPI scaling", () => {
        const mockStyles = {
            "1": { "--font-size": "14px" },
            "2": { "--font-size": "16px" }
        };

        Object.defineProperty(window, "devicePixelRatio", { writable: true, value: 2 });
        adaptive.adaptDpi(mockStyles);

        expect(document.documentElement.style.getPropertyValue("--font-size")).toBe("14px");
    });
});
