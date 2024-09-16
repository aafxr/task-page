import React, {ChangeEvent, HTMLAttributes, useEffect, useState} from 'react';
import clsx from "clsx";
import {Task} from "../../classes/Task";
import {Container} from "../Container";
import {TextArea} from "../TextArea";
import {Button} from "../Button";


interface ReportComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
    task: Task
    onSubmit?: (t: Task) => unknown
    onClose?: () => unknown
}


export function ReportComponent({task, onSubmit, onClose, ...props}: ReportComponentProps) {
    const [report, setReport] = useState('')


    useEffect(() => {
        setReport(task.description)
    }, [task])


    function handleSave() {
        if (!onSubmit || report === task.description) return
        task.description = report
        onSubmit(task)
    }


    function handleReportChange(e: ChangeEvent<HTMLTextAreaElement>){
        setReport(e.target.value)
    }


    return (
        <div {...props} className={clsx('report report-container wrapper overlay', props.className)}>
            <div className='wrapper-header'>
                <Container>
                    <div className='report-title'>Отчет по задаче</div>
                </Container>
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
                    <Button onClick={onClose}>Закрыть</Button>
                </div>
            </div>
        </div>
    );
}

