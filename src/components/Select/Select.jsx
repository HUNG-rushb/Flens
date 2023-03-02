import './Select.css'

const SelectCustom = ({options}) => {
  return (
    <select className='select-custom'>
      {options.map((item) => (
        <option>{item.value}</option>
      ))}
    </select>
  );
};

export default SelectCustom;
