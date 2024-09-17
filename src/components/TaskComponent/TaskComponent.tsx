import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import React, {useMemo, UIEvent} from 'react';

import {dateFormatter} from "../../utils/dateFormatter";
import {Task} from "../../classes/Task";


type TaskComponentProps = {
    task: Task
}


export function TaskComponent({task}: TaskComponentProps) {
    const navigate = useNavigate()
    const isClosed = !!task.closedDate
    const closeDate = useMemo(() => isClosed ? task.closedDate : task.deadline, [isClosed, task])


    const handleTaskClick = () => navigate(`/task/${task.id}`)


    function handleReportClick(e: UIEvent) {
        e.stopPropagation()
        navigate(`/task/${task.id}/edite`)
    }


    return (
        <div className={clsx('task task-container', {closed: isClosed})} onClick={handleTaskClick}>
            <div className='task-date-container'>
                <span className='task-deadline'>{isClosed ? 'Закрыта' : 'Крайний срок:'}</span>
                {!!closeDate && <span className='task-date'>{dateFormatter.format(closeDate)}</span>}
            </div>
            <div className='task-content'>
                <p className='task-title'>{task.title}</p>
                <p className='task-description'>{task.description}</p>
                {isClosed
                    ? 'Задача закрыта ... ???'
                    : <button className='task-button' onClick={handleReportClick}>
                        {task.description ? 'Редактировать отчет' : 'Написать отчет'}
                    </button>
                }
            </div>
        </div>
    );
}

