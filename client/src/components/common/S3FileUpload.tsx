import React, { useState } from 'react';
import * as d3 from 'd3';
import { useS3Bucket } from 'utils/hooks';

/* ------------------------------- upload 컴포넌트 ------------------------------ */
const S3FileUpload = () => {
  const { servS3Obj, Bucket } = useS3Bucket();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [key, setKey] = useState('');

  const handleChangeFileInput = e => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop(); // 파일 확장자

    // 파일 확장자 에러
    // if (file.type !== 'image/jpeg' || fileExt !== 'jpg') {
    //   alert('jpg 파일만 업로드 가능합니다.');
    //   return;
    // }

    setProgress(0);
    setSelectedFile(file);
  };

  // TODO upload file 함수 -> utils로 분리
  const uploadFile = file => {
    console.log(file);
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: Bucket!,
      ContentType: file.mimetype,
      Key: file.name,
    };

    servS3Obj
      .putObject(params)
      .on('httpUploadProgress', e => {
        setProgress(Math.round(e.loaded / e.total) * 100);
        setTimeout(() => {
          setSelectedFile(null);
        }, 3000);
      })
      .send((error, data) => {
        if (error) {
          console.log(error);
        }
        console.log(data);
      });
  };

  const getFilesByKey = key => {
    const params = {
      Bucket: Bucket!,
      Key: key,
    };

    // servS3Obj.getObject(params, (error, data) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log(data);
    //   // fs.writeFileSync('', data.Body!.toString());
    // });

    servS3Obj.getSignedUrl('getObject', params, (error, url) => {
      if (error) {
        console.log(error);
      }
      console.log(url);
    });
  };

  const getAllFiles = () => {
    servS3Obj.listObjectsV2({ Bucket: Bucket! }, (err, data) => {
      let lists: any[] = [];

      if (err) {
        console.log(err);
      }

      console.log(data);

      let contents = data.Contents;

      contents?.forEach(content => {
        lists.push(content.Key);
      });

      console.log(lists);
    });
  };

  return (
    <>
      <div style={{ margin: '1em', background: '#badadd' }}>
        <div>업로드 진행률: {progress}</div>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleChangeFileInput}
        />
        <button
          onClick={() => uploadFile(selectedFile)}
          style={{
            background: '#ecd4c2',
            padding: '0.3em',
            borderRadius: '5px',
            margin: '0.3em',
          }}>
          Upload to S3
        </button>
      </div>
      <div style={{ margin: '1em', background: '#bedead' }}>
        <label htmlFor="getFilesByKey">AWS에 저장된 key 문자열 </label>
        <input
          type="text"
          id="getFilesByKey"
          style={{ border: '1px solid black' }}
          onChange={e => setKey(e.target.value)}
        />
        <button
          onClick={() => getFilesByKey(key)}
          style={{
            background: '#ecd4c2',
            padding: '0.3em',
            borderRadius: '5px',
            margin: '0.3em',
          }}>
          get data
        </button>
      </div>
      <div style={{ margin: '1em', background: '#9cb4b3' }}>
        <button
          onClick={() => getAllFiles()}
          style={{
            background: '#ecd4c2',
            padding: '0.3em',
            borderRadius: '5px',
            margin: '0.3em',
          }}>
          get all files
        </button>
      </div>
      <div>
        <button onClick={() => uploadBlobImage()}>blob 객체 보내기</button>
      </div>
    </>
  );
};

export default S3FileUpload;
