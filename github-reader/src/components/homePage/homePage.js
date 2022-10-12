import React from "react";
import "./homePage.css"
import NameForm from "../nameForm/nameForm";

export default class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});  
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div className="mainDiv">
                <div className="name">
                    <h1>GitHub</h1>
                    <h2>Spy</h2>
                </div>
                <NameForm/>
            </div>
        )
    }
}