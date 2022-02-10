import React from 'react';
import AWS from 'aws-sdk';

const useS3Bucket = () => {
  const {
    REACT_APP_S3_BUCKET,
    REACT_APP_S3_REGION,
    REACT_APP_S3_ACCESS_KEY,
    REACT_APP_S3_SECRET_ACCESS_KEY,
  } = process.env;

  // S3 정보 설정
  AWS.config.update({
    accessKeyId: REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
  });

  const servS3Obj = new AWS.S3({
    params: { Bucket: REACT_APP_S3_BUCKET },
    region: REACT_APP_S3_REGION,
  });

  const Bucket = REACT_APP_S3_BUCKET;

  return { servS3Obj, Bucket };
};

export default useS3Bucket;
