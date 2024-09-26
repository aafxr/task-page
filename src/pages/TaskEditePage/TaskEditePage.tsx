import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {Container} from "../../components/Container";
import {TextArea} from "../../components/TextArea";
import {Button} from "../../components/Button";
import {useTask} from "../../hooks";
import {TaskService} from "../../services";
import {Text} from "../../components/Text";
import {Checkbox} from "../../components/Checkbox";
import {Range} from "../../components/Range";
import {Select} from "../../components/Select";
import {DateSelect} from "../../components/DateSelect";
import {Title} from "../../components/Title";
import {BASE_URL} from "../../App";
import {BXPerson} from "../../classes/BXPerson";
import {ContactService} from "../../services/ContactService";
import {TaskType} from "../../classes/TaskType";
import {Task} from "../../classes/Task";

const d = new Date()
d.setHours(23, 59, 59, 999)


function updateTimeLabel(v: Task['taskTime']) {
    let t = +v * 20;
    let h = Math.floor(t / 60);
    let m = t % 60;
    let label = m + " мин";
    if (h > 0) {
        label = h + " ч " + label;
    }
    return "Затрачено " + label;
}


export function TaskEditePage() {
    const navigate = useNavigate()
    const {taskID} = useParams()
    const s = useAppContext()
    const task = useTask(taskID)!
    const [report, setReport] = useState(new Task(task))
    const [nextTask, setNextTask] = useState<Task>()
    const [contacts, setContacts] = useState<BXPerson[]>([])
    const [taskTypes, setTaskTypes] = useState<TaskType[]>([])

    const selectPersonData = useMemo(() => {
        return Array.from(s.persons.values()).map(p => ({value: p.ID, label: `${p.NAME} ${p.LAST_NAME}`}))
    }, [s.persons])


    const selectContactsData = useMemo(() => {
        return contacts.map(c => ({value: c.ID, label: `${c.LAST_NAME} ${c.NAME}`}))
    }, [contacts])

    const selectTaskTypes = useMemo(() => {
        return [{value: '-1', label: 'Не планировать дальнейщую работу'}].concat(taskTypes.map(t => ({value: t.ID, label: `${t.UF_CODE} ${t.UF_NAME}`})))
    }, [taskTypes])


    // загрузка контактов
    useEffect(() => {
        ContactService.getContacts(s, task).then(cl => {
            cl.sort((a,b) => a.LAST_NAME < b.LAST_NAME ? -1 : 1)
            setContacts(cl)
        })
    }, [task]);

    // загрузка типо следующей задачи
    useEffect(() => {
        TaskService.getTaskTypes(s, task).then(setTaskTypes)
    }, [task]);


    function handleSave(e: React.UIEvent) {
        e.stopPropagation()
        if (!task || !report) return
        TaskService.closeAndUpdate(s, report, nextTask)
            .then(() => navigate(BASE_URL))
    }


    function handleReportChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const nextReport = new Task(report)
        nextReport.report = e.target.value
        setReport(nextReport)
    }


    const handleCloseClick = (e: React.UIEvent) => {
        e.stopPropagation()
        navigate(BASE_URL)
    }

    /** цель достигнута */
    function handleSuccess(e: ChangeEvent<HTMLInputElement>) {
        const nextReport = new Task(report)
        nextReport.success = e.target.checked
        setReport(nextReport)
    }


    function handleClosePrevDay(e: ChangeEvent<HTMLInputElement>) {
        const nextReport = new Task(report)
        nextReport.closePrevDay = e.target.checked
        setReport(nextReport)
    }


    function handleSpentTime(e: ChangeEvent<HTMLInputElement>) {
        const nextReport = new Task(report)
        nextReport.taskTime = e.target.value as Task['taskTime']
        setReport(nextReport)
    }


    function nextDeal(v: string) {
        if (v.toString() === report.nextTaskType) return
        const nextReport = new Task(report)
        nextReport.nextTaskType = v
        setReport(nextReport)

        v === '-1' ? setNextTask(undefined) : setNextTask(new Task())
    }


    function handleSelectDate(e: ChangeEvent<HTMLInputElement>) {
        const d = e.target.valueAsDate
        if (!d) return
        d.setHours(23, 59, 59, 999)
        const nextState = new Task(nextTask)
        nextState.deadline = d
        setNextTask(nextState)
    }


    function handleImportant(e: ChangeEvent<HTMLInputElement>) {
        const nextState = new Task(nextTask)
        nextState.important = e.target.checked
        setNextTask(nextState)
    }


    function handleUrgent(e: ChangeEvent<HTMLInputElement>) {
        const nextState = new Task(nextTask)
        nextState.urgent = e.target.checked
        setNextTask(nextState)
    }


    function handleResponsiblePerson(personID: string) {
        const nextState = new Task(nextTask)
        nextState.responsibleId = personID
        setNextTask(nextState)
    }


    function handleContact(contactID: string) {
        const nextState = new Task(nextTask)
        nextState.ufCrmTaskContact = contactID
        setNextTask(nextState)
    }


    function handleExpectResult(e: ChangeEvent<HTMLTextAreaElement>) {
        const nextState = new Task(nextTask)
        nextState.description = e.target.value
        setNextTask(nextState)
    }


    console.log({report, nextTask})

    //@ts-ignore
    window.nextTask = nextTask

    return (
        <div className='report report-container wrapper overlay'>
            <div className='wrapper-header'>
                <Title>Отчет по задаче</Title>
            </div>
            <div className='wrapper-content'>
                <Container className='report-content'>
                    <div className='ui-form-row'>
                        <Text>{task.isClosed() ? 'Задача закрыта' : 'Желаемый результат: ' + task.description}</Text>
                    </div>
                    <div className='ui-form-row'>
                        <Text>Результат:</Text>
                        <TextArea
                            className='report-text'
                            cols={40}
                            rows={6}
                            value={report.report}
                            placeholder={'Отчет по задаче'}
                            onChange={handleReportChange}
                        />
                    </div>
                    <div className='ui-form-row'>
                        <Checkbox label='цель достигнута' checked={report.success}
                                  onChange={handleSuccess}/>
                    </div>
                    <div className='ui-form-row'>
                        <Checkbox label='Закрыть вчерашней датой' checked={report.closePrevDay}
                                  onChange={handleClosePrevDay}/>
                    </div>

                    <div className='ui-form-row'>
                        <Text>{updateTimeLabel(report.taskTime)}</Text>
                        <Range full min={0} max={12} value={+report.taskTime} onChange={handleSpentTime}/>
                    </div>

                    <div className='next-task-container'>
                        <div className='ui-form-row'>
                            <Text>Запланировать далее:</Text>
                            <Select full options={selectTaskTypes} onChange={nextDeal}/>
                        </div>
                        {!!nextTask && (
                            <>
                                <div className='ui-form-row'>
                                    <Text>Срок:</Text>
                                    <DateSelect value={nextTask.deadline?.toISOString().split('T')[0]}
                                                onChange={handleSelectDate}/>
                                </div>

                                <div className='ui-form-row'>
                                    <Checkbox label='Важная задача' checked={nextTask.important}
                                              onChange={handleImportant}/>
                                </div>
                                <div className='ui-form-row'>
                                    <Checkbox label='Срочная задача' checked={nextTask.urgent} onChange={handleUrgent}/>
                                </div>
                                <div className='ui-form-row'>
                                    <Text>Сотрудник</Text>
                                    <Select full options={selectPersonData}  value={nextTask.responsibleId} onChange={handleResponsiblePerson}/>
                                </div>
                                <div className='ui-form-row'>
                                    <Text>Контактное лицо</Text>
                                    <Select full options={selectContactsData} value={nextTask.ufCrmTaskContact} onChange={handleContact}/>
                                </div>
                                <div className='ui-form-row'>
                                    <Text>Желаемый результат:</Text>
                                    <TextArea
                                        className='report-text'
                                        cols={40}
                                        rows={6}
                                        placeholder={'Желаемый результат'}
                                        onChange={handleExpectResult}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                </Container>
            </div>
            <div className='wrapper-footer'>
                <div className='footer-btns'>
                    <Button className='confirm-btn' onClick={handleSave}>Сохранить</Button>
                    <Button onClick={handleCloseClick}>Закрыть</Button>
                </div>
            </div>
        </div>
    );
}

