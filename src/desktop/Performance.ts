// src/desktop/Performance.ts
export class Performance {
    elements: HTMLElement[];

    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    monitorCPU(settings: { onHighUsage: () => void, threshold: number }): this {
        let usage = 0;
        const checkCPUUsage = () => {
            usage = Math.random() * 100; // Simuler l'utilisation du CPU
            if (usage > settings.threshold) {
                settings.onHighUsage();
            }
            requestAnimationFrame(checkCPUUsage);
        };
        checkCPUUsage();
        return this;
    }
}
