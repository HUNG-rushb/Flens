import config from '../_S3/S3.js';
import editName from '../utils/editName.js';
import AWS from 'aws-sdk';

// import React, { useState } from 'react';

const useUploadImageToAWS = () => {
  return async ({ selectedFile }) => {
    AWS.config.update({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    const myBucket = new AWS.S3({
      params: { Bucket: config.bucketName },
      region: config.region,
    });

    const params = {
      ACL: 'public-read',
      Body: selectedFile,
      Bucket: config.bucketName,
      Key: editName(
        selectedFile.name,
        '.',
        Math.floor(100000 + Math.random() * 900000).toString()
      ),
    };

    //   const [progress, setProgress] = useState(0);
    let result;
    await myBucket
      .upload(params)
      //   .on('httpUploadProgress', (evt) => {
      //     setProgress(Math.round((evt.loaded / evt.total) * 100));
      //   })
      .promise()
      .then((data) => {
        // console.log({ data });
        result = data;
      })
      .catch((err) => console.log(err));

    // console.log({ result });

    return result;
  };
};

export default useUploadImageToAWS;
