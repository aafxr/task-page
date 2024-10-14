import {useNavigate} from "react-router-dom";
import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';

import {useAppContext} from "../../context/AppContext";
import {DateSelect} from "../../components/DateSelect";
import {Container} from "../../components/Container";
import {Checkbox} from "../../components/Checkbox";
import {TextArea} from "../../components/TextArea";
import {Select} from "../../components/Select";
import {Button} from "../../components/Button";
import {Title} from "../../components/Title";
import {Block} from "../../components/Block";
import {TaskService} from "../../services";
import {Text} from "../../components/Text";
import {Task} from "../../classes/Task";
import {bitrix} from "../../bitrix";

import './NewTask.css'



export function NewTask() {
    const navigate = useNavigate()
    const s = useAppContext()
    const [task, setTask] = useState(new Task())


    useEffect(() => {
        bitrix.getAuth()
            .then(u => {
                task.responsibleId = '' + u?.user_id
                setTask(new Task(task))
            })
    }, []);


    const selectPersonData = useMemo(() => {
        return [{value: '-1', label: '-'}].concat(Array.from(s.persons.values()).map(p => ({
            value: p.ID,
            label: `${p.LAST_NAME} ${p.NAME}`
        })))
    }, [s.persons])


    function handleTitleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const nextState = new Task(task)
        nextState.title = e.target.value
        setTask(nextState)
    }


    function handleReportChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const nextState = new Task(task)
        nextState.description = e.target.value
        setTask(nextState)
    }


    function handleSelectDate(e: ChangeEvent<HTMLInputElement>) {
        const d = e.target.valueAsDate
        if (!d) return
        d.setHours(23, 30, 0, 0)
        const nextState = new Task(task)
        nextState.deadline = d
        setTask(nextState)
    }


    function handleImportant(e: ChangeEvent<HTMLInputElement>) {
        const nextState = new Task(task)
        nextState.important = e.target.checked
        setTask(nextState)
    }


    function handleUrgent(e: ChangeEvent<HTMLInputElement>) {
        const nextState = new Task(task)
        nextState.urgent = e.target.checked
        setTask(nextState)
    }


    function handleResponsiblePerson(personID: string) {
        const nextState = new Task(task)
        nextState.responsibleId = personID
        setTask(nextState)
    }


    function handleReject(){
        navigate('/')
    }


    function handleSave(){
        if(!task.title){
            alert('Укажите название задачи')
            return
        }
        if(!task.description){
            alert('Укажите цель задачи')
            return
        }
        if (task.responsibleId === '-1'){
            alert('Укажите ответственного')
            return
        }
        if (!task.deadline){
            alert('Укажите крайний срок')
            return
        }

        TaskService.add(s, task)
            .then(() => navigate('/'))
            .then(() => TaskService.getTasks(s))
    }


    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <Title>Поставить задачу</Title>
            </div>
            <div className='wrapper-content'>
                <Container>
                    <Block className='newTask'>
                        <div className='ui-form-row'>
                            <Text>Название:</Text>
                            <TextArea
                                className='report-text'
                                cols={40}
                                rows={3}
                                value={task.title}
                                placeholder={'Название задачи'}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className='ui-form-row'>
                            <Text>Цель:</Text>
                            <TextArea
                                className='report-text'
                                cols={40}
                                rows={6}
                                value={task.description}
                                placeholder={'Цель задачи'}
                                onChange={handleReportChange}
                            />
                        </div>
                        <div className='ui-form-row'>
                            <Text>Срок:</Text>
                            <DateSelect
                                value={task.deadline?.toISOString().split('T')[0]}
                                onChange={handleSelectDate}/>
                        </div>

                        <div className='ui-form-row'>
                            <Checkbox label='Важная задача' checked={task.important}
                                      onChange={handleImportant}/>
                        </div>
                        <div className='ui-form-row'>
                            <Checkbox label='Срочная задача' checked={task.urgent}
                                      onChange={handleUrgent}/>
                        </div>
                        <div className='ui-form-row'>
                            <Text>Ответственный</Text>
                            <Select full options={selectPersonData} value={task.responsibleId}
                                    onChange={handleResponsiblePerson}/>
                        </div>
                    </Block>
                </Container>
            </div>
            <div className='wrapper-footer'>
                <div className='footer-btns'>
                    <Button className='active-btn' onClick={handleSave}>Создать</Button>
                    <Button onClick={handleReject}>Закрыть</Button>
                </div>
            </div>
        </div>
    );
}

