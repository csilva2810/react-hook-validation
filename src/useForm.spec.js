import { useForm } from './useForm';

describe('useForm', () => {
  describe('smoke tests', () => {
    it('should be a function', () => {
      expect(typeof useForm).toBe('function');
    });

    it('should require the `validations` option', () => {
      expect(() => {
        useForm({});
      }).toThrow('the option `validations` is required');
    });

    it('should require the validation option to be an object', () => {
      expect(() => {
        useForm({
          validations: true,
        });
      }).toThrow('the option `validations` should be an object');
    });
  });

  describe('validateField', () => {
    describe('required', () => {
      it("should return a default error message for fields that don't have a value", () => {
        const hook = useForm({
          validations: {
            name: {
              required: true,
            },
          },
        });

        expect(hook.validateField('name', '')).toBe('required');
      });

      it('should return a custom error message', () => {
        const hook = useForm({
          validations: {
            name: {
              required: 'the field "name" is required',
            },
          },
        });

        expect(hook.validateField('name', '')).toBe('the field "name" is required');
      });
    });

    describe('pattern', () => {
      it('should return an error message if the value does not satisfy the pattern', () => {
        const hook = useForm({
          validations: {
            email: {
              pattern: {
                value: /\w+@\w+\.com/gi,
              },
            },
          },
        });

        expect(hook.validateField('email', '')).toBe('invalid');
      });

      it('should return an custom error message if the message attribute exists', () => {
        const hook = useForm({
          validations: {
            email: {
              pattern: {
                value: /\w+@\w+\.com/gi,
                message: 'Invalid e-mail',
              },
            },
          },
        });

        expect(hook.validateField('email', '')).toBe('Invalid e-mail');
      });
    });
  });
});
