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
            const i1 = s.tasks.findIndex(t => !!t.closedDate)
            if(i1 !== -1){
                let i2 = i1
                while(s.tasks[i2] && !!s.tasks[i2].closedDate) i2++
                return s.tasks.slice(i1, i2)
            }
            return []
        } else if(filter === 'no-closed'){

        }else if(filter === 'deadline'){
            const i1 = s.tasks.findIndex(t => !!t.deadline)
            if(i1 !== -1){
                let i2 = i1
                while(s.tasks[i2] && !!s.tasks[i2].deadline && s.tasks[i2].deadline!.valueOf() > d.valueOf()) i2++
                return s.tasks.slice(i1, i2)
            }
            return []
        }if(filter === 'expired'){
            const i1 = s.tasks.findIndex(t => !!t.deadline && t.deadline.valueOf() < d.valueOf())
            if(i1 !== -1){
                let i2 = i1
                while(s.tasks[i2] && !!s.tasks[i2].deadline && s.tasks[i2].deadline!.valueOf() > d.valueOf()) i2++
                return s.tasks.slice(i1, i2)
            }
            return []
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
                    {tasks.length
                        ? tasks.map(t => (
                        <TaskComponent key={t.id} task={t}/>
                    ))
                    : <div className='tasks-empty'>Спичок задач пуст</div>}
                </div>
            </Block>
        )
}

