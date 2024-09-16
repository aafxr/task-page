import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../context/AppContext";
import {useTask} from "../../hooks";
import {Button} from "../../components/Button";

export function TaskDetails() {
    const navigate = useNavigate()
    const {taskID} = useParams()
    const task = useTask(taskID)
    const s = useAppContext()


    function handleBackClick(){
        navigate('/')
    }


    return (
        <div className='taskDetails wrapper'>
            <div className='wrapper-header'>
                <div className='taskDetails-title title'>
                    Детали
                </div>
            </div>
            <div className='wrapper-content'></div>
            <div className='wrapper-footer'>
                <div className='footer-btns'>
                    <Button full onClick={handleBackClick}>Назад</Button>
                </div>
            </div>
        </div>
    );
}

