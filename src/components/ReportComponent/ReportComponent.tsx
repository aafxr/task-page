import React, {HTMLAttributes, useEffect, useState} from 'react';
import clsx from "clsx";
import {Task} from "../../classes/Task";


interface ReportComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>{
    task: Task
    onSubmit?: (t : Task) => unknown

}


export function ReportComponent({task, onSubmit,...props}: ReportComponentProps) {
    const [report, setReport] = useState('')


    useEffect(() => {

    })




    return (
        <div {...props} className={clsx('wrapper overlay', props.className)}>
            <div className='wrapper-header'></div>
            <div className='wrapper-content'></div>
            <div className='wrapper-footer'></div>
        </div>
    );
}

