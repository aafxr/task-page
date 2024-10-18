import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import React, {useMemo, UIEvent} from 'react';

import {dateFormatter} from "../../utils/dateFormatter";
import {Task} from "../../classes/Task";
import {BASE_URL} from "../../App";
import './TaskPlaceholder'



type TaskComponentProps = {
    task: Task
}


const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
});

const todayFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: "2-digit",
    minute: "2-digit",
});

const dateStart = new Date()
dateStart.setHours(0,0,0,0)
const dateEnd = new Date()
dateEnd.setHours(23,59,59,999)


export function TaskComponent({task}: TaskComponentProps) {
    const navigate = useNavigate()
    const isClosed = task.isClosed()
    const closeDate = useMemo(() => isClosed ? task.closedDate : task.deadline, [isClosed, task])
    const thisDay = task.deadline && task.deadline.valueOf() >= dateStart.valueOf() && task.deadline.valueOf() < dateEnd.valueOf()


    const cn: Record<string, boolean> = {
        closed: isClosed,
    }

    const urgent = task.urgent
    const important = task.important


    if(urgent && !important) cn['task-blue'] = true
    else if(important && !urgent) cn['task-green'] = true
    else if(important && urgent) cn['task-red'] = true


    const handleTaskClick = () => navigate(BASE_URL + `task/${task.id}`)

    const expiredText = useMemo(() => {
        if (!task.deadline) return ''
        const date = new Date()
        const v = date.valueOf() - task.deadline.valueOf()
        let text = '-'
        const d = Math.floor(v / 86_400_000)
        const h = Math.floor(v / 3600_000 % 24)
        const m = Math.floor(v / 60_000 % 60)
        if (d) text += `${d}д `
        if (h) text += `${h}ч` + (d ? '' : ':')
        if (!d) text += `${m}мин`
        return text
    }, [task])


    function handleReportClick(e: UIEvent) {
        e.stopPropagation()
        navigate(`${BASE_URL}task/${task.id}/edite`)
    }


    return (
        <div className={clsx('task task-container', cn)} onClick={handleTaskClick}>
            <div className='task-date-container'>
                <span
                    className='task-deadline'>{isClosed ? 'Закрыта' : closeDate ? 'Крайний срок:' : 'Без срока'}</span>
                {!!closeDate && <span className='task-date'>{dateFormatter.format(closeDate)}</span>}
                {task.expired()
                    ? <span className='task-expired'>{expiredText}</span>
                    : ( thisDay && <span className='task-expired task-expired-today'>{todayFormatter.format(task.deadline!)}</span> )
                }
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

