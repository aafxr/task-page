import React, {useMemo} from 'react';
import {TaskComponent, TaskPlaceholder} from "../TaskComponent";
import {useAppContext} from "../../context/AppContext";
import {Block} from "../Block";

export type TaskFilter = 'all' | 'deadline' | 'expired' | 'closed' | 'no-closed'

type TasksComponentProps = {
    filter?: TaskFilter
}

export function TasksComponent({filter = 'all'}: TasksComponentProps) {
    const s = useAppContext()

    const  tasks = useMemo(() => {
        const d = new Date()

        if(filter === 'closed'){
            return s.tasks.filter(t => !!t.closedDate)
        } else if(filter === 'no-closed'){
            return s.tasks.filter(t => !t.closedDate)
        }else if(filter === 'deadline'){
            return  s.tasks.filter(t => !!t.deadline)
        }if(filter === 'expired'){
            return s.tasks.filter(t => t.deadline && t.deadline.valueOf() < d.valueOf())
        }
        return s.tasks
    }, [s, filter])

    return s.tasksLoading
        ? (
            <Block>
                <div className='tasks-list'>
                    {Array.from({length: 1}).map((_, i) => (
                        <TaskPlaceholder key={i}/>
                    ))}
                </div>
            </Block>
        )
        : (
            <Block>
                <div className='tasks-list'>
                    { tasks.map(t => <TaskComponent key={t.id} task={t}/> )}
                </div>
            </Block>
        )
}

