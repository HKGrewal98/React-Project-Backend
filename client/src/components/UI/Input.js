import React from "react";
import classes from './Input.module.css'

export default function Input(props){ 
   
    const onChangeHandler = (event) => {
            console.log("Input that entered is : " + JSON.stringify(event.target.value))
            if(event.target.value === ''){
                return
            }
            props.onChange(event.target.value)
    }

    return (
                <div className={classes.input}>
                    <label htmlFor={props.input.id}>{props.label}</label>
                    <input {...props.input} onChange={onChangeHandler}/>
                </div>
    )

}