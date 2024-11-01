// src/form/Form.ts
import { Core } from '../core/Core';

export class Form extends Core {
    constructor(selector: string | HTMLElement) {
        super(selector);
    }

    // Récupère les valeurs du formulaire sous forme d'objet clé-valeur
    getValues(): { [key: string]: any } {
        const values: { [key: string]: any } = {};
        this.elements.forEach(form => {
            if (form instanceof HTMLFormElement) {
                new FormData(form).forEach((value, key) => {
                    values[key] = value;
                });
            }
        });
        return values;
    }

    // Définit les valeurs du formulaire à partir d'un objet
    setValues(values: { [key: string]: any }): this {
        this.elements.forEach(form => {
            if (form instanceof HTMLFormElement) {
                Object.entries(values).forEach(([key, value]) => {
                    const input = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
                    if (input) input.value = String(value);
                });
            }
        });
        return this;
    }

    // Ajoute des validations personnalisées aux champs
    validate(rules: { [key: string]: (value: string) => boolean | string }): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        this.elements.forEach(form => {
            if (form instanceof HTMLFormElement) {
                Object.keys(rules).forEach(fieldName => {
                    const input = form.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
                    if (input) {
                        const rule = rules[fieldName];
                        const result = rule(input.value);
                        if (result !== true) {
                            errors[fieldName] = typeof result === "string" ? result : `Invalid value for ${fieldName}`;
                        }
                    }
                });
            }
        });
        return errors;
    }

    // Soumet les données du formulaire via Fetch API
    async submit(url: string, method: 'POST' | 'GET' = 'POST'): Promise<Response> {
        const formData = new FormData();
        this.elements.forEach(form => {
            if (form instanceof HTMLFormElement) {
                new FormData(form).forEach((value, key) => {
                    formData.append(key, value);
                });
            }
        });

        const options: RequestInit = {
            method,
            body: method === 'POST' ? formData : undefined,
        };

        const queryParams = method === 'GET' ? `?${new URLSearchParams(formData as any).toString()}` : '';
        return fetch(`${url}${queryParams}`, options);
    }
}
