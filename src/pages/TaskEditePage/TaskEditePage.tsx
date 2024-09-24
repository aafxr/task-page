import React, {ChangeEvent, useEffect, useState} from 'react';
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
import {TaskReport} from "../../classes/TaskReport";
import {Select} from "../../components/Select";
import {NextTask} from "../../classes/NextTask";
import {DateSelect} from "../../components/DateSelect";

const d = new Date()
d.setHours(23, 59, 59, 999)

const defaultState = new TaskReport()


function updateTimeLabel(v: TaskReport['fields']['UF_FIELD_TIME']) {
    let t = v * 20;
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
    const [report, setReport] = useState(defaultState)
    const [nextTask, setNextTask] = useState<NextTask>()


    useEffect(() => {
        if (!task) return
        const r = s.reports.find(r => r.taskId === task.id)
        if (r) setReport(r)
        if (!task.isClosed()){
            const nt = new NextTask(report.nextTask || {})
            setNextTask(nt)
        }
    }, [task]);


    function handleSave(e: React.UIEvent) {
        e.stopPropagation()
        if (!task || !report) return
        TaskService.updateReport(s, report)
            .then(() => navigate('/'))
    }


    function handleReportChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const nextReport = new TaskReport(report)
        nextReport.fields.UF_FIELD_RESULT = e.target.value
        setReport(nextReport)
    }


    const handleCloseClick = (e: React.UIEvent) => {
        e.stopPropagation()
        navigate('/')
    }

    /** цель достигнута */
    function handleSuccess(e: ChangeEvent<HTMLInputElement>) {
        const nextReport = new TaskReport(report)
        nextReport.fields.UF_FIELD_SUCCESS = e.target.checked
        setReport(nextReport)
    }


    function handleClosePrevDay(e: ChangeEvent<HTMLInputElement>) {
        const nextReport = new TaskReport(report)
        nextReport.taskClosePrevDate = e.target.checked
        setReport(nextReport)
    }


    function handleSpentTime(e: ChangeEvent<HTMLInputElement>) {
        const nextReport = new TaskReport(report)
        nextReport.fields.UF_FIELD_TIME = +e.target.value
        setReport(nextReport)
    }


    function nextDeal(v: number){
        if(!nextTask) return
        if (v === report.taskNextTypeId) return
        const nextReport = new TaskReport(report)
        nextReport.taskNextTypeId = v
        setReport(nextReport)
    }


    function handleSelectDate(e: ChangeEvent<HTMLInputElement>){
        const d = e.target.valueAsDate
        if (!d) return
        const nextState = new NextTask(nextTask)
        nextState.deadLine = d
        setNextTask(nextState)
    }


    function handleImportant(e: ChangeEvent<HTMLInputElement>){
        const nextState = new NextTask(nextTask)
        nextState.important = e.target.checked
        setNextTask(nextState)
    }


    function handleUrgent(e: ChangeEvent<HTMLInputElement>){
        const nextState = new NextTask(nextTask)
        nextState.urgent = e.target.checked
        setNextTask(nextState)
    }


    function handleResponsiblePerson(personID: string){
        const nextState = new NextTask(nextTask)
        nextState.user = personID
        setNextTask(nextState)
    }


    function handleContact(contactID: string){
        const nextState = new NextTask(nextTask)
        nextState.contact = contactID
        setNextTask(nextState)
    }


    function handleExpectResult(e: ChangeEvent<HTMLTextAreaElement>){
        const nextState = new NextTask(nextTask)
        nextState.description = e.target.value
        setNextTask(nextState)
    }



    return (
        <div className='report report-container wrapper overlay'>
            <div className='wrapper-header'>
                <div className='report-title title'>Отчет по задаче</div>
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
                            value={report.fields.UF_FIELD_RESULT}
                            placeholder={'Отчет по задаче'}
                            onChange={handleReportChange}
                        />
                    </div>
                    <div className='ui-form-row'>
                        <Checkbox label='цель достигнута' checked={report.fields.UF_FIELD_SUCCESS}
                                  onChange={handleSuccess}/>
                    </div>
                    <div className='ui-form-row'>
                        <Checkbox label='Закрыть вчерашней датой' checked={report.taskClosePrevDate}
                                  onChange={handleClosePrevDay}/>
                    </div>

                    <div className='ui-form-row'>
                        <Text>{updateTimeLabel(report.fields.UF_FIELD_TIME)}</Text>
                        <Range full min={1} max={12} value={report.fields.UF_FIELD_TIME} onChange={handleSpentTime}/>
                    </div>

                    {!!nextTask && (
                        <div className='next-task-container'>
                            <div className='ui-form-row'>
                                <Text>Запланировать далее:</Text>
                                <Select full options={[{value: 1, label:'asd'}]} onChange={nextDeal}/>
                            </div>
                            <div className='ui-form-row'>
                                <Text>Срок:</Text>
                                <DateSelect value={nextTask.deadLine.toISOString()} onChange={handleSelectDate}/>
                            </div>

                            <div className='ui-form-row'>
                                <Checkbox label='Важная задача' checked={nextTask.important} onChange={handleImportant}/>
                            </div>
                            <div className='ui-form-row'>
                                <Checkbox label='Срочная задача' checked={nextTask.urgent} onChange={handleUrgent}/>
                            </div>
                            <div className='ui-form-row'>
                                <Text>Сотрудник</Text>
                                <Select full options={[]} value={nextTask.user} onChange={handleResponsiblePerson}/>
                            </div>
                            <div className='ui-form-row'>
                                <Text>Контактное лицо</Text>
                                <Select full options={[]} value={nextTask.contact} onChange={handleContact}/>
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
                        </div>
                    )}

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

