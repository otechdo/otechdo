// src/desktop/Performance.ts

/**
 * Performance class for desktop environments.
 * Monitors CPU and memory usage, and tracks function execution times.
 */
export class Performance {
    private functionTimes: { [key: string]: number[] } = {};

    /**
     * Tracks the execution time of a function.
     * @param label - A unique label for the function being tracked.
     * @param fn - The function to measure.
     */
    trackFunction(label: string, fn: () => void): void {
        const startTime = performance.now();
        fn();
        const endTime = performance.now();
        if (!this.functionTimes[label]) {
            this.functionTimes[label] = [];
        }
        this.functionTimes[label].push(endTime - startTime);
    }

    /**
     * Returns the average execution time of a tracked function.
     * @param label - The label for the function being tracked.
     * @returns The average time in milliseconds, or null if no data is available.
     */
    getAverageTime(label: string): number | null {
        const times = this.functionTimes[label];
        if (!times || times.length === 0) return null;
        const total = times.reduce((acc, time) => acc + time, 0);
        return total / times.length;
    }
}
