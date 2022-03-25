import { WriteActionBtn } from 'components/common';
import React from 'react';
import { WriteMindmapBtnWrapper } from './WriteMindmapBtn.styled';

interface WriteMindmapBtnProps {
  onOpenDialog?: () => void;
}

const WriteMindmapBtn = ({ onOpenDialog }: WriteMindmapBtnProps) => {
  return (
    <WriteMindmapBtnWrapper>
      <WriteActionBtn
        id="openAddMindmapDialog"
        title="마인드맵 생성 다이얼로그 열기"
        descText="아직 나의 마인드맵이 없습니다. 생성하시겠습니까?"
        btnText="마인드맵 생성하기"
        onClick={onOpenDialog}
      />
    </WriteMindmapBtnWrapper>
  );
};

export default WriteMindmapBtn;
