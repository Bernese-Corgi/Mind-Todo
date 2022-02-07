import React, { ChangeEvent, useRef, useState } from 'react';
import { StyledFileInput, StyledFileLabel } from './ImgUploadBtn.styled';

interface ImgUploadBtnProps {
  id: string;
  label: string;
  name?: string;
  onGetImgInfo?: (x) => void;
  className?: string;
}

const ImgUploadBtn = ({
  id,
  name,
  label,
  onGetImgInfo,
  className,
}: ImgUploadBtnProps) => {
  const [imgBase64, setImgBase64] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGetImgInfo = (fileInfo?: File) => {
    // fileInputRef.current?.files
    // TODO 1. S3에 이미지 업로드
    // TODO 2. 업로드된 url 받기
    // TODO 3. 이미지 url 설정?
    console.log(fileInfo);
  };

  const onImgInputBtnClick = e => {
    e.preventDefault();
    // TODO file input의 ref를 통해 click 이벤트 발생
    fileInputRef.current?.click();
  };

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO onGetImgInfo : 상위에서 받는 함수에 인수로 file 정보 전달
    // onGetImgInfo && onGetImgInfo(fileInputRef.current?.files);
    // fileInputRef.current?.files &&
    // handleGetImgInfo(fileInputRef.current?.files[0]);
    // TODO file 정보를 넘기고, file 정보 초기화?

    /* ------------------------------------ d ----------------------------------- */

    const reader = new FileReader();
    e.target.files && reader.readAsDataURL(e.target.files[0]);
    console.log(reader);
    reader.onloadend = () => {
      //
      const base64 = reader.result;
      console.log(base64);
      if (base64) {
        const base64Sub = base64.toString();

        setImgBase64(prevImgBase64 => [...prevImgBase64, base64Sub]);
      }
    };
    // console.log(e.target.files);
    // .map((file, i) => {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   console.log(file);
    // });
  };

  return (
    <>
      <StyledFileLabel
        htmlFor={id}
        onClick={onImgInputBtnClick}
        className={className}>
        {label}
      </StyledFileLabel>
      <StyledFileInput
        ref={fileInputRef}
        id={id}
        name={name || 'file'}
        type="file"
        accept="image/*"
        onChange={handleChangeFileInput}
        className={className}
      />
    </>
  );
};

export default ImgUploadBtn;
