import React from 'react';
import clsx from "clsx";



interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onClose?: () => void;
}


export function Modal(props: ModalProps) {

    function handleContentClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        props.onClick && props.onClick(e);
    }


    if (props.open === false) return null


    return (
        <div className='modal'>
            <div className='modal-back' onClick={props.onClose}/>
            <div className={clsx('modal-content', props.className)} onClick={handleContentClick}>{props.children}</div>
        </div>
    );
}

