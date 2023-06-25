import React, { useState } from 'react';

const MessagePage = () => {
  const [test, setTest] = useState([
    'aa','bb'
  ]);

  const [valueArray, setValueArray] = useState([]);
  const [value, setValue] = useState('');

  const handleOnchange = (event) => {
    setValue({
      id: test[test.length - 1].id + 1,
      value: value,
    });
  };

  const handleOnkeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('press enter');
      valueArray.push(value);
      setValueArray(valueArray);
      setValue('');
      console.log(valueArray);
    }
  };

  return (
    <div>
      <h1>Message page</h1>
      <div>
        {test.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
      <input
        type="text"
        placeholder="Input a tag and press enter"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => handleOnkeyDown(e)}
        value={value}
      />
    </div>
  );
};

export default MessagePage;
