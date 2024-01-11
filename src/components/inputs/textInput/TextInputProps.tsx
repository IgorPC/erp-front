interface TextInputProps {
    name: string,
    callback: Function,
    error: string,
    type: string
    disabled?: boolean
    value?: string,
    required?: boolean
}

export default TextInputProps