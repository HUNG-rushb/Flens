import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import UseAnimations from "react-useanimations";
import heart from 'react-useanimations/lib/heart'

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

const ImageHasher = () => {
  const [similarImage, setSimilarImage] = useState([]);

  const handleFindSimilarImage = (image) => {
    const imageHash = CryptoJS.SHA256(image).toString();
    findSimilarImages(imageHash);
  };

  const findSimilarImages = (targetHash) => {
    const threshold = 5;

    images.forEach((image) => {
      const binary1 = targetHash
        .split('')
        .map((char) => parseInt(char, 16).toString(2).padStart(4, '0'))
        .join('');
      const imageHash = CryptoJS.SHA256(image.image).toString();
      const binary2 = imageHash
        .split('')
        .map((char) => parseInt(char, 16).toString(2).padStart(4, '0'))
        .join('');

        const hash1 = binary1.toString(CryptoJS.enc.Hex).slice(0, 64);
        const hash2 = binary2.toString(CryptoJS.enc.Hex).slice(0, 64);

      const hammingDistance = calculateHammingDistance(binary1, binary2);
      console.log(`Hamming distance: ${hammingDistance}`);
      if (hammingDistance <= threshold) {
        console.log(image);
      }
    });
  };

  const calculateHammingDistance = (hash1, hash2) => {
    console.log("bin1",hash1,'-',hash1.length,"bin2",hash2,'-',hash2.length)
    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) {
        distance++;
      }
    }
    return distance;
  };

  return (
    <div>
      {images.map((image, index) => (
        <img
          src={image.image}
          alt=""
          width={200}
          key={index}
          onClick={() => handleFindSimilarImage(image.image)}
        />
      ))}
      <UseAnimations animation={heart} size={56} />
    </div>
  );
};

export default ImageHasher;
