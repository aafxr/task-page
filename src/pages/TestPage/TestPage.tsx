import React, {ChangeEvent, useRef} from 'react';
import {Title} from "../../components/Title";
import {Button} from "../../components/Button";

export function TestPage() {
    const inputRef = useRef<HTMLInputElement>(null)


    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        if(!inputRef.current) return
        const el = inputRef.current as HTMLInputElement
        const file = el.files?.item(0)
        if(!file) return
        //@ts-ignore
        window.files = window.files ? [...window.files, file] : [file]

    }


    function buttonClick(){
        if(!inputRef.current) return
        inputRef.current.click()
    }



    return (
        <div className='wrapper'>
            <div className='wrapper-header'>
                <Title>Тестовая страница</Title>
            </div>
            <div className='wrapper-content'>
                <Button onClick={buttonClick} full>click</Button>
                <input ref={inputRef} type="file" hidden onChange={handleInputChange} accept={'image/png, image/jpeg, image/jpg'}/>
            </div>
        </div>
    );
}

