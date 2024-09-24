import React, {HTMLAttributes} from 'react';
import clsx from "clsx";

import './Text.css'

export function Text(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={clsx('ui-text', props.className)}>{props.children}</div>
    );
}

