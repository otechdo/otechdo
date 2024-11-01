// src/form/__tests__/Form.test.ts
import { Form } from './Form';

// Simule le DOM pour Jest
document.body.innerHTML = `
    <form id="testForm">
        <input type="text" name="username" value="user123" />
        <input type="email" name="email" value="test@example.com" />
    </form>
`;

describe('Form', () => {
    let form: Form;

    beforeEach(() => {
        form = new Form('#testForm');
    });

    test('should retrieve form values correctly', () => {
        const values = form.getValues();
        expect(values).toEqual({
            username: 'user123',
            email: 'test@example.com'
        });
    });

    test('should set form values correctly', () => {
        form.setValues({
            username: 'newuser',
            email: 'new@example.com'
        });
        const values = form.getValues();
        expect(values.username).toBe('newuser');
        expect(values.email).toBe('new@example.com');
    });

    test('should validate fields based on rules', () => {
        const errors = form.validate({
            username: value => value.length >= 3 || "Username must be at least 3 characters",
            email: value => /^\S+@\S+\.\S+$/.test(value) || "Invalid email format"
        });
        expect(errors).toEqual({});
    });

    test('should return validation errors for invalid fields', () => {
        form.setValues({ username: 'ab', email: 'invalid-email' });
        const errors = form.validate({
            username: value => value.length >= 3 || "Username must be at least 3 characters",
            email: value => /^\S+@\S+\.\S+$/.test(value) || "Invalid email format"
        });
        expect(errors).toEqual({
            username: "Username must be at least 3 characters",
            email: "Invalid email format"
        });
    });
});
