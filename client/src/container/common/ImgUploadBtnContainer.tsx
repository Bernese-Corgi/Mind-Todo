import React, { useState } from 'react';
import { ImgUploadBtn } from 'components/common';

interface ImgUploadBtnContainerProps {
  id: string;
  label: string;
  name?: string;
  className?: string;
}

const ImgUploadBtnContainer = ({
  id,
  name,
  label,
  className,
}: ImgUploadBtnContainerProps) => {
  const [fileInfo, setFileInfo] = useState(null);

  const handleChangeFileInput = () => {};

  return (
    <>
      <ImgUploadBtn id={id} name={name} label={label} className={className} />
    </>
  );
};

export default ImgUploadBtnContainer;
