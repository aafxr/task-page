import React, {HTMLAttributes} from 'react';
import clsx from "clsx";


interface ReportComponentProps extends HTMLAttributes<HTMLDivElement>{}


export function ReportComponent({...props}: ReportComponentProps) {
    return (
        <div {...props} className={clsx('wrapper overlay', props.className)}>
            <div className='wrapper-header'></div>
            <div className='wrapper-content'></div>
            <div className='wrapper-footer'></div>
        </div>
    );
}

