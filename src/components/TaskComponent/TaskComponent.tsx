import React, {useMemo} from 'react';
import {Task} from "../../classes/Task";
import {dateFormatter} from "../../utils/dateFormatter";


type TaskComponentProps = {
    task: Task
}



export function TaskComponent({task} : TaskComponentProps) {
    const isClosed = !!task.closedDate
    const closeDate = useMemo(() => isClosed ? task.closedDate : task.deadline, [isClosed, task])

    return (
        <div className='task task-container'>
            {!!closeDate && <div className='task-date'>{dateFormatter.format(closeDate)}</div>}
            <div className='task-content'>
                <p className='task-title'>{task.title}</p>
                <p className='task-description'>{task.description}</p>
                <button className='task-button'>{isClosed ? 'задача закрыиа' : 'Написать отчет'}</button>
            </div>
        </div>
    );
}

