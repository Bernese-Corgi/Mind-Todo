import React, { ChangeEvent, useRef, useState } from 'react';
import { StyledNodeNameEditUnit } from './NodeName.styled';

interface NodeNameProps {
  nodeName?: string;
  isRoot: boolean;
  errorMsg?: string;
  onEdit: {
    nodeName: (updateNodeName: string) => void;
    mindmapTitle: (updateMindmapTitle: string) => void;
  };
  onRemove: {
    nodeName: () => void;
    mindmapTitle: () => void;
  };
}

const NodeName = ({
  nodeName,
  isRoot,
  errorMsg,
  onEdit,
  onRemove,
}: NodeNameProps) => {
  const deleteDialogText = isRoot
    ? '마인드맵 전체가 삭제됩니다.\n정말 모두 삭제하시겠습니까?'
    : '정말 노드를 삭제하시겠습니까?\ntodo와 post가 모두 삭제됩니다.';

  const initialName = nodeName ? nodeName : '';

  const [nameVal, setNameVal] = useState(initialName);

  const editRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNameVal(e.target.value);
  };

  const handleEditAction = () => {
    isRoot ? onEdit.mindmapTitle(nameVal) : onEdit.nodeName(nameVal);
  };

  const handleRemoveAction = () => {
    isRoot ? onRemove.mindmapTitle() : onRemove.nodeName();
  };

  return (
    <StyledNodeNameEditUnit
      id="editNodeName"
      mode="node"
      editName="name"
      editVal={nameVal}
      editRef={editRef}
      errorMsg={errorMsg}
      delDialogText={deleteDialogText}
      iconMode={true}
      hoverEffect={false}
      onChangeEdit={handleChangeEdit}
      onEdit={handleEditAction}
      onRemove={handleRemoveAction}
      className="nodeNameWrapper"
    />
  );
};

export default NodeName;
