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
        <div className={clsx('task task-container', {closed: isClosed})} onClick={handleTaskClick}>
            <div className='task-date-container'>
                <span className='task-deadline'>{isClosed ? 'Закрыта' : closeDate ? 'Крайний срок:' : 'Без срока'}</span>
                {!!closeDate && <span className='task-date'>{dateFormatter.format(closeDate)}</span>}
            </div>
            <div className='task-content'>
                <p className='task-title'>{task.title}</p>
                <p className='task-description'>{task.description}</p>
                <div className='task-btns'>
                    {isClosed
                        ? <button className='task-button task-button-closed'>Задача закрыта ... ???</button>
                        : <button className='task-button' onClick={handleReportClick}>
                            {task.description ? 'Редактировать отчет' : 'Написать отчет'}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

