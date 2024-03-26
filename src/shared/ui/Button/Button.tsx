import { type PropsWithChildren } from 'react';

import classNames from 'classnames';

import buttonStyles from './Button.module.scss';
import { ButtonAppearance, type ButtonProperties } from './Button.types';

export const Button = ({
  appearance = ButtonAppearance.Primary,
  icon = null,
  shouldFitContainer,
  children,
  ...passThroughProperties
}: PropsWithChildren<ButtonProperties>) => {
  return (
    <button
      {...passThroughProperties}
      className={`${passThroughProperties.className || ''} ${classNames({
        [buttonStyles.btn]: true,
        [buttonStyles[appearance]]: true
      })}`}
      style={{
        ...passThroughProperties.style,
        width: shouldFitContainer ? '100%' : passThroughProperties.style?.width
      }}
    >
      {icon && <div className={buttonStyles.icon}>{icon}</div>}
      {children}
    </button>
  );
};
