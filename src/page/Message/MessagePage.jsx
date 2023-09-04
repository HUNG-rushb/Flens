import Cake from './allImage/cake.jpeg';
import Dog1 from './allImage/dog1.jpg';
import Dog2 from './allImage/dog2.jpg';
import Dog3 from './allImage/dog3.jpeg';
import Dog4 from './allImage/dog4.jpeg';
import Tree2 from './allImage/tree2.jpeg';
import Tree from './allImage/tree.jpeg';
import { createCanvas } from 'canvas';
import React, { useState, useEffect } from 'react';

const allImagesList = [
  {
    id: 1,
    image: Tree,
  },
  {
    id: 2,
    image: Tree2,
  },
  {
    id: 3,
    image: Cake,
  },
  {
    id: 4,
    image: Dog1,
  },
  {
    id: 5,
    image: Dog2,
  },
  {
    id: 6,
    image: Dog3,
  },
  {
    id: 7,
    image: Dog4,
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
  const [imageHashList, setImageHashList] = useState([]);
  const [selectedImageHash, setSelectedImageHash] = useState('');
  const [similarList, setSimilarList] = useState([])

  const selectedImage = (image) => {
    const img = new Image(image);
    img.onload = () => {
      const width = 128;
      const height = 128;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;
      const phash = calculatePHash(imageData, width, height);
      setSelectedImageHash(phash);
    };
    img.src = image.image;
    findSimilarImage(image);
  };

  const findSimilarImage = (image) => {
    let similarList = [];
    imageHashList.map((item) => { 
      const threshold = 100;
      const hammingDistance = calculateHammingDistance(
        selectedImageHash,
        item.phash
      );
      console.log(hammingDistance)
      if (hammingDistance < threshold) {
        similarList.push(item);
      }
    });
    setSimilarList(similarList);
  };
  console.log(similarList)

  const calculateHammingDistance = (hash1, hash2) => {
    console.log("length", hash1.length, hash2.length)
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
          resolve({ id: image.id,image: image.image, phash });
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
      {allImagesList.map((image) => (
        <img
          src={image.image}
          alt=""
          key={image.id}
          width={200}
          onClick={() => selectedImage(image)}
        />
      ))}
      similar list
      { similarList.map((image) => (
        <img
          src={image.image}
          alt=""
          key={similarList.indexOf(image)}
          width={200}
          onClick={() => selectedImage(image)}
        />
      ))}
    </div>
  );
};

export default ImagePhashCalculator;
