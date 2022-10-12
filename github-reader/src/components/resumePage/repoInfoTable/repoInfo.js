import { Paper } from "@mui/material";
import React, { useState } from "react";

export default function RepoInfo(props){    
    return(
        <Paper sx={{padding:"10px", width:"90%", margin:"10px 0px"}}>
            <h3>Name:{props.props.name}</h3>
            <p>Created at:{props.props.created_at}</p>
        </Paper>
    )
}