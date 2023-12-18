import React from 'react'
import "./Button.css"

const Button = ({ text, type="", disabled=false, ...props }) => {
    console.log("is disabled", disabled)
    return <button className={`Button button--${type}`} {...props} disabled={disabled} >
        {text}
    </button>
}

export default Button;