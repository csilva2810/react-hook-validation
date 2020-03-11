export function useForm({ validations }) {
  if (!validations) {
    throw new Error('the option `validations` is required');
  }

  if (typeof validations !== 'object') {
    throw new Error('the option `validations` should be an object');
  }

  function validateField(name, value) {}

  return {
    validateField,
  };
}
