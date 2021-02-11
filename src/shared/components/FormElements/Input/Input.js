import React, { useReducer, useEffect } from 'react';
import './Input.css';
import { inputReducer } from '../../../../services/reducers/inputReducer';

const Input = ({
  id,
  onInput,
  validators,
  element,
  type,
  placeholder,
  rows,
  label,
  errorText,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false,
  });
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };
  const newElement =
    element === 'input' ? (
      <input
        onChange={changeHandler}
        onBlur={touchHandler}
        id={id}
        type={type}
        placeholder={placeholder}
        value={inputState.value}
      />
    ) : (
      <textarea
        onChange={changeHandler}
        onBlur={touchHandler}
        id={id}
        rows={rows || 3}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {newElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
