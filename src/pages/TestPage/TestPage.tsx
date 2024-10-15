import {useEffect, useMemo, useState} from "react";

import {ErrorService, TaskService} from "../../services";
import {useAppContext} from "../../context/AppContext";
import {TaskType} from "../../classes/TaskType";
import {Title} from "../../components/Title";
import Select from 'react-select'

import './TestPage.css'

export function TestPage() {
    const s = useAppContext()
    const [taskTypes, setTaskTypes] = useState<TaskType[]>([])
    const [selected, setSelected] = useState<TaskType | undefined>()

    const selectData = useMemo(() => {
        return [{value: '-1', label: 'Не планировать дальнейщую работу'}].concat(
            taskTypes.map(tt => ({value: tt.ID, label: `${tt.UF_CODE} ${tt.UF_NAME}`}))
        )
    }, [taskTypes])


    useEffect(() => {
        if(!taskTypes.length || !s.user) return
        TaskService.getTaskTypes(s)
            .then(r => {
                console.log('getTaskTypes done')
                console.log(r)
                setTaskTypes(r)
            })
            .catch(ErrorService.handleError(s))
    }, [s, taskTypes]);


    function handleSelect(v?: string ){
        if(!v || v === '-1') {
            setSelected(undefined)
            return
        }
        const t = taskTypes.find(t => t.ID === v)
        if(!t) {
            setSelected(undefined)
            return
        }
        setSelected(t)
    }


    console.log(selected)


    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <Title>Тестовая страница</Title>
            </div>
            <div className='wrapper-content'>
                <Select
                    defaultValue={selectData[0]}
                    options={selectData}
                    onChange={r => handleSelect(r?.value)}
                />
            </div>
        </div>
    );
}

export default TestPage