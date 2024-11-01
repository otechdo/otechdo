// src/desktop/desktop.test.ts

import { Events } from "./Events";

describe("Events", () => {
    let events: Events;

    beforeEach(() => {
        events = new Events();
    });

    it("should add a system-level event listener", () => {
        const callback = jest.fn();
        events.addSystemEvent("resize", callback);

        window.dispatchEvent(new Event("resize"));
        expect(callback).toHaveBeenCalled();
    });

    it("should remove a system-level event listener", () => {
        const callback = jest.fn();
        events.addSystemEvent("focus", callback);

        events.removeSystemEvent("focus");
        window.dispatchEvent(new Event("focus"));

        expect(callback).not.toHaveBeenCalled();
    });
});
