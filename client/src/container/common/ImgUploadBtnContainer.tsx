import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ImgUploadBtn } from 'components/common';
import { useS3Bucket } from 'utils/hooks';
import { useParams } from 'react-router';
import { AddPostParams } from 'components/posts/AddPost/AddPost';

interface ImgUploadBtnContainerProps {
  id: string;
  label: string;
  name?: string;
  className?: string;
  getUrlandSetInput?: (url: string) => void;
}

const ImgUploadBtnContainer = ({
  id,
  name,
  label,
  className,
  getUrlandSetInput,
}: ImgUploadBtnContainerProps) => {
  const { servS3Obj, Bucket } = useS3Bucket();

  const { nodeId } = useParams<AddPostParams>();

  const [fileInfo, setFileInfo] = useState<File>();
  const [key, setKey] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  /**
   * S3 버킷에 file 객체를 업로드하는 함수
   * @param file
   */
  const uploadFileToS3 = useCallback(
    file => {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: Bucket!,
        ContentType: file.mimetype,
        Key: key,
      };

      servS3Obj
        .putObject(params)
        .on('httpUploadProgress', e => {
          // TODO 로딩바 추가
        })
        .send((err, data) => {
          if (err) {
            console.error(err);
          }
        });
    },
    [Bucket, key, servS3Obj]
  );

  /**
   * S3 버킷에서 Key값으로 url을 받아온다.
   * @param key url을 받아올 key 값
   */
  const getS3ObjUrlByKey = useCallback(
    (key: string) => {
      const params = {
        Bucket: Bucket!,
        Key: key,
      };

      servS3Obj.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
          console.error(err);
        }
        setImageUrl(url);
      });
    },
    [Bucket, servS3Obj]
  );

  const handleChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target?.files!);
    // FIXME fileKey 수정 : 파일 이름이 중복될 수 있으므로 이 부분 수정
    const fileKey = `${nodeId}_${files[0].name}`;

    setKey(fileKey);
    setFileInfo(files[0]);
  };

  useEffect(() => {
    if (fileInfo) {
      uploadFileToS3(fileInfo);
    }
  }, [fileInfo, uploadFileToS3]);

  useEffect(() => {
    if (key !== '') {
      getS3ObjUrlByKey(key);
    }
  }, [getS3ObjUrlByKey, imageUrl, key]);

  useEffect(() => {
    if (imageUrl !== '') {
      // FIXME 호출되지 않음
      getUrlandSetInput && getUrlandSetInput(imageUrl);
    }
  }, [getUrlandSetInput, imageUrl]);

  return (
    <>
      <ImgUploadBtn
        id={id}
        name={name}
        label={label}
        className={className}
        onChangeFileInput={handleChangeFileInput}
      />
    </>
  );
};

export default ImgUploadBtnContainer;
