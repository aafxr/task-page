import React, {ButtonHTMLAttributes} from 'react';
import clsx from "clsx";

import './Button.css'
import {Loader} from "../Loader";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    full?: boolean,
    loading?:boolean
}



export function Button(props: ButtonProps) {
    const cn = clsx(
        'btn',
        {full: props.full},
        props.className
    )

    return (
        <button {...props} className={cn}>
            {props.loading ? <Loader /> : props.children}
        </button>
    );
}

