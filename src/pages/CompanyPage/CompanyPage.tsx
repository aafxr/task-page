import React, {useEffect, useState, TouchEvent} from 'react';
import {useParams} from "react-router-dom";

import {ContactService} from "../../services/ContactService";
import {useAppContext} from "../../context/AppContext";
import {Container} from "../../components/Container";
import {Accordion} from "../../components/Accordion";
import {BXCompany} from "../../classes/BXCompany";
import {BXContact} from "../../classes/BXContact";
import {Title} from "../../components/Title";
import {Block} from "../../components/Block";
import {useTask} from "../../hooks";

import './CompanyPage.css'

const UNSET = 'Не указано'


const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: "2-digit",
    second: "2-digit"
})


export function CompanyPage() {
    const s = useAppContext()
    const {taskID, companyID} = useParams()
    const task = useTask(taskID)
    const [company, setCompany] = useState<BXCompany | undefined>()
    const [contacts, setContacts] = useState<BXContact[]>([
        // new BXContact({
        //     NAME: 'Elena',
        //     LAST_NAME: 'Astanina',
        //     POST: 'zam ip decor',
        //     PHONE: [
        //         {ID: '1', VALUE: '1324569877', TYPE_ID: '', VALUE_TYPE: ''},
        //         {ID: '2', VALUE: '3215487954', TYPE_ID: '', VALUE_TYPE: ''}
        //     ]
        // }),
        // new BXContact({
        //     NAME: 'asd',
        //     LAST_NAME: 'asdasd',
        //     POST: 'zam ip decor',
        //     PHONE: [
        //         {ID: '1', VALUE: '1324569877', TYPE_ID: '', VALUE_TYPE: ''},
        //     ],
        //     EMAIL: [
        //         {ID: '1', VALUE: 'asd@asd.com', TYPE_ID: '', VALUE_TYPE: ''},
        //     ]
        // })
    ])


    useEffect(() => {
        const t = s.tasks.find(t => t.id === taskID)
        if (t) {
            ContactService.getCompanies(s, t)
                .then(cl => setCompany(cl.find(c => c.ID === companyID)))
                .catch(console.error)
        }
    }, [taskID, companyID]);


    useEffect(() => {
        if(!task) return
        ContactService.getContacts(s, task)
            .then(setContacts)
    }, [task]);


    function handleWebLinkClick(e: TouchEvent<HTMLAnchorElement>){
        e.preventDefault()
        const el = e.target as HTMLAnchorElement
        Telegram.WebApp.openLink(el.href)
    }


    function handlePhoneClick(e: TouchEvent<HTMLAnchorElement>, phone: BXContact['PHONE'][number]){
        e.preventDefault()
        navigator.clipboard.writeText(phone.VALUE)
            .then(() => Telegram.WebApp.showAlert('номер телефона скопирован'))
            .catch(console.error)
    }


    function handleEMailClick(e: TouchEvent<HTMLAnchorElement>, mail: BXContact['EMAIL'][number]){
        e.preventDefault()
        navigator.clipboard.writeText(mail.VALUE)
            .then(() => Telegram.WebApp.showAlert('e-mail скопирован'))
            .catch(console.error)
    }



    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <Title>{`Компания ${company ? '#' + company.ID : ''}`}</Title>
            </div>
            <div className='wrapper-content'>
                <Container>
                    <Block className="client client-container pd">
                        {!!company && (
                            <>
                                {/*<div className="client-field">*/}
                                {/*    <div className="client-field-descr">Информация</div>*/}
                                {/*    <div className="client-field-val">{company.TITLE || UNSET}</div>*/}
                                {/*</div>*/}
                                <div className="client-field">
                                    <div className="client-field-descr">Название компании</div>
                                    <div className="client-field-val">{company.TITLE || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Тип компании</div>
                                    <div className="client-field-val">{company.COMPANY_TYPE || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Телефон</div>
                                    {company.PHONE.length
                                        ? company.PHONE.map(p => (
                                            <div className="client-field-val">
                                                <a
                                                    className='client-phone'
                                                    href={`tel:${p.VALUE}`}
                                                onTouchEnd={e => handlePhoneClick(e, p)}>{p.VALUE}</a>
                                            </div>
                                        ))
                                        : <div className="client-field-val">{UNSET}</div>
                                    }
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">E-mail</div>
                                    <div className="client-field-val">{company.EMAIL || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Город</div>
                                    <div className="client-field-val">{company.UF_CITY_LIST || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Адрес</div>
                                    <div className="client-field-val">
                                        {company.ADDRESS}
                                        {/*<span>{company.ADDRESS_CITY}</span><br/>*/}
                                        {/*<span>{company.ADDRESS_COUNTRY}</span>*/}
                                    </div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Сайт</div>
                                    {company.WEB.length > 0
                                        ? company.WEB.map(w =>
                                            <div key={w.ID} className="client-field-val">
                                                <a href={w.VALUE} onTouchEnd={handleWebLinkClick}>{w.VALUE}</a>
                                            </div>
                                        )
                                        : <div className="client-field-val">{UNSET}</div>
                                    }
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Комментарий</div>
                                    <div className="client-field-val">{company.COMMENTS || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Источник привлечения</div>
                                    <div className="client-field-val">{company.UF_SOURCE_IB || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Последняя коммуникация</div>
                                    <div className="client-field-val">
                                        {company.UF_LAST_ACTIVITY ? dateFormatter.format(company.UF_LAST_ACTIVITY) : UNSET}
                                    </div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Дата создания в mawi</div>
                                    <div className="client-field-val">
                                        {company.UF_EXT_DATE_CREATE ? dateFormatter.format(company.UF_EXT_DATE_CREATE) : UNSET}
                                    </div>
                                </div>
                            </>
                        )}
                    </Block>

                    {contacts.length > 0 &&
                        <Block className='mt'>
                            <Accordion title='Контакты'>
                                <div className='company-contacts'>
                                    {contacts.map(c => (
                                        <div className='contact'>
                                            <div className='contact-descr'>Контакты, связанные с компанией</div>
                                            <div className='contact-name mb'>{`${c.LAST_NAME} ${c.NAME}`}</div>
                                            {!!c.POST && <div className='contact-value'>{c.POST}</div>}
                                            {c.PHONE.map(p =>
                                                <div className='contact-value'>
                                                    <a key={c.ID}
                                                       className='contact-phone'
                                                       href={`tel:${p.VALUE}`}
                                                       onTouchEnd={e => handlePhoneClick(e, p)}>
                                                        {p.VALUE}
                                                    </a>
                                                </div>
                                            )}
                                            {c.EMAIL.length > 0 && c.EMAIL.map(m =>
                                                <div key={m.ID} className='contact-value'>
                                                    <a href={`mailto:${m.VALUE}`} onTouchEnd={e => handleEMailClick(e, m)}>{m.VALUE}</a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Accordion>
                        </Block>
                    }
                </Container>
            </div>
        </div>
    );
}
