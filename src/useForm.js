export function useForm({ validations }) {
  if (!validations) {
    throw new Error('the option `validations` is required');
  }

  if (typeof validations !== 'object') {
    throw new Error('the option `validations` should be an object');
  }

  function validateField(name, value) {
    // get the validation rules for the field
    const rules = validations[name];

    // check if the rules exist, since a field can not have validations
    if (rules) {
      // if the required rule is registered
      if (rules.required) {
        // now we validate the value checking if it has a value
        // we are using trim, to strip whitespaces before and after the value
        if (!value.trim()) {
          return typeof rules.required === 'string' ? rules.required : 'required';
        }
      }

      // if the pattern rule is registered
      if (rules.pattern) {
        // we execute the regex
        if (!new RegExp(rules.pattern.value).exec(value)) {
          // if the value does not match with the regex pattern, we try to return
          // the custom message and fallback to the default message in case
          return rules.pattern.message || 'invalid';
        }
      }
    }

    // if there are no erros, we return an empty string
    return '';
  }

  return {
    validateField,
  };
}
