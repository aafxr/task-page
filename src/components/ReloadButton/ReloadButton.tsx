import React, {HTMLAttributes} from 'react';
import clsx from "clsx";


interface ReloadButtonProps extends HTMLAttributes<HTMLDivElement>{}


export function ReloadButton(props: ReloadButtonProps) {
    return (
        <button className={clsx('reload', props.className)}>
            <ReloadButton className='icon icon-reload' />
            Обновить
        </button>
    );
}

