import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {Container} from "../../components/Container";
import {TextArea} from "../../components/TextArea";
import {Button} from "../../components/Button";
import {useTask} from "../../hooks";
import {ErrorService, TaskService} from "../../services";

export function TaskEditePage() {
    const navigate = useNavigate()
    const {taskID} = useParams()
    const s = useAppContext()
    const task = useTask(taskID)
    const [report, setReport] = useState('')


    useEffect(() => {
        if (!task) return
        setReport(task.description)
    }, [task])


    function handleSave(e: React.UIEvent) {
        e.stopPropagation()
        if (!task) return
        if (report === task.description) return
        task.description = report
        TaskService.update(s, task)
            .then(() => navigate('/'))
            .catch(ErrorService.handleError(s))
    }


    function handleReportChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setReport(e.target.value)
    }


    const handleCloseClick = (e: React.UIEvent) => {
        e.stopPropagation()
        navigate('/')
    }


    return (
        <div className='report report-container wrapper overlay'>
            <div className='wrapper-header'>
                <div className='report-title title'>Отчет по задаче</div>
            </div>
            <div className='wrapper-content'>
                <Container className='report-content'>
                    <TextArea
                        className='report-text'
                        value={report}
                        placeholder={'Отчет по задаче'}
                        onChange={handleReportChange}
                    />
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

