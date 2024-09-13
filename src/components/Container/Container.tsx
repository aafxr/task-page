import React, {HTMLAttributes} from 'react';


interface ContainerProps extends HTMLAttributes<HTMLDivElement>{}


export function Container(props : ContainerProps) {
    return (
        <div className='container'>{
            props.children
        }</div>
    );
}
