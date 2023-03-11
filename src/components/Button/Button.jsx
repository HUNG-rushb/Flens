import React from 'react'

import "./Button.scss"

const Button = ({ text, type="", onClick }) => {
    const handleClick = () => {
        onClick && onClick();
    }

    return <div className={`Button button--${type}`} onClick={() => handleClick} >
        {text}
    </div>
}

export default Button;