import React, {ReactNode, useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {useTask} from "../../hooks";
import {Button} from "../../components/Button";
import {BxSelect} from "../../components/BxSelect";
import {Checkbox} from "../../components/Checkbox/Checkbox";
import {TaskProperties} from "../../components/TaskPropserties";
import {Task} from "../../classes/Task";
import {Container} from "../../components/Container";


const options = [
    { value: 'option1', label: 'Вариант 1' },
    { value: 'option2', label: 'Вариант 2' },
    { value: 'option3', label: 'Вариант 3' },
];


const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    day: '2-digit',
    month: 'long',
    year: '2-digit',
    hour: "2-digit",
    minute: '2-digit'
})


type TaskPropertyVisualize <T = keyof Task> = {
    property: T
    propertyName: string
    value: (k: T, task: Task) => ReactNode
}

const properties: TaskPropertyVisualize[] = [
    {
        property: "title",
        propertyName: 'Название',
        value: (k, task) => task[k]
    },
    {
        property: "description",
        propertyName: 'Описание',
        value: (k, task) => task[k]
    },
    {
        property: "responsible",
        propertyName: 'Исполнитель',
        value: (k, task) => task.responsible?.name || ''
    },
    {
        property: "addInReport",
        propertyName: 'Отчет руководителю',
        value: (k, task) => task.addInReport === 'Y'
    },
    {
        property: "createdDate",
        propertyName: 'Дата создания',
        value: (k, task) => task[k] ? dateFormatter.format(task[k]) : ''
    },
    {
        property: "changedDate",
        propertyName: 'Дата изменения',
        value: (k, task) => task[k] ? dateFormatter.format(task[k]) : ''
    },
    {
        property: "deadline",
        propertyName: 'Крайний срок',
        value: (k, task) => task[k] ? <b>{dateFormatter.format(task[k])}</b> : 'не указано'
    }
]


export function TaskDetails() {
    const navigate = useNavigate()
    const {taskID} = useParams()
    const task = useTask(taskID)
    const s = useAppContext()


    const data = useMemo(() => {
        if(!task) return []
        return properties.map(p => ({
            property: p.propertyName,
            value: p.value(p.property, task)
        }))
    }, [task])


    function handleBackClick(){
        navigate('/')
    }

    function handleSelectChange(text: string){
        console.log(text)
    }

    function handleCheckboxClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>){

    }


    return (
        <div className='taskDetails wrapper'>
            <div className='wrapper-header'>
                <div className='taskDetails-title title'>
                    Детали
                </div>
            </div>
            <div className='wrapper-content'>
                {/*<BxSelect value={'132'} options={options} onChange={handleSelectChange}/>*/}
                {/*<BxSelect value={'132'} options={options} onChange={handleSelectChange}/>*/}
                {/*<BxSelect value={'132'} options={options} onChange={handleSelectChange}/>*/}

                {/*<Checkbox checked label={'checked'} onChange={handleCheckboxClick}/>*/}
                {/*<Checkbox label={'not checked'} onChange={handleCheckboxClick}/>*/}
                <Container>
                    <TaskProperties data={data} />
                </Container>

            </div>
            <div className='wrapper-footer'>
                <div className='footer-btns'>
                    <Button full onClick={handleBackClick}>Назад</Button>
                </div>
            </div>
        </div>
    );
}

