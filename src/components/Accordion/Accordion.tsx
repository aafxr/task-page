import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import clsx from "clsx";

import './Accordion.css'


interface AccordionProps extends PropsWithChildren {
    open?: boolean
    onChange?: (open: boolean) => unknown
    title?: string
    className?: string
}


export function Accordion({open = false, onChange, className, title = '', children}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const content = useRef<HTMLDivElement>(null)


    useEffect(() => {
        setIsOpen(open)
    }, [open]);


    function handleClick() {
        const s = !isOpen
        setIsOpen(s)
        onChange?.(s)

        if(content.current){
            content.current.style.maxHeight = s
                ?  content.current.scrollHeight + 'px'
                : '0'
        }
    }


    return (
        <div className={clsx('accordion', {open: isOpen}, className)}>
            <div className='accordion-title' onClick={handleClick}>{title}</div>
            <div ref={content} className='accordion-content'>{children}</div>
        </div>
    );
}

