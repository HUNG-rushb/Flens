import React, { useRef, useEffect, useState } from 'react';

function ExampleComponent() {
  const componentRef = useRef(null);
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsClickedOutside(true);  
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={componentRef}>
      <h1>Example Component</h1>
      <p onClick={()=>setIsClickedOutside(false)}>Click outside this component to detect the click.</p>
      <p>Clicked outside: {isClickedOutside ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ExampleComponent;