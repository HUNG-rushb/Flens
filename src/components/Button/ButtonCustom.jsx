import React from 'react'
import "./ButtonCustom.css"

const Button = ({ text, type="", ...props }) => {
    return <button className={`Button button--${type}`} {...props} >
        {text}
    </button>
}

export default Button;