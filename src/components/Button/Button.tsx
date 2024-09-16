import React, {HTMLAttributes} from 'react';
import clsx from "clsx";



interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    full?: boolean,
}



export function Button(props: ButtonProps) {
    const cn = clsx(
        'btn',
        {full: props.full},
        props.className
    )

    return (
        <button {...props} className={cn}>{props.children}</button>
    );
}

