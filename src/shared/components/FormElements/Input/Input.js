import React, { useReducer } from 'react';
import './Input.css';
import { inputReducer } from '../../../../services/reducers/inputReducer';
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });
  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };
  const element =
    props.element === 'input' ? (
      <input
        onChange={changeHandler}
        onBlur={touchHandler}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
      />
    ) : (
      <textarea
        onChange={changeHandler}
        onBlur={touchHandler}
        id={props.id}
        rows={props.rows || 3}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
