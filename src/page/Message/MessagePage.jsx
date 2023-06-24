import React, { useState } from 'react';

const MessagePage = () => {
  const [tests, setTests] = useState([
    {
      id: 1,
      value: 'aa',
    },
    {
      id: 2,
      value: 'afdfa',
    },
  ]);
  const handleOnchange = (event) => {
    setValue({
      id: tests[tests.length - 1].id + 1,
      value: value,
    });
    console.log('change', value);
  };
  const handleOnkeyDown = (event) => {
    console.log(event.target.value)
    console.log('key downn', event.key);
  };

  const [value, setValue] = useState({
    id: 0,
    value: '',
  });

  return (
    <div>
      <h1>Message page</h1>
      <div>
        {tests.map((item) => {
          return <div key={item.id}>{item.value}</div>;
        })}
      </div>
      <input
        type="text"
        onChange={(e) => handleOnchange(e)}
        onKeyDown={(e) => handleOnkeyDown(e)}
        value={value.value}
      />
    </div>
  );
};

export default MessagePage;
