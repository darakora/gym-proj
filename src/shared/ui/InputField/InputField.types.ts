export const Strength = {
  Light: 'light',
  Medium: 'medium',
  High: 'high'
} as const;

export type PasswordStrength = (typeof Strength)[keyof typeof Strength];
