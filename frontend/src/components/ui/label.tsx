import * as React from 'react';

export function Label({ className = '', children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium leading-none text-gray-700 select-none ${className}`} {...props}>
      {children}
    </label>
  );
}
