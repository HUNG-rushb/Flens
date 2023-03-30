import './Input.css'

const InputCustom = ({type, value, ...props}) => {
    return <input type={type} value={value} {...props} />
}

export default InputCustom;