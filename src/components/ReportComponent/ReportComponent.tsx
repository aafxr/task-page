import React, {HTMLAttributes, useEffect, useState} from 'react';
import clsx from "clsx";
import {Task} from "../../classes/Task";
import {Container} from "../Container";
import {TextArea} from "../TextArea";


interface ReportComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>{
    task: Task
    onSubmit?: (t : Task) => unknown

}


export function ReportComponent({task, onSubmit,...props}: ReportComponentProps) {
    const [report, setReport] = useState('')


    useEffect(() => {

    })




    return (
        <div {...props} className={clsx('report report-container wrapper overlay', props.className)}>
            <div className='wrapper-header'>
                <Container>
                    <div className='report-title'>Отчет по задаче</div>
                </Container>
            </div>
            <div className='wrapper-content'>
                <Container>
                    <TextArea className='report-text' />
                </Container>
            </div>
            <div className='wrapper-footer'></div>
        </div>
    );
}

