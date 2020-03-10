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
});
