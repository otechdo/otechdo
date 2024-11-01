// src/desktop/desktop.test.ts

import { Performance } from "./Performance";

describe("Performance", () => {
    let performanceTracker: Performance;

    beforeEach(() => {
        performanceTracker = new Performance();
    });

    it("should track the execution time of a function", () => {
        const mockFunction = jest.fn();
        performanceTracker.trackFunction("mockFn", mockFunction);

        expect(performanceTracker.getAverageTime("mockFn")).toBeGreaterThan(0);
    });

    it("should calculate the average execution time", () => {
        const mockFunction = jest.fn(() => {
            for (let i = 0; i < 1e6; i++); // Simulate some work
        });

        performanceTracker.trackFunction("mockFn", mockFunction);
        performanceTracker.trackFunction("mockFn", mockFunction);

        const avgTime = performanceTracker.getAverageTime("mockFn");
        expect(avgTime).not.toBeNull();
        expect(avgTime).toBeGreaterThan(0);
    });

    it("should return null if no times are tracked for a function", () => {
        expect(performanceTracker.getAverageTime("nonExistentFn")).toBeNull();
    });
});
