import React from 'react';
import { toast } from 'react-toastify';

const ExampleComponent = () => {

const handleClick = ()=>{
  toast.info('Success!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}
  return (
    <div >
      <button onClick={handleClick}>show</button>
    </div>
  );
}

export default ExampleComponent;