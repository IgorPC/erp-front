interface SelectInputProps {
    options: optionsProps[],
    name: string,
    callback: Function
}

interface optionsProps {
    field: string,
    value: string
}


export default SelectInputProps