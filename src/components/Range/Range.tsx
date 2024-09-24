import React, {InputHTMLAttributes} from 'react';
import clsx from "clsx";

import './Range.css'


interface RangeProps extends InputHTMLAttributes<HTMLInputElement>{
    full?: boolean
}

export function Range(props: RangeProps) {
    return (
        <input
            {...props}
            type='range'
            className={clsx('input-range', {full: props.full}, props.className)}
            min={props.min}
            max={props.max}
        />
    );
}

