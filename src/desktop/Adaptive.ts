// src/desktop/Adaptive.ts

/**
 * Adaptive class for desktop environments.
 * Handles screen resolution and DPI scaling adjustments.
 */
export class Adaptive {
    screenResolution: { width: number; height: number };
    dpiScale: number;

    constructor() {
        this.screenResolution = { width: window.screen.width, height: window.screen.height };
        this.dpiScale = window.devicePixelRatio;
    }

    /**
     * Adjusts application layout based on screen resolution.
     * Applies different layouts for various resolution ranges.
     * @param layouts - Object with layout adjustments for specific screen resolutions.
     */
    adaptResolution(layouts: { [resolution: string]: () => void }) {
        const resolutionKey = `${this.screenResolution.width}x${this.screenResolution.height}`;
        if (layouts[resolutionKey]) {
            layouts[resolutionKey]();
        }
    }

    /**
     * Applies styles based on DPI scaling, useful for high-density displays.
     * @param styles - Object with styles for various DPI scales.
     */
    adaptDpi(styles: { [scale: string]: { [key: string]: string | number } }) {
        const scaleKey = `${this.dpiScale}`;
        const appliedStyles = styles[scaleKey] || {};
        Object.entries(appliedStyles).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value as string);
        });
    }
}
