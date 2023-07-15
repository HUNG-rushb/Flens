import React, { useEffect, useState } from 'react';
import './Message.css'

const images = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/4641833/pexels-photo-4641833.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/5122188/pexels-photo-5122188.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/4444935/pexels-photo-4444935.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/802127/pexels-photo-802127.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    image:
      'https://cdn-cgbdj.nitrocdn.com/RbczMDpxKIrQLdqnZdHDBvZTsISICJjh/assets/desktop/optimized/rev-924eb12/9dtGwsIycVXveee92jc_VPBVRfa3nA0BOrIJ1rFe8we-I1I3hmSOUUqgrMxLQlfNJmoF9poKk_OWVzQz16fh8WdStb4V6f6InP5bw1-Z2N9DoBFIbjuC3UrOL--owH62gFWrpmOurPr9AYV-Ig',
  },
  {
    id: 6,
    image:
      'https://cdn-cgbdj.nitrocdn.com/RbczMDpxKIrQLdqnZdHDBvZTsISICJjh/assets/desktop/optimized/rev-924eb12/UznE8rmkOsVMZWrNASsuLvfYWe44Eo1s-ux69SzBNr2BNRVkhZNFM6GRfK__Bt4OOFCAHF4zXaLNFuvsQryhm7eD5HJv_innnKF88_rIsy3O6wYE4kdcHa0IP-xGRg6qwJBmOQi_GMV-F36uaA',
  },
];

function ImageZoom() {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [scale, setScale] = useState(1);
  const [cursor, setCursor] = useState('zoom-in');

  const handleImageClick = () => {
    setZoomedIn(!zoomedIn);
    if (zoomedIn) {
      setScale(1);
      setCursor('zoom-in');
    } else {
      setScale(1.2);
      setCursor('zoom-out');
    }
  };

  const handleMouseMove = (e) => {
    if (zoomedIn) {
      const { offsetX, offsetY, target } = e.nativeEvent;
      const { width, height } = target;
      const xPercentage = (offsetX / width) * 100;
      const yPercentage = (offsetY / height) * 100;
      target.style.transformOrigin = `${xPercentage}% ${yPercentage}%`;
    }
  };

  return (
    <div
      className={`image-container ${zoomedIn ? 'zoomed-in' : ''}`}
      onClick={handleImageClick}
      onMouseMove={handleMouseMove}
      style={{ cursor: cursor }}
    >
      <img src="https://images.pexels.com/photos/17539866/pexels-photo-17539866/free-photo-of-bi-n-n-c-lan-song-d-i-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Description" style={{ transform: `scale(${scale})` }} />
    </div>
  );
}

export default ImageZoom;
