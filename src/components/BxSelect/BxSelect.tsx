import clsx from "clsx";
import React, { useState } from 'react';


import './BxSelect.css'

type BitrixSelectOption = {
    label: string;
    value: string;
}


type BitrixSelectProps = {
    className?: string;
    options?:BitrixSelectOption[]
    placeholder?:string
    value?:string
    onChange?: (text: string) => unknown
}

export const BxSelect = ({ className, options = [], placeholder = '', value = '', onChange = () => {} }: BitrixSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '');

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSelect = (option: BitrixSelectOption) => {
        setSelectedValue(option.value);
        onChange(option.value);
        handleClose();
    };

    return (
        <div className={clsx("bx-select", className)}>
            <div className="bx-select-input" onClick={handleOpen}>
                {selectedValue || placeholder}
                <span className="bx-select-arrow"></span>
            </div>
            {isOpen && (
                <ul className="bx-select-dropdown">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={selectedValue === option.value ? 'bx-select-dropdown-item active' : 'bx-select-dropdown-item'}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};