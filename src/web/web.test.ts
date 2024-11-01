// src/web/core.test.ts
import { Core } from '../core/Core';
import { expect } from "@jest/globals";

describe('Core Class', () => {
    // Set up and tear down a DOM structure for testing
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="test-div" class="initial-class"></div>
            <input type="text" id="test-input" value="initial value" />
        `;
    });

    test('should apply CSS styles to elements', () => {
        const core = new Core('#test-div');
        core.css({ color: 'red', fontSize: '16px' });

        const element = document.getElementById('test-div');
        expect(element?.style.color).toBe('red');
        expect(element?.style.fontSize).toBe('16px');
    });

    describe('val method', () => {
        test('should get the value of an input element', () => {
            const core = new Core('#test-input');
            const value = core.val();

            expect(value).toBe('initial value');
        });

        test('should set the value of an input element', () => {
            const core = new Core('#test-input');
            core.val('new value');

            const input = document.getElementById('test-input') as HTMLInputElement;
            expect(input.value).toBe('new value');
        });

        test('should return null when no elements are matched', () => {
            const core = new Core('#nonexistent-element');
            const value = core.val();

            expect(value).toBeNull();
        });
    });
});
