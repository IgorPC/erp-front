interface TextInputProps {
    name: string,
    callback: Function,
    error: string,
    type: string
    disabled?: boolean
    value?: string
}

export default TextInputProps