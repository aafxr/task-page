import React, {useEffect, useState} from 'react';
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

export function CompanyPage() {
    const s = useAppContext()
    const {taskID, companyID} = useParams()
    const task = useTask(taskID)
    const [company, setCompany] = useState<BXCompany | undefined>()
    const [contacts, setContacts] = useState<BXContact[]>([])


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
                                <div className="client-field">
                                    <div className="client-field-descr">Информация</div>
                                    <div className="client-field-val">{company.TITLE || UNSET}</div>
                                </div>
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
                                                <a className='client-phone' href={`tel:${p.VALUE}`}>{p.VALUE}</a>
                                            </div>
                                        ))
                                        : <div className="client-field-val">{UNSET}</div>
                                    }
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">E-mail</div>
                                    <div className="client-field-val">{UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Город</div>
                                    <div className="client-field-val">{company.UF_CITY || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Адрес
                                        <span>Фактический адрес:</span></div>
                                    <div className="client-field-val">
                                        <span>{company.ADDRESS}</span><br/>
                                        <span>{company.ADDRESS_CITY}</span><br/>
                                        <span>{company.ADDRESS_COUNTRY}</span>
                                    </div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Сайт</div>
                                    <div className="client-field-val">{ UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Комментарий</div>
                                    <div className="client-field-val">{company.COMMENTS || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Город</div>
                                    <div className="client-field-val">{company.ADDRESS_CITY || UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Источник привлечения</div>
                                    <div className="client-field-val">{UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Последняя коммуникация</div>
                                    <div className="client-field-val">{UNSET}</div>
                                </div>
                                <div className="client-field">
                                    <div className="client-field-descr">Дата создания в mawi</div>
                                    <div className="client-field-val">{UNSET}</div>
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
                                            <div className='contact-name'>{`${c.LAST_NAME} ${c.NAME}`}</div>
                                            {c.POST && <div className='contact-value'>{c.POST}</div>}
                                            {c.PHONE.map(p => <a key={c.ID} className='contact-phone'
                                                                 href={`tel:${p.VALUE}`}>{p.VALUE}</a>)}
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
