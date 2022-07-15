import chroma from "chroma-js";
import { StylesConfig } from "react-select";
import { ColourOption } from "./data";

export const TagSelectStyle: StylesConfig<ColourOption, true> = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: 'white',
        border: state.isFocused ? '2px solid #D67097' : '2px solid hsl(0, 0%, 80%)',
        boxShadow: state.isFocused ? '0 0 0 1px #D67097' : undefined,
        ':active': {
            ...styles[':active'],
            border: '2px solid #D67097',
        },
        ':focus': {
            ...styles[':focus'],
            border: "2px solid #D67097",
        },
        ':hover': {
            ...styles[':hover'],
            border: "2px solid #D67097",
        },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isSelected
                ? 'rgb(245, 237, 235)'
                : isFocused
                    ? 'rgb(245, 237, 235)'
                    : undefined,
            color: isSelected
                ? chroma.contrast(color, 'white') > 2
                    ? 'white'
                    : 'black'
                : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
            },
        };
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css(),
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white',
        },
    }),
};

export const DateSelectStyle: StylesConfig = {
    control: (styles, state) => ({
        ...styles,
        backgroundColor: 'white',
        border: state.isFocused ? '2px solid #D67097' : '2px solid hsl(0, 0%, 80%)',
        boxShadow: state.isFocused ? '0 0 0 1px #D67097' : undefined,
        ':active': {
            ...styles[':active'],
            border: '2px solid #D67097',
        },
        ':focus': {
            ...styles[':focus'],
            border: "2px solid #D67097",
        },
        ':hover': {
            ...styles[':hover'],
            border: "2px solid #D67097",
        },
    }),
    option: (styles, { isDisabled, isSelected, isFocused }) => {
        return {
            ...styles,
            backgroundColor:isSelected
                    ? chroma('#D67097').alpha(0.4).css()
                    : isFocused
                        ? 'rgb(245, 237, 235)'
                        : undefined,
            color: '#000',
            ':active': {
                ...styles[':active'],
                backgroundColor: chroma('#D67097').alpha(0.7).css(),
            }
        };
    },
}