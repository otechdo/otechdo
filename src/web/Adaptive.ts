// src/web/Adaptive.ts

/**
 * Adaptive class provides methods to adapt UI elements based on device and environmental conditions.
 */
export class Adaptive {
    elements: HTMLElement[];

    /**
     * Initializes the Adaptive class with a set of elements.
     * @param elements - Array of HTMLElements to apply adaptive features to.
     */
    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    /**
     * Adjusts elements based on ambient light levels, if the device supports it.
     * @param settings - Object with settings for low light and high contrast modes.
     *    - `lowLightMode`: Enables increased brightness in low light conditions.
     *    - `highContrastInDark`: Enables high contrast when in very dark conditions.
     * @returns The Adaptive instance to allow chaining.
     */
    ambientLightAdaptation(settings: { lowLightMode: boolean; highContrastInDark: boolean }): this {
        if ("AmbientLightSensor" in window) {
            try {
                const sensor = new (window as any).AmbientLightSensor();
                sensor.onreading = () => {
                    this.elements.forEach(el => {
                        if (sensor.illuminance < 10 && settings.highContrastInDark) {
                            el.style.filter = "contrast(150%)"; // Increase contrast in dark settings
                        } else if (sensor.illuminance > 10 && settings.lowLightMode) {
                            el.style.filter = "brightness(120%)"; // Increase brightness in low light
                        } else {
                            el.style.filter = "none"; // Reset filter if conditions are not met
                        }
                    });
                };
                sensor.onerror = (event: Event) => {
                    console.warn("AmbientLightSensor error:", event);
                };
                sensor.start();
            } catch (error) {
                console.warn("AmbientLightSensor not supported on this device.");
            }
        } else {
            console.warn("AmbientLightSensor API is not available in this environment.");
        }
        return this;
    }

    /**
     * Adapts elements based on window resizing, useful for responsive adjustments.
     * Applies specific styles or classes when certain width thresholds are met.
     * @param breakpoints - Object with screen width thresholds and corresponding styles.
     * Example: { 768: { fontSize: "14px" }, 1024: { fontSize: "16px" } }
     * @returns The Adaptive instance to allow chaining.
     */
    resizeAdaptation(breakpoints: { [width: number]: { [style: string]: string | number } }): this {
        const applyStyles = () => {
            const width = window.innerWidth;
            for (const [breakpoint, styles] of Object.entries(breakpoints).sort((a, b) => Number(b[0]) - Number(a[0]))) {
                if (width >= Number(breakpoint)) {
                    this.elements.forEach(el => {
                        Object.assign(el.style, styles);
                    });
                    break;
                }
            }
        };

        applyStyles(); // Initial call on load
        window.addEventListener("resize", applyStyles); // Adapt on resize
        return this;
    }

    /**
     * Adjusts elements based on device orientation changes.
     * Adds specific styles or classes when in landscape or portrait mode.
     * @param styles - Object with "landscape" and "portrait" properties for style adjustments.
     * Example: { landscape: { fontSize: "18px" }, portrait: { fontSize: "14px" } }
     * @returns The Adaptive instance to allow chaining.
     */
    orientationAdaptation(styles: { landscape: { [style: string]: string | number }; portrait: { [style: string]: string | number } }): this {
        const applyOrientationStyles = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            const appliedStyles = isLandscape ? styles.landscape : styles.portrait;

            this.elements.forEach(el => {
                Object.assign(el.style, appliedStyles);
            });
        };

        applyOrientationStyles(); // Initial call on load
        window.addEventListener("orientationchange", applyOrientationStyles); // Adapt on orientation change
        window.addEventListener("resize", applyOrientationStyles); // Also respond to resize as orientationchange is not universally supported
        return this;
    }

    /**
     * Sets styles based on the device's dark or light mode preference.
     * Automatically detects and adjusts for dark mode or light mode.
     * @param darkModeStyles - Styles applied when the device is in dark mode.
     * @param lightModeStyles - Styles applied when the device is in light mode.
     * @returns The Adaptive instance to allow chaining.
     */
    colorSchemeAdaptation(darkModeStyles: { [style: string]: string | number }, lightModeStyles: { [style: string]: string | number }): this {
        const applyColorScheme = (e?: MediaQueryListEvent) => {
            const prefersDarkMode = e ? e.matches : window.matchMedia("(prefers-color-scheme: dark)").matches;
            const stylesToApply = prefersDarkMode ? darkModeStyles : lightModeStyles;

            this.elements.forEach(el => {
                Object.assign(el.style, stylesToApply);
            });
        };

        // Apply styles based on current color scheme
        applyColorScheme();
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", applyColorScheme); // Listen for color scheme changes
        return this;
    }
}
