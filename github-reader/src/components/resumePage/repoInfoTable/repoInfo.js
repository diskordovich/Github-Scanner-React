import React, { useState } from "react";

export default function RepoInfo(props){    
    return(
        <div>
            <h3>Name:{props.props.name}</h3>
            <p>Created at:{props.props.created_at}</p>
        </div>
    )
}