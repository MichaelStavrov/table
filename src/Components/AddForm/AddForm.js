import { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import s from "./AddForm.module.css";
import { Button } from "../Button/Button";

export function AddForm({ setData }) {
  const [values, setValues] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidId, setInvalidId] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [existingId, setExistingId] = useState(false);

  const emailValidation = useMemo(() => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  }, []);

  const phoneValidation = useMemo(() => {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  }, []);

  useEffect(() => {
    if (Object.values(values).every((el) => el !== "")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (!new RegExp(emailValidation).test(values.email)) {
      setDisabled(true);
    } else {
      setInvalidEmail(false);
    }
    if (!new RegExp(phoneValidation).test(values.phone)) {
      setDisabled(true);
    } else {
      setInvalidPhone(false);
    }
  }, [values, setInvalidEmail, emailValidation, phoneValidation]);

  function handleSubmit(e) {
    e.preventDefault();
    setData((prev) => {
      if (!prev.find((item) => item.id === values.id)) {
        return [values, ...prev];
      } else {
        setExistingId(true);
        setTimeout(() => {
          setExistingId(false);
        }, 3000);
        return prev;
      }
    });
  }

  function handleInputEmailBlur() {
    if (!new RegExp(emailValidation).test(values.email)) {
      setInvalidEmail(true);
    }
  }

  function handleInputPhoneBlur() {
    if (!new RegExp(phoneValidation).test(values.phone)) {
      setInvalidPhone(true);
    }
  }

  function handleInputChange(e) {
    let { name, value } = e.target;
    if (name === "id") {
      value = +value;
      if (new RegExp(/[^\d]/g).test(value)) {
        setInvalidId(true);
        setTimeout(() => {
          setInvalidId(false);
        }, 3000);
        return;
      }
    }
    if (
      name === "firstName" &&
      !new RegExp(/^$|^[a-zA-ZА-Яа-яЁё\s]+$/).test(value)
    ) {
      setInvalidFirstName(true);
      setTimeout(() => {
        setInvalidFirstName(false);
      }, 3000);
      return;
    }
    if (
      name === "lastName" &&
      !new RegExp(/^$|^[a-zA-ZА-Яа-яЁё\s]+$/).test(value)
    ) {
      setInvalidLastName(true);
      setTimeout(() => {
        setInvalidLastName(false);
      }, 3000);
      return;
    }

    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.inputsField}>
        <label className={s.label} htmlFor="id">
          <span className={s.inputTitle}>id</span>
          <div className={s.inputWrap}>
            <input
              className={cn(s.input, s.inputId)}
              type="text"
              value={values.id}
              onChange={handleInputChange}
              autoComplete="off"
              name="id"
              id="id"
            />
          </div>
          {invalidId && <div className={s.invalidMessage}>Только цифры!</div>}
        </label>
        <label className={s.label} htmlFor="firstName">
          <span className={s.inputTitle}>firstName</span>

          <div className={s.inputWrap}>
            <input
              className={cn(s.input, s.inputFirstName)}
              type="text"
              value={values.firstName}
              onChange={handleInputChange}
              autoComplete="off"
              name="firstName"
              id="firstName"
            />
          </div>
          {invalidFirstName && (
            <div className={s.invalidMessage}>
              Только латинские буквы или кириллица!
            </div>
          )}
        </label>
        <label className={s.label} htmlFor="lastName">
          <span className={s.inputTitle}>lastName</span>
          <div className={s.inputWrap}>
            <input
              className={cn(s.input, s.inputLastName)}
              type="text"
              value={values.lastName}
              onChange={handleInputChange}
              autoComplete="off"
              name="lastName"
              id="lastName"
            />
          </div>
          {invalidLastName && (
            <div className={s.invalidMessage}>
              Только латинские буквы или кириллица!
            </div>
          )}
        </label>
        <label className={s.label} htmlFor="email">
          <span className={s.inputTitle}>email</span>

          <div className={s.inputWrap}>
            <input
              className={cn(s.input, s.inputEmail, {
                [s.warning]: invalidEmail,
              })}
              type="text"
              value={values.email}
              onChange={handleInputChange}
              onBlur={handleInputEmailBlur}
              autoComplete="off"
              name="email"
              id="email"
            />
          </div>
        </label>
        <label className={s.label} htmlFor="phone">
          <span className={s.inputTitle}>phone</span>

          <div className={s.inputWrap}>
            <input
              className={cn(s.input, s.inputPhone, {
                [s.warning]: invalidPhone,
              })}
              type="text"
              value={values.phone}
              onChange={handleInputChange}
              onBlur={handleInputPhoneBlur}
              autoComplete="off"
              name="phone"
              id="phone"
            />
          </div>
        </label>
      </div>
      <div className={s.warningMessage}>
        {existingId && (
          <div className={s.warningWindow}>
            В базе уже есть пользователь с таким Id!
          </div>
        )}
      </div>
      <div className={s.addBtn}>
        <Button type="submit" disabled={disabled}>
          Добавить в таблицу
        </Button>
      </div>
    </form>
  );
}
