import { useState, useCallback } from 'react';

export function useValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      event.target.setCustomValidity(validName(value));
    } else if (name === 'email') {
      event.target.setCustomValidity(validEmail(value));
    } else if (name === 'password') {
      event.target.setCustomValidity(validPassword(value));
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}


export const validEmail = email => {
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return 'Введите Email';
  } else if (!emailReg.test(email)) {
    return 'Некорректный формат Email';
  } else {
    return '';
  }
};
export const validName = name => {
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  if (!name) {
    return 'Введите имя';
  } else if (name.length < 2) {
    return 'Длина имени минимум 2 символа';
  } else if (name.length > 30) {
    return 'Длина имени максимум 30 символов';
  } else if (!namePattern.test(name)) {
    return 'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
  }
  return '';
};

export const validPassword = password => {
  if (!password) {
    return 'Введите пароль';
  }
  return '';
};
