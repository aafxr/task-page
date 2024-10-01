import clsx from "clsx";
import React from 'react';
import {useNavigate} from "react-router-dom";

import {BXContact} from "../../classes/BXContact";
import {Block} from "../Block";

import './ContactPreview.css'


type ContactPreviewProps = {
    className?: string
    contact: BXContact
    to?: string
}


export function ContactPreview({contact, className, to}: ContactPreviewProps) {
    const navigate = useNavigate()


    function handleClick(){
        if(to) navigate(to)
    }


    return (
        <Block className={clsx('contact', className)} onClick={handleClick}>
            <div className='contact-name'>{`${contact.LAST_NAME} ${contact.NAME}`}</div>
            {contact.PHONE.length > 0 && contact.PHONE.map(p => (
                <a className='contact-phone' href={`tel:${p.VALUE}`} onClick={e => e.stopPropagation()}>{p.VALUE}</a>
            ))}
        </Block>
    );
}

