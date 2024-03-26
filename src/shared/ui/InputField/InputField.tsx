import type React from 'react';
import { forwardRef } from 'react';

import classNames from 'classnames';

import inputFieldStyles from './InputField.module.scss';
import { type PasswordStrength } from './InputField.types';

export const InputField = forwardRef(
  (
    {
      label,
      id,
      error,
      shouldFitContainer,
      passwordStrength,
      ...inputProperties
    }: {
      error?: string;
      passwordStrength?: PasswordStrength | null;
      label: string;
      shouldFitContainer?: boolean;
    } & React.InputHTMLAttributes<HTMLInputElement>,
    reference: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div
        className={inputFieldStyles.container}
        style={shouldFitContainer ? { width: '100%' } : undefined}
      >
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          ref={reference}
          {...inputProperties}
        />
        {error && <div className={inputFieldStyles.error}>{error}</div>}
        {passwordStrength && (
          <div
            className={` ${classNames({
              [inputFieldStyles.password_check]: true,
              [inputFieldStyles[passwordStrength]]: true
            })}`}
          >
            Passwortstärke
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
