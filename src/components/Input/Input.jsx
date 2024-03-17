import './Input.css'

const Input = ({type, value, ...props}) => {
    return <input type={type} value={value} {...props} />
}

export default Input;