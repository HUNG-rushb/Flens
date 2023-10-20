import './Select.css'

const SelectCustom = ({options, type, ...props}) => {
  return (
    <select className={`select-custom select--${type}`} {...props} >
      {options.map((item) => (
        <option key={item.id}>{item.value}</option>
      ))}
    </select>
  );
};

export default SelectCustom;
