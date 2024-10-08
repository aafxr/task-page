import React, {TextareaHTMLAttributes} from 'react';
import clsx from "clsx";

import './TextArea.css'


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}


export function TextArea(props: TextAreaProps) {
    return <textarea {...props} className={clsx('textarea', props.className)} />
}

