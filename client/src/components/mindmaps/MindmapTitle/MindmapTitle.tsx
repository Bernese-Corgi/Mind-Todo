import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useCompare } from 'utils/hooks';
import { StyledMindmapTitleEditUnit } from './MindmapTitle.styled';

interface MindmapTitleProps {
  title: string;
  onEdit: (updateMindmapTitle: string) => void;
  onRemove: () => void;
}

const MindmapTitle = ({ title, onEdit, onRemove }: MindmapTitleProps) => {
  const deleteDialogText =
    '마인드맵 전체가 삭제됩니다.\n정말 모두 삭제하시겠습니까?';

  const [titleVal, setTitleVal] = useState(title);
  const [titleError, setTitleError] = useState('');

  const mindmapTitleRef = useRef<HTMLTextAreaElement>(null);

  const hasValChanged = useCompare(titleVal);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTitleVal(value);

    if (titleVal.length > 30) {
      setTitleError('마인드맵 제목의 글자 수는 30자를 넘기지 않아야 합니다.');
    }

    if (titleVal && titleVal.length <= 30) {
      setTitleError('');
    }
  };

  const handleEdit = useCallback(() => {
    hasValChanged && onEdit(titleVal);
  }, [hasValChanged, onEdit, titleVal]);

  const handleRemove = () => onRemove();

  return (
    <>
      <StyledMindmapTitleEditUnit
        id="editMindmapTitle"
        mode="mindmap"
        editName="mindmapTitle"
        editVal={titleVal}
        editRef={mindmapTitleRef}
        errorMsg={titleError}
        delDialogText={deleteDialogText}
        iconMode={true}
        hoverEffect={false}
        onChangeEdit={handleChange}
        onEdit={handleEdit}
        onRemove={handleRemove}
        className="nodeNameWrapper"
      />
    </>
  );
};

export default MindmapTitle;
