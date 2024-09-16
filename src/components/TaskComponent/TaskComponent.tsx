import React, {useMemo} from 'react';
import {Task} from "../../classes/Task";
import {dateFormatter} from "../../utils/dateFormatter";
import clsx from "clsx";


type TaskComponentProps = {
    task: Task
}


export function TaskComponent({task}: TaskComponentProps) {
    const isClosed = !!task.closedDate
    const closeDate = useMemo(() => isClosed ? task.closedDate : task.deadline, [isClosed, task])

    return (
        <div className={clsx('task task-container', {closed: isClosed})}>
            <div className='task-date-container'>
                <span className='task-deadline'>{isClosed ? 'Закрыта' : 'Крайний срок:'}</span>
                {!!closeDate && <span className='task-date'>{dateFormatter.format(closeDate)}</span>}
            </div>
            <div className='task-content'>
                <p className='task-title'>{task.title}</p>
                <p className='task-description'>{task.description}</p>
                {isClosed
                    ? 'Задача закрыта ... ???'
                    : <button className='task-button'>Написать отчет</button>
                }
                <button className='task-button'>Редактировать отчет</button>
            </div>
        </div>
    );
}

