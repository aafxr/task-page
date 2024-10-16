import React, {useEffect, useState} from 'react';

import {PlusIcon} from "../svg";

import './AlertMessage.css'

const EVENT_NAME = 'errorMessage'


export function dispatchAlert(message: string){
    const event = new CustomEvent(EVENT_NAME, {detail: {message}})
    document.dispatchEvent(event)
}



export function AlertMessage() {
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        const onError = (e: Event) => {
            setMessages(p => [...p, (e as CustomEvent).detail.message])
        }
        document.addEventListener(EVENT_NAME, onError)
        return () => {document.removeEventListener(EVENT_NAME, onError)}
    }, []);


    function handleCloseAlert(idx: number){
        const newState = [...messages]
        newState.splice(idx, 1)
        setMessages(newState)
    }


    return (
        <div className='alerts'>
            {messages.map((a, i) => (
                <div key={i} className='alert-item'>
                    <div className='alert-item-close'  onClick={() => handleCloseAlert(i)}>
                        <PlusIcon className='icon' />
                    </div>
                    {a}
                </div>
            ))}
        </div>
    );
}

