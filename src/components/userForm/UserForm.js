import React, { useState } from "react";
import validator from "validator";
import useInput from "../../hooks/use-input";
import * as emailjs from "emailjs-com";

const UserForm = () => {
  const [submitClicked, setSubmitClicked] = useState(false);

  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    isValid: enteredFirstNameIsValid,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
    errorInfo: firstNameError,
  } = useInput({
    "Input must contain only alphabet letters": (value) => {
      if (!/^[A-Za-z]*$/.test(value)) {
        return false;
      } else return true;
    },
    "Input must be minimum 2 characters": (value) => value.length >= 2,
  });

  const {
    value: enteredLastName,
    hasError: lastNameInputHasError,
    isValid: enteredLastNameIsValid,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
    errorInfo: lastNameError,
  } = useInput({
    "Input must be minimum 2 characters": (value) => value.length >= 2,
    "Input must contain only alphabet letters": (value) =>
      /^[a-zA-Z]+$/.test(value),
  });

  const {
    value: enteredPhone,
    hasError: phoneInputHasError,
    isValid: enteredPhoneIsValid,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
    errorInfo: phoneError,
  } = useInput({
    "Phone number must be exactly 10 digits": (value) => value.length === 10,
  });

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    errorInfo: emailError,
  } = useInput({
    "Input must not be empty": (value) => value.trim() !== "",
    "Email format must be user@gmail.com/co.il": (value) =>
      validator.isEmail(value) &&
      (value.endsWith("@gmail.com") || value.endsWith("@gmail.co.il")),
  });

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredPhoneIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      sendEmail({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        phone: enteredPhone,
        email: enteredEmail,
      });

      resetFirstNameInput();
      resetLastNameInput();
      resetPhoneInput();
      resetEmailInput();
      setSubmitClicked(false);
    }
  };

  const sendEmail = (variables) => {
    emailjs
      .send(
        "service_2n75mz9",
        "template_q22g7ou",
        variables,
        "BSp4eVUFUwieH2A-i"
      )
      .then(
        (result) => {
          alert("Data sent successfully ");
        },
        (error) => {
          alert("Uh oh something went wrong, mail didn't send");
        }
      );
  };

  return (
    <div className="container">
      <div className="contact-box">
        <div className="left"></div>
        <div className="right">
          <h1 className="formHeader"> Jones Form </h1>
          <form onSubmit={formSubmissionHandler}>
            <label htmlFor="firstName">First name:</label>
            <input
              className="field"
              type="text"
              id="firstName"
              value={enteredFirstName}
              onChange={firstNameChangedHandler}
              onBlur={firstNameBlurHandler}
            />
            {((!formIsValid && submitClicked) || firstNameInputHasError) && (
              <p className="error-text">{firstNameError}</p>
            )}
            <label htmlFor="lastName">Last name:</label>
            <input
              className="field"
              type="text"
              id="lastName"
              value={enteredLastName}
              onChange={lastNameChangedHandler}
              onBlur={lastNameBlurHandler}
            />
            {(lastNameInputHasError || (!formIsValid && submitClicked)) && (
              <p className="error-text">{lastNameError}</p>
            )}
            <label htmlFor="email">Email:</label>
            <input
              className="field"
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
            />
            {(emailHasError || (!formIsValid && submitClicked)) && (
              <p className="error-text">{emailError}</p>
            )}
            <label htmlFor="phone">Phone number:</label>
            <input
              className="field"
              type="number"
              id="phone"
              value={enteredPhone}
              onChange={phoneChangedHandler}
              onBlur={phoneBlurHandler}
            />
            {(phoneInputHasError || (!formIsValid && submitClicked)) && (
              <p className="error-text">{phoneError}</p>
            )}
            <button
              className="btn"
              onClick={() => {
                setSubmitClicked(true);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
