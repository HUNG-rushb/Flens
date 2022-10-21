import React, { useEffect } from 'react';

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return <>{children}</>;
};

export default Page;
