import { createCanvas } from 'canvas';
import React, { useState, useEffect } from 'react';

const allImagesList = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/803766/pexels-photo-803766.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/3715583/pexels-photo-3715583.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/2802418/pexels-photo-2802418.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const calculatePHash = (imageData, width, height) => {
  // Convert the image to grayscale
  const grayscalePixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * 4;
      const r = imageData[pixelIndex];
      const g = imageData[pixelIndex + 1];
      const b = imageData[pixelIndex + 2];
      const gray = 0.2989 * r + 0.587 * g + 0.114 * b; // Grayscale formula
      grayscalePixels.push(gray);
    }
  }

  // Calculate the DCT-based phash with 256 bits
  let hash = '';
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      let value = 0;
      const startX = x * (width / 16);
      const startY = y * (height / 16);
      for (let v = 0; v < height / 16; v++) {
        for (let u = 0; u < width / 16; u++) {
          const idx = (startY + v) * width + startX + u;
          const cosFactorU = Math.cos(((2 * u + 1) * x * Math.PI) / 32);
          const cosFactorV = Math.cos(((2 * v + 1) * y * Math.PI) / 32);
          const cosFactor = cosFactorU * cosFactorV;
          value += grayscalePixels[idx] * cosFactor;
        }
      }
      value *= x === 0 && y === 0 ? 1 / 32 : 1 / 16;
      hash += value >= 0 ? '1' : '0';
    }
  }

  return hash;
};

const ImagePhashCalculator = () => {
  const [phash, setPhash] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageHashList, setImageHashList] = useState([]);

  const handleImageSelection = (imageUrl) => {
    setSelectedImage(imageUrl);
    const img = new Image();
    img.onload = () => handleImageLoad(img);
    img.src = imageUrl;
  };

  const handleImageLoad = (img) => {
    const width = 128;
    const height = 128;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const phash = calculatePHash(imageData, width, height);
    setPhash(phash);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => handleImageLoad(img);
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateHammingDistance = (hash1, hash2) => {
    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) {
        distance++;
      }
    }

    console.log(distance);
    return distance;
  };

  useEffect(() => {
    const hashList = allImagesList.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const width = 128;
          const height = 128;
          const canvas = createCanvas(width, height);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height).data;
          const phash = calculatePHash(imageData, width, height);
          resolve({ id: image.id, phash });
        };
        img.src = image.image;
      });
    });

    Promise.all(hashList).then((hashes) => {
      setImageHashList(hashes);
    });
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {allImagesList.map((image) => (
        <img src={image.image} alt="" key={image.id} width={200} />
      ))}
      {phash && <div>Perceptual Hash (256-bit): {phash}</div>}
      <button onClick={() => calculateHammingDistance('', '')}>click</button>
    </div>
  );
};

export default ImagePhashCalculator;
