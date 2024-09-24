import React, {HTMLAttributes} from 'react';
import clsx from "clsx";

import './Title.css'

export function Title(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={clsx('pageTitle', props.className )}>
            {props.children}
        </div>
    );
}

