import React, {PropsWithChildren} from 'react';
import clsx from "clsx";

import './ErrorMessageComponent.css'


interface ErrorMessageComponentProps extends PropsWithChildren{
    className?: string
    onClose?: () => unknown
}


export function ErrorMessageComponent({className, onClose, children}: ErrorMessageComponentProps) {
    return (
        <div className={clsx("message message-container", className)}>
            {!!onClose && <div className="message-close" onClick={onClose}/>}
            {children}
        </div>
    );
}

