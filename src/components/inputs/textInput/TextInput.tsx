import TextField from '@mui/material/TextField';
import React, { useState } from "react"
import TextInputProps from './TextInputProps';

const TextInput: React.FC <TextInputProps> = ({value, name, callback, error, type, disabled}) => {
    //const [value, setValue] = useState("")

    const handleValue = (event: any) => {
        callback(event.target.value)
    }

    const id = `text-input-${name}`
    
    return (
        <TextField value={value} disabled={disabled} helperText={error} error={error ? true : false} onChange={handleValue} style={{ width: '100%' }} id={id} type={type} label={name} variant="outlined" />
    )
}

export default TextInput