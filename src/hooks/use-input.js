import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  let errorInfo = "";
  let valueIsValid = true;

  for (const key in validateValue) {
    valueIsValid = true;
    let validationFunc = validateValue[key];
    valueIsValid = validationFunc(enteredValue);
    if (!valueIsValid) {
      errorInfo = key;
      break;
    }
  }

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    errorInfo,
  };
};

export default useInput;
