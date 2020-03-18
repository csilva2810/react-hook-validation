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

    describe('validate', () => {
      let validateMock;
      let hook;

      beforeEach(() => {
        validateMock = jest.fn((value) => {
          if (Number(value) < 18) {
            return 'You are not able to get a drive permission';
          }

          return '';
        });

        hook = useForm({
          validations: {
            age: {
              validate: validateMock,
            },
          },
        });
      });

      it('should execute the validate function passing the field value', () => {
        hook.validateField('age', '10');

        expect(validateMock).toHaveBeenCalledWith('10');
      });

      it('should be executed and return a string', () => {
        hook.validateField('age', '10');

        expect(validateMock).toHaveBeenCalled();
        expect(typeof validateMock.mock.results[0].value).toBe('string');
      });

      it('should return an error message', () => {
        hook.validateField('age', '10');

        expect(validateMock.mock.results[0].value).toBe('You are not able to get a drive permission');
      });

      it('should return an empty string when value is valid', () => {
        hook.validateField('age', '20');

        expect(validateMock.mock.results[0].value).toBe('');
      });
    });
  });
});
