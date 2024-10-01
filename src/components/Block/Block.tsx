import React, {HTMLAttributes} from 'react';
import clsx from "clsx";

import './Block.css'


interface BlockProps extends HTMLAttributes<HTMLDivElement>{
}



export function Block({className, children, ...rest} : BlockProps) {
    return (
        <div {...rest} className={clsx('block', className)}>{children}</div>
    );
}

