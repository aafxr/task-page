import React, {useEffect, useState} from 'react';
import {Title} from "../../components/Title";
import {Navigation} from "../../components/Navigation";
import {BXContact} from "../../classes/BXContact";
import {ContactService} from "../../services/ContactService";
import {useAppContext} from "../../context/AppContext";
import {ErrorService} from "../../services";
import {Loader} from "../../components/Loader";
import {Block} from "../../components/Block";
import {ContactCard} from "../../components/ContactCard";
import {Container} from "../../components/Container";

import './ContactsPage.css'

function ContactsPage() {
    const s = useAppContext()
    const [contacts, setContacts] = useState<BXContact[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        ContactService.getContactsList(s)
            .then(setContacts)
            .catch(ErrorService.handleError(s))
            .finally(() => setLoading(false))
    }, []);


    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <Title>Контакты</Title>
            </div>
            <div className='wrapper-content'>
                {loading
                    ? <div className='center'><Loader/></div>
                    : (
                        <Container className='mt mb'>
                            <Block className='contacts contacts-container'>
                                {contacts.map(c => (
                                    <ContactCard key={c.ID} className='contacts-item' contact={c}/>
                                ))}
                            </Block>
                        </Container>
                    )
                }
            </div>
            <div className='wrapper-footer'>
                <Navigation/>
            </div>
        </div>
    );
}

export default ContactsPage