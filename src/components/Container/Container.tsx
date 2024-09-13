import React, {HTMLAttributes} from 'react';
import clsx from "clsx";


interface ContainerProps extends HTMLAttributes<HTMLDivElement>{}


export function Container(props : ContainerProps) {
    return (
        <div {...props} className={clsx('container', props.className)}>{
            props.children
        }</div>
    );
}
