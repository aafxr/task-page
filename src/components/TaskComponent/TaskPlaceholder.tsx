import React from 'react';

import './Task.css'


type RowPlaceholderProps = {
    percent?: number
}


function RowPlaceholder({percent = 1}: RowPlaceholderProps){
    return <div className='row-placeholder' style={{width: percent * 100 + '%'}}/>
}



export function TaskPlaceholder() {
    return (
        <div className='taskPlaceholder'>
            <div className='placeholder-flash'/>
            <div className='taskPlaceholder-left'>
                <RowPlaceholder />
            </div>
            <div className='taskPlaceholder-right'>
                <RowPlaceholder percent={0.4} />
                <RowPlaceholder percent={0.7} />
                <RowPlaceholder percent={0.5} />
                <RowPlaceholder percent={0.8} />
            </div>
        </div>
    );
}

