import React from 'react';

import {FileIcon, PlusIcon} from "../svg";

import './FilePreview.css'


type FilePreviewProps = {
    file: File,
    onRemove?: (f: File) => unknown
}

export function FilePreview({file, onRemove}: FilePreviewProps) {


    function handleRemoveFile(){
        onRemove?.(file)
    }


    return (
        <div className='filePreview'>
            <div className='filePreview-fileIcon'>
                <FileIcon className='icon' />
            </div>
            <div className='filePreview-name'>{file.name}</div>
            <div className='filePreview-removeIcon'>
                <PlusIcon className='icon' onClick={handleRemoveFile}/>
            </div>
        </div>
    );
}

