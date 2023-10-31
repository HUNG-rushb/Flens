import './Select.css'

const Select = ({options, type, ...props}) => {
  return (
    <select className={`select select--${type}`} {...props} >
      {options.map((item) => (
        <option key={item.id}>{item.value}</option>
      ))}
    </select>
  );
};

export default Select;
