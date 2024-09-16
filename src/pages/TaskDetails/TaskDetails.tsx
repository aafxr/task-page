import React from 'react';
import {useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {useTask} from "../../hooks";

export function TaskDetails() {
    const {taskID} = useParams()
    const task = useTask(taskID)
    const s = useAppContext()

    return (
        <div className='taskDetails wrapper'>
            <div className='wrapper-header'>
                Детали
            </div>
            <div className='wrapper-content'></div>
            <div className='wrapper-footer'></div>
        </div>
    );
}

