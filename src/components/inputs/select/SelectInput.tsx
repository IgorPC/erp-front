import React, { useState, useEffect } from "react"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import SelectInputProps from "./SelectInputProps";

const SelectInput: React.FC<SelectInputProps> = ({options, name, callback, value}) => {
    const id = `select-${name}`
    const [option, setOption] = useState({
        field: "",
        value: ""
    });

    const [optionValue, setOptionValue] = useState(option.value)
    
    useEffect(() => {
        if (options.length) {
            if (value) {
                setOption({
                    field: value.field,
                    value: value.value
                })
                setOptionValue(value.field)
            } else {
                setOption({
                    field: options[0].field,
                    value: options[0].value
                })
                setOptionValue(options[0].field)
            }
        }
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        const objectFound = options.find((object: any) => object.field === event.target.value);
 
        if (objectFound !== undefined) {
            setOption(objectFound)
            setOptionValue(objectFound.field)

            callback(objectFound)
        }
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id={`${id}-label`}>{name}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={`${id}-select`}
                    value={optionValue}
                    label={name}
                    onChange={handleChange}
                >
                    {
                        options.map((option: any) => {
                            return (
                                <MenuItem key={option.field} value={option.field}>{ option.value }</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectInput