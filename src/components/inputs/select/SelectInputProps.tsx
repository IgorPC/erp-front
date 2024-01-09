interface SelectInputProps {
    options: optionsProps[],
    name: string,
    callback: Function,
    value?: optionsProps
}

interface optionsProps {
    field: string,
    value: string
}


export default SelectInputProps