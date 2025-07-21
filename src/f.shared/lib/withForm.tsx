/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback } from 'react';
import { useController, type UseControllerProps } from 'react-hook-form';

type TFormElementContainerProps<T> = UseControllerProps<any> &
  T & {
    trim?: boolean;
    onChange?: (value: any) => void;
  };

export const withForm = function <T>(
  Component: React.FunctionComponent<T>,
  formatValue: (params: {
    data: any;
    formattedValue?: string;
    trim?: boolean;
  }) => any = ({ data }) => data,
) {
  return function WithFormField({
    control,
    trim = true,
    ...props
  }: TFormElementContainerProps<T>) {
    const fieldState = useController({ control, name: props.name });

    const onChange = useCallback(
      (data: any, formattedValue?: string) => {
        const value = formatValue
          ? formatValue({ data, formattedValue, trim })
          : data;

        fieldState.field.onChange(value);
        if ((props as any).onChange) (props as any).onChange(value);
      },
      [fieldState.field.onChange, (props as any).onChange],
    );

    return (
      <Component
        {...(props as T)}
        error={fieldState.fieldState.error?.message}
        value={fieldState.field.value}
        onChange={onChange}
      />
    );
  };
};
