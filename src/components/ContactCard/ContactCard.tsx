import clsx from "clsx";
import React, {Fragment} from 'react';
import {BXContact} from "../../classes/BXContact";

import './ContactCard.css'

interface ContactCardProps{
    contact: BXContact
    className?: string

}
export function ContactCard({contact, className}: ContactCardProps) {
    return (
        <div className={clsx('contact contact-container', className)}>
            <div className='contact-name'>{`${contact.NAME} ${contact.LAST_NAME}`}</div>
            <div className='contact-position'>{contact.POST}</div>
            <ul className='contact-contacts'>
                {contact.PHONE.map((p, i, arr) => (
                    <li key={p.ID}>
                        <a href={`tel:+${p.VALUE.replaceAll(/\D/g, '')}`} >{p.VALUE}</a>
                    </li>
                ))}
                {contact.EMAIL.map((p, i, arr) => (
                    <li key={p.ID}>
                        <a href={`mailto:${p.VALUE}`}>{p.VALUE}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

