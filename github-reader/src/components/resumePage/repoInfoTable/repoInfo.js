import { Paper } from "@mui/material";
import React from "react";

export default function RepoInfo(props){    
    return(
        <Paper sx={{padding:"10px", width:"90%", margin:"10px 0px"}}>
            <h3><a href={props.props.html_url}>Name:{props.props.name}</a></h3>
            <p>Created at:{props.props.created_at}</p>
        </Paper>
    )
}