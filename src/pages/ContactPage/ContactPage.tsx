import React, {useState} from 'react';
import {BXContact} from "../../classes/BXContact";
import {useParams} from "react-router-dom";

import './ContactPage.css'

const UNSET = 'Не усьановлено'

export function ContactPage() {
    const [contact, setContact] = useState<BXContact | undefined>()
    const {taskID, contactID} = useParams()





    return (
        <div className="client client-container">
            <h2 className="client-title">О контакте</h2>
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
        </div>
    );
}
