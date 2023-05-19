import './SelectCustom.css'

const SelectCustom = ({options, type, selected, handleOnChange}) => {
  return (
    <select className={`select-custom select--${type}`} value={selected} onChange={handleOnChange}>
      {options.map((item) => (
        <option key={item.id}>{item.value}</option>
      ))}
    </select>
  );
};

export default SelectCustom;
