import React, {PropsWithChildren} from 'react';
import clsx from "clsx";

import './Block.css'


interface BlockProps extends PropsWithChildren{
    className?: string
}



export function Block({className, children} : BlockProps) {
    return (
        <div className={clsx('block', className)}>{children}</div>
    );
}

