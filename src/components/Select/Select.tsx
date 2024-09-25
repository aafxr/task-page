import clsx from "clsx";
import React, {ChangeEvent, useState} from 'react';


import './Select.css'

type SelectOption <T extends number | string> = {
    label: string;
    value: T;
}


type SelectProps  <T extends number | string> = {
    full?: boolean
    className?: string;
    options?: SelectOption<T>[]
    placeholder?: string
    value?: T
    onChange?: (value: T) => unknown
}

export const Select = <T extends number | string>({
                                                className, options = [], placeholder = '', value, onChange = () => {}, full
                                            }: SelectProps<T>) => {
    const [selectedValue, setSelectedValue] = useState<T | undefined>(value);


    function handleChange(e: ChangeEvent<HTMLSelectElement>){
        const v = e.target.value
        const option = options.find(o => o.value == v)
        if(option) handleSelect(option)

    }


    const handleSelect = (option: SelectOption<T>) => {
        setSelectedValue(option.value);
        onChange(option.value);
    };

    console.log(selectedValue)

    return (
        <select
            className={clsx("bx-select", {full}, className)}
            value={selectedValue?.toString()}
            onChange={handleChange}
        >
            {options.map((o, i) => (
                <option key={i} value={o.value?.toString()}>{o.label}</option>
            ))}

        </select>

    );
};