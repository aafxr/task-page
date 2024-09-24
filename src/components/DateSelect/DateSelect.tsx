import React, {InputHTMLAttributes} from 'react';
import clsx from "clsx";

import './DateSelect.css'

interface DateSelectProps extends InputHTMLAttributes<HTMLInputElement>{
    full?: boolean
}

export function DateSelect({full,...props}: DateSelectProps) {
    return (
        <input type='date' className={clsx('dateSelect', {full}, props.className)}/>
    );
}

