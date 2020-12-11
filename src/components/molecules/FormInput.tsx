import React, { FC } from 'react';

type Props = {
  name: string;
  type: string;
  handleChange: () => void;
  value: string;
  label: string;
  required?: boolean;
};

const FormInput: FC<Props> = ({
  name = '',
  type = '',
  handleChange = () => undefined,
  value = '',
  label = '',
  required = undefined,
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      required={required}
    />
  </>
);

export default FormInput;
