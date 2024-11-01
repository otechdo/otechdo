// src/desktop/Adaptive.ts
export class Adaptive {
    elements: HTMLElement[];

    constructor(elements: HTMLElement[]) {
        this.elements = elements;
    }

    /**
     * Ajuste les animations et les effets visuels en fonction de l’utilisation du CPU.
     */
    adaptToCPU(settings: { highUsageThreshold: number, onHighUsage: () => void, onNormalUsage: () => void }): this {
        const monitorCPUUsage = () => {
            const cpuUsage = Math.random() * 100; // Simulation d'une valeur d'utilisation CPU
            if (cpuUsage > settings.highUsageThreshold) {
                settings.onHighUsage();
            } else {
                settings.onNormalUsage();
            }
            requestAnimationFrame(monitorCPUUsage);
        };
        monitorCPUUsage();
        return this;
    }

    /**
     * Active le mode économie d'énergie, avec prise en charge conditionnelle de l'API Batterie.
     * @param settings Configuration pour l'économie d'énergie
     */
    lowBatteryMode(settings: { batteryThreshold: number, onLowBattery: () => void, fallbackCheck?: () => boolean }): this {
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                const checkBatteryLevel = () => {
                    if (battery.level * 100 < settings.batteryThreshold) {
                        settings.onLowBattery();
                    }
                };
                checkBatteryLevel();
                battery.addEventListener("levelchange", checkBatteryLevel);
            });
        } else if (settings.fallbackCheck) {
            // En cas d'absence de l'API Batterie, utilisation d'une vérification de secours
            const fallbackInterval = setInterval(() => {
                if (settings.fallbackCheck!()) {
                    settings.onLowBattery();
                    clearInterval(fallbackInterval);
                }
            }, 60000); // Vérification toutes les 60 secondes
        } else {
            console.warn("La gestion de la batterie n'est pas supportée sur ce dispositif.");
        }
        return this;
    }

    /**
     * Active ou désactive des effets visuels comme les animations en fonction des préférences utilisateur.
     */
    reduceVisualEffects(reduceAnimations: boolean): this {
        this.elements.forEach(el => {
            el.style.transition = reduceAnimations ? "none" : "";
            el.style.animation = reduceAnimations ? "none" : "";
        });
        return this;
    }
}
