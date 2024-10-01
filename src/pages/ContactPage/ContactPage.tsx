import React, {useEffect, useState} from 'react';
import {BXContact} from "../../classes/BXContact";
import {useParams} from "react-router-dom";

import {ContactService} from "../../services/ContactService";
import {useAppContext} from "../../context/AppContext";
import {Title} from "../../components/Title";
import {Block} from "../../components/Block";

import './ContactPage.css'

const UNSET = 'Не усьановлено'

export function ContactPage() {
    const s = useAppContext()
    const {taskID, contactID} = useParams()
    const [contact, setContact] = useState<BXContact | undefined>()


    useEffect(() => {
        const t = s.tasks.find(t => t.id === taskID)
        if(t){
            ContactService.getContacts(s,t)
                .then(cl => setContact(cl.find(c =>c.ID === contactID)))
                .catch(console.error)
        }
    }, [taskID, contactID]);


    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <Title>{`О контакте ${contact? '#' + contact.ID : ''}`}</Title>
            </div>
            <div className='wrapper-content'>
                <Block className="client client-container">
                    <div className="client-field">
                        <div className="client-field-descr">Фамилия</div>
                        <div className="client-field-val">{contact?.LAST_NAME || UNSET}</div>
                    </div>
                    <div className="client-field">
                        <div className="client-field-descr">Имя</div>
                        <div className="client-field-val">{contact?.NAME || UNSET}</div>
                    </div>
                    <div className="client-field">
                        <div className="client-field-descr">Должность</div>
                        <div className="client-field-val">{contact?.POST || UNSET}</div>
                    </div>
                    <div className="client-field">
                        <div className="client-field-descr">E-mail</div>
                        <div className="client-field-val">{contact?.EMAIL[0].VALUE || UNSET}</div>
                    </div>
                </Block>
            </div>
        </div>
    );
}
