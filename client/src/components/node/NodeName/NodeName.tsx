import React, { ChangeEvent, useRef, useState } from 'react';
import { StyledNodeNameEditUnit } from './NodeName.styled';

interface NodeNameProps {
  nodeName?: string;
  isRoot: boolean;
  errorMsg?: string;
  onEdit?: () => void;
  onRemove?: () => void;
}

const NodeName = ({
  nodeName,
  isRoot,
  errorMsg,
  onEdit,
  onRemove,
}: NodeNameProps) => {
  const deleteDialogText =
    '정말 노드를 삭제하시겠습니까?\n todo와 post가 모두 삭제됩니다.';

  const initialName = nodeName ? nodeName : '';

  const [nameVal, setNameVal] = useState(initialName);

  const editRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNameVal(e.target.value);
    onEdit && onEdit();
  };

  return (
    <StyledNodeNameEditUnit
      mode="node"
      editName="name"
      editVal={nameVal}
      editRef={editRef}
      errorMsg={errorMsg}
      delDialogText={deleteDialogText}
      iconMode={true}
      hasDelButton={!isRoot}
      hoverEffect={false}
      onChangeEdit={handleChangeEdit}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
};

export default NodeName;
