import {useCallback, useEffect, MouseEvent, HTMLAttributes} from 'react';
import clsx from "clsx";


interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onClose?: () => void;
}


export function Modal(props: ModalProps) {
    const {onClose, open} = props


    const handleKeyPres = useCallback((e: KeyboardEvent) => {
        if (!onClose || !open) return
        const {key} = e
        if (key === 'Escape' || key === 'enter') onClose()
    }, [onClose, open])


    useEffect(() => {
        document.addEventListener('keydown', handleKeyPres)
        return () => {
            document.removeEventListener('keydown', handleKeyPres)
        }
    }, [handleKeyPres]);


    function handleContentClick(e: MouseEvent<HTMLDivElement>) {
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

