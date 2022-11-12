import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import config from '../../_S3/S3.js';

// const UploadImage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async (file) => {
//     uploadFile(file, config)
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileInput} />
//       <button onClick={() => handleUpload(selectedFile)}>Upload to S3</button>
//     </div>
//   );
// };

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const myBucket = new AWS.S3({
  params: { Bucket: config.bucketName },
  region: config.region,
});

const UploadImage = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: config.bucketName,
      Key: file.name,
    };

    myBucket
      .upload(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .promise()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}>Upload to S3</button>
    </div>
  );
};

export default UploadImage;
