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
    });
  });
});
