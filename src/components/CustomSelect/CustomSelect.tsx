import React from 'react';
import Select, {GroupBase, Props, StylesConfig} from "react-select";


export function CustomSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {

    const colourStyles: StylesConfig<Option, IsMulti, Group> = {
        container: (style) => ({...style, display:'block', backgroundColor: 'var(--bg-main)', width: '100%'}),
        control: (styles) => ({
            ...styles,
            backgroundColor: 'var(--bg-main)',
            borderColor: 'var(--text-accent-color)'
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? 'var(--text-accent-color)': 'var(--bg-main)',
                color: isSelected ? 'var(--btn-color)': 'var(--text-color)',
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled ? 'var(--text-accent-color)': 'var(--bg-main)',
                },
            };
        },
        input: (styles) => ({ ...styles, backgroundColor: 'transparent'}),
        placeholder: (styles) => ({ ...styles, color: 'var(--text-color-secondary)' }),
        singleValue: (styles, { data }) => ({ ...styles, color:'var(--text-color)' }),
    };

    return (
        <Select {...props} styles={colourStyles} />
    );
}

export default CustomSelect;