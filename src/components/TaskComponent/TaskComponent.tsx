import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import React, {useMemo, UIEvent} from 'react';

import {dateFormatter} from "../../utils/dateFormatter";
import {Task} from "../../classes/Task";

import './TaskPlaceholder'
import {BASE_URL} from "../../App";


type TaskComponentProps = {
    task: Task
}


const formatter = new Intl.DateTimeFormat(navigator.language, {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
});


export function TaskComponent({task}: TaskComponentProps) {
    const navigate = useNavigate()
    const isClosed = task.isClosed()
    const closeDate = useMemo(() => isClosed ? task.closedDate : task.deadline, [isClosed, task])


    const handleTaskClick = () => navigate(BASE_URL + `task/${task.id}`)


    function handleReportClick(e: UIEvent) {
        e.stopPropagation()
        navigate(`${BASE_URL}task/${task.id}/edite`)
    }


    return (
        <div
            className={clsx('task task-container', {
                closed: isClosed,
                'task-urgent': task.urgent,
                'task-highPriority': task.important
            })}
            onClick={handleTaskClick}
        >
            <div className='task-date-container'>
                <span
                    className='task-deadline'>{isClosed ? 'Закрыта' : closeDate ? 'Крайний срок:' : 'Без срока'}</span>
                {!!closeDate && <span className='task-date'>{dateFormatter.format(closeDate)}</span>}
            </div>
            <div className='task-content'>
                <p className='task-title'>{task.title}</p>
                <p className='task-description'>{task.description}</p>
                <div className='task-btns'>
                    <button className='task-button' onClick={handleReportClick}>
                        {task.report
                            ? <span
                                className='task-closed'>{task.closedDate ? `${formatter.format(task.closedDate)} редактировать` : 'Редактировать'}</span>
                            : <span className='task-report'>Написать отчет</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

