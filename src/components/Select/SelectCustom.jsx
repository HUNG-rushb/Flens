import './SelectCustom.css'

const SelectCustom = ({options, type}) => {
  return (
    <select className={`select-custom select--${type}`}>
      {options.map((item) => (
        <option key={item.id}>{item.value}</option>
      ))}
    </select>
  );
};

export default SelectCustom;
