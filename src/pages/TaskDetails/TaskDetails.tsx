import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {useTask} from "../../hooks";
import {Button} from "../../components/Button";
import {TaskProperties} from "../../components/TaskPropserties";
import {Task} from "../../classes/Task";
import {Container} from "../../components/Container";
import {BASE_URL} from "../../App";
import {Title} from "../../components/Title";
import {BXContact} from "../../classes/BXContact";


import './TaskDetails.css'
import {ContactService} from "../../services/ContactService";
import {AppLink} from "../../components/AppLink";


const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    day: '2-digit',
    month: 'long',
    year: '2-digit',
    hour: "2-digit",
    minute: '2-digit'
})

const UNSET = 'Не установлено'


// type TaskPropertyVisualize<T = keyof Task> = {
//     property: T
//     propertyName: string
//     value: (k: T, task: Task) => ReactNode
// }
//
// const properties: TaskPropertyVisualize[] = [
//     {
//         property: "title",
//         propertyName: 'Название',
//         value: (k, task) => task[k]
//     },
//     {
//         property: "description",
//         propertyName: 'Описание',
//         value: (k, task) => task[k]
//     },
//     {
//         property: "createdBy",
//         propertyName: 'Постановщик',
//         value: (k, task) => task.createdBy || ''
//     },
//     {
//         property: "responsible",
//         propertyName: 'Исполнитель',
//         value: (k, task) => task.responsible?.name || ''
//     },
//     {
//         property: "addInReport",
//         propertyName: 'Отчет руководителю',
//         value: (k, task) => task.addInReport === 'Y'
//     },
//     {
//         property: "createdDate",
//         propertyName: 'Дата создания',
//         value: (k, task) => task[k] ? dateFormatter.format(task[k]) : ''
//     },
//     {
//         property: "changedDate",
//         propertyName: 'Дата изменения',
//         value: (k, task) => task[k] ? dateFormatter.format(task[k]) : ''
//     },
//     {
//         property: "deadline",
//         propertyName: 'Крайний срок',
//         value: (k, task) => task[k] ? <b>{dateFormatter.format(task[k])}</b> : 'не указано'
//     },
//     {
//         property: "status",
//         propertyName: 'Статус',
//         value: (k, task) => {
//             switch (task[k]) {
//                 case 1:
//                     return 'Новая'
//                 case 2:
//                     return 'Ожидание'
//                 case 3:
//                     return 'Выполняется'
//                 case 4:
//                     return 'Предварительно выполнена'
//                 case 5:
//                     return 'Выполнена'
//                 case 6:
//                     return 'Отложена'
//                 case 7:
//                     return 'Отклонена'
//                 default:
//                     return ''
//             }
//         }
//     }
// ]


export function TaskDetails() {
    const navigate = useNavigate()
    const {taskID} = useParams()
    const task = useTask(taskID)
    const s = useAppContext()
    const [contacts, setContacts] = useState<BXContact[]>([])


    // const data = useMemo(() => {
    //     if (!task) return []
    //     return properties.map(p => ({
    //         property: p.propertyName,
    //         value: p.value(p.property, task)
    //     }))
    // }, [task])


    useEffect(() => {
        if(!task) return
        ContactService.getContacts(s, task)
            .then(setContacts)
            .catch(console.error)
    }, [task]);


    function handleBackClick() {
        navigate(BASE_URL)
    }

    // function handleSelectChange(text: string) {
    //     console.log(text)
    // }
    //
    // function handleCheckboxClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    //
    // }


    return (
        <div className='taskDetails wrapper'>
            <div className='wrapper-header'>
                <Title>
                    <h2 className="client-title">Задача {task ?`#${task.id}`: ''}</h2>
                </Title>
            </div>
            <div className='wrapper-content'>
                {!!task && (
                    <>
                        <div className="client client-container">
                            <div className="client-field">
                                <div className="client-field-descr">Контакты</div>
                                <div className="client-field-val">{
                                    contacts.map(c => (
                                        <AppLink key={c.ID} to={`${BASE_URL}${task.id}/${c.ID}`}>{`${c.NAME || ''} ${c.LAST_NAME || ''}`}</AppLink>
                                    ))
                                }</div>
                            </div>
                            <div className="client-field">
                                <div className="client-field-descr">Название</div>
                                <div className="client-field-val">{task.title || UNSET}</div>
                            </div>
                            <div className="client-field">
                                <div className="client-field-descr">Ответственный</div>
                                <div className="client-field-val">{task.responsible?.name || UNSET}</div>
                            </div>
                            <div className="client-field">
                                <div className="client-field-descr">Отчет руководителю</div>
                                <div className="client-field-val">{task.report || UNSET}</div>
                            </div>
                            <div className="client-field">
                                <div className="client-field-descr">Дата создания</div>
                                <div
                                    className="client-field-val">{task.createdDate ? dateFormatter.format(task.createdDate) : UNSET}</div>
                            </div>
                            <div className="client-field">
                                <div className="client-field-descr">Дата обновления</div>
                                <div
                                    className="client-field-val">{task.changedDate ? dateFormatter.format(task.changedDate) : UNSET}</div>
                            </div>

                            {task.deadline && (
                                <div className="client-field">
                                    <div className="client-field-descr">Крайний срок</div>
                                    <div className="client-field-val">
                                        <strong>{dateFormatter.format(task.changedDate!)}</strong></div>
                                </div>
                            )}

                        </div>
                    </>
                )}


                {/*<Container>*/}
                {/*    <TaskProperties data={data} />*/}
                {/*</Container>*/}

            </div>
            <div className='wrapper-footer'>
                <div className='footer-btns'>
                    <Button full onClick={handleBackClick}>Назад</Button>
                </div>
            </div>
        </div>
    );
}

