// src/ui/__tests__/Button.test.ts

import { Button } from '../Button';

describe('Button class', () => {
    let button: Button;

    beforeEach(() => {
        button = new Button({
            label: 'Click Me',
            className: 'btn-primary',
            width: 120,
            height: 50,
            onClick: jest.fn(),
            onHoverStart: jest.fn(),
            onHoverEnd: jest.fn(),
        });
    });

    test('should render button with correct label and class name', () => {
        const elem = button.render();
        expect(elem.textContent).toContain('Click Me');
        expect(elem.className).toBe('btn-primary');
    });

    test('should apply correct width and height styles', () => {
        const elem = button.render();
        expect(elem.style.width).toEqual('120px');
        expect(elem.style.height).toEqual('50px');
    });

    test('should call onClick when button is clicked', () => {
        const onClickMock = button.render().onclick = jest.fn();
        button.render().click();
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test('should trigger hover events correctly', () => {
        const elem = button.render();

        // Simule l'événement de survol
        elem.dispatchEvent(new Event('mouseenter'));
        expect(button['props'].onHoverStart).toHaveBeenCalled();

        // Simule l'événement de sortie
        elem.dispatchEvent(new Event('mouseleave'));
        expect(button['props'].onHoverEnd).toHaveBeenCalled();
    });

    test('should refresh button with new properties', () => {
        button.refresh({ label: 'Updated Label', className: 'btn-secondary', width: 150, height: 60 });
        const elem = button.render();

        expect(elem.textContent).toContain('Updated Label');
        expect(elem.className).toBe('btn-secondary');
        expect(elem.style.width).toBe('150px');
        expect(elem.style.height).toBe('60px');
    });

    test('should add icon and place it correctly', () => {
        button = new Button({
            label: 'Button with Icon',
            icon: '/path/to/icon.png',
            iconPosition: 'left',
            className: 'btn-icon',
        });
        const elem = button.render();

        const img = elem.querySelector('img');
        expect(img).not.toBeNull();
        expect(img!.src).toContain('/path/to/icon.png');
        expect(img!.nextSibling?.textContent).toContain('Button with Icon');
    });

    test('should update icon on refresh', () => {
        button = new Button({ label: 'Button', icon: '/path/to/initial-icon.png' });
        button.refresh({ icon: '/path/to/new-icon.png' });
        const img = button.render().querySelector('img');
        expect(img).not.toBeNull();
        expect(img!.src).toContain('/path/to/new-icon.png');
    });
});
