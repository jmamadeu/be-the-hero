import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, ...rest }) {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <>
      {rest.type === 'textarea' ? (
        <textarea ref={inputRef} {...rest}></textarea>
      ) : (
        <>
          <input ref={inputRef} defaultValue={defaultValue} {...rest} />
          {error && <span style={{ color: '#f00' }}>{error}</span>}
        </>
      )}
    </>
  );
}

export default Input;
