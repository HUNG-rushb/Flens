import './SelectCustom.css'

const SelectCustom = ({options}) => {
  return (
    <select className='select-custom'>
      {options.map((item) => (
        <option key={item.id}>{item.value}</option>
      ))}
    </select>
  );
};

export default SelectCustom;
