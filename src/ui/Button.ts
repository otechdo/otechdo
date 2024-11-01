// src/ui/Button.ts
export class Button {
    private label: string;
    private onClick: () => void;

    constructor(label: string, onClick: () => void) {
        this.label = label;
        this.onClick = onClick;
    }

    render(): HTMLButtonElement {
        const button = document.createElement('button');
        button.innerText = this.label;
        button.addEventListener('click', this.onClick);
        return button;
    }
}
