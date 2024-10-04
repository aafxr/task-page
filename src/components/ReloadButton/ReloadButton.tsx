import React, {HTMLAttributes} from 'react';
import clsx from "clsx";

import {ReloadIcon} from "../svg";

import './ReloadButton.css'


interface ReloadButtonProps extends HTMLAttributes<HTMLButtonElement>{}


export function ReloadButton(props: ReloadButtonProps) {
    return (
        <button {...props} className={clsx('reload', props.className)}>
            <ReloadIcon className='icon icon-reload' />
            Обновить
        </button>
    );
}

