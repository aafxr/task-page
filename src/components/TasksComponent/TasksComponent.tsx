import React from 'react';
import {TaskComponent, TaskPlaceholder} from "../TaskComponent";
import {useAppContext} from "../../context/AppContext";

export function TasksComponent() {
    const s = useAppContext()

    return s.tasksLoading
        ? (
            <div className='tasks-list'>
                <TaskPlaceholder/>
                <TaskPlaceholder/>
                <TaskPlaceholder/>
            </div>
        )
        : (
            <div className='tasks-list'>
                {s.tasks.map(t => (
                    <TaskComponent key={t.id} task={t}/>
                ))}
            </div>
        )
}

