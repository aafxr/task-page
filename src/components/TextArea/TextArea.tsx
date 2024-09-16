import React, {HTMLAttributes} from 'react';
import clsx from "clsx";


interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement>{}


export function TextArea(props: TextAreaProps) {
    return <textarea {...props} className={clsx('textarea', props.className)} />
}

