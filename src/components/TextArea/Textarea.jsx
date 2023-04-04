import './Textarea.css'

const TextAreacustom = ({type, placeholder, value, ...props}) => {
    return <textarea className={`TextArea Textarea--${type}`} placeholder={placeholder} {...props} />
}

export default TextAreacustom;