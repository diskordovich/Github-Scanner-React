import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function NameForm() {
    const [value, setValue] = useState("")
    const navigate = useNavigate()

    function handleChange(event) {
        setValue(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log(value)
        navigate(value)
    }

    
    return(
        <form onSubmit={handleSubmit} className="inputForm">
            <TextField onChange={handleChange} value={value} type="text" id="name" label="Your github name" variant="outlined" />
            <Button type="submit" variant="contained">Submit!</Button>
        </form>
    )
}