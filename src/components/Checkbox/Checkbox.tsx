import React from 'react';
import clsx from "clsx";

import './Checkbox.css'
import {Text} from "../Text";

interface BitrixCheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean
    label?: string
}


export const Checkbox = ({ checked = false, onChange, label = '', className = '', ...rest }: BitrixCheckboxProps) => {
    return (
        <label className={clsx('bx-checkbox', className)}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="bx-checkbox-input"
                {...rest}
            />
            <Text className="bx-checkbox-label">{label}</Text>
        </label>
    );
};