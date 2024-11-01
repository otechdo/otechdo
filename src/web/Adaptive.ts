// src/web/Adaptive.ts
export class Adaptive {
    elements: HTMLElement[];

    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    ambientLightAdaptation(settings: { lowLightMode: boolean, highContrastInDark: boolean }): this {
        if ('AmbientLightSensor' in window) {
            try {
                const sensor = new (window as any).AmbientLightSensor();
                sensor.onreading = () => {
                    this.elements.forEach(el => {
                        if (sensor.illuminance < 10 && settings.highContrastInDark) {
                            el.style.filter = "contrast(150%)";
                        } else if (sensor.illuminance > 10 && settings.lowLightMode) {
                            el.style.filter = "brightness(120%)";
                        }
                    });
                };
                sensor.start();
            } catch (error) {
                console.warn("AmbientLightSensor not supported on this device.");
            }
        }
        return this;
    }
}
