import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {useTask} from "../../hooks";
import {Button} from "../../components/Button";
import {BxSelect} from "../../components/BxSelect";
import {Checkbox} from "../../components/Checkbox/Checkbox";
import {TaskProperties} from "../../components/TaskPropserties";


const options = [
    { value: 'option1', label: 'Вариант 1' },
    { value: 'option2', label: 'Вариант 2' },
    { value: 'option3', label: 'Вариант 3' },
];


const data = [
    { property: 'Имя', value: 'Иван Иванов' },
    { property: 'Возраст', value: '30 лет' },
    { property: 'Город', value: 'Москва' },
]


export function TaskDetails() {
    const navigate = useNavigate()
    const {taskID} = useParams()
    const task = useTask(taskID)
    const s = useAppContext()


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
                <BxSelect value={'132'} options={options} onChange={handleSelectChange}/>
                <BxSelect value={'132'} options={options} onChange={handleSelectChange}/>
                <BxSelect value={'132'} options={options} onChange={handleSelectChange}/>

                <Checkbox checked label={'checked'} onChange={handleCheckboxClick}/>
                <Checkbox label={'not checked'} onChange={handleCheckboxClick}/>

                <TaskProperties data={data} />
            </div>
            <div className='wrapper-footer'>
                <div className='footer-btns'>
                    <Button full onClick={handleBackClick}>Назад</Button>
                </div>
            </div>
        </div>
    );
}

