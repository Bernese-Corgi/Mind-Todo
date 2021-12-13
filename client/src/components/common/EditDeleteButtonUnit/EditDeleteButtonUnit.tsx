import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import { changeFirstStrToUpper } from 'utils/stringUtils';
import { Button, DeleteDialog, EditTextArea } from '..';
import { EditDeleteButtonUnitWrapper } from './EditDeleteButtonUnit.styled';

export interface EditDeleteIconButtonsUnitProps {
  hoverEffect?: boolean;
}

interface EditDeleteButtonUnitProps {
  id: string;
  mode: string;
  editName?: string;
  editVal?: string;
  completed?: boolean;
  editRef?: RefObject<HTMLTextAreaElement>;
  errorMsg?: string;
  delDialogText?: string;
  updateLink?: string;
  iconMode?: boolean;
  hasDelButton?: boolean;
  onChangeEdit?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string;
}

const EditDeleteButtonUnit = ({
  id,
  mode,
  editName,
  editVal,
  completed,
  editRef,
  errorMsg,
  delDialogText,
  updateLink,
  iconMode = false,
  hasDelButton = true,
  hoverEffect = true,
  onChangeEdit,
  onEdit,
  onRemove,
  className,
}: EditDeleteButtonUnitProps & EditDeleteIconButtonsUnitProps) => {
  const modeToUpper = changeFirstStrToUpper(mode);

  const [isEdit, setIsEdit] = useState(false);
  const [hasDialog, setHasDialog] = useState(false);

  const handleClicks = {
    confirmUpdate: () => {
      onEdit && onEdit();
      setIsEdit(false);
    },
    setEdit: () => {
      setIsEdit(true);
      editRef && editRef.current?.focus();
    },
    openDialog: () => {
      setHasDialog(true);
    },
    closeDialog: () => {
      setHasDialog(false);
    },
  };

  useEffect(() => {
    if (editRef?.current) {
      const { scrollHeight } = editRef.current as HTMLTextAreaElement;
      (editRef.current as HTMLTextAreaElement).style.height =
        scrollHeight + 'px';
    }
  }, [editRef]);

  return (
    <EditDeleteButtonUnitWrapper
      className={className}
      hoverEffect={hoverEffect}>
      {iconMode ? (
        // icon mode
        <>
          {editName && editVal && (
            <EditTextArea
              id={id}
              name={editName}
              errorMsg={errorMsg}
              placeholder="내용을 입력하세요."
              readOnly={!isEdit}
              completed={completed}
              value={editVal}
              ref={editRef}
              onChange={onChangeEdit}
              className="editTextArea"
              preventEnter="both"
            />
          )}
          <div className="iconBtnWrapper">
            {isEdit ? (
              <>
                <Button
                  id={`confirm${modeToUpper}Btn`}
                  title="변경 사항 저장하기"
                  shape="confirm"
                  onClick={handleClicks.confirmUpdate}
                  className="confirmUpdateBtn iconBtn"
                />
              </>
            ) : (
              <Button
                id={`update${modeToUpper}Btn`}
                title={`${mode} 수정하기`}
                shape="edit"
                onClick={handleClicks.setEdit}
                className="setEditBtn iconBtn"
              />
            )}
            {hasDelButton && (
              <Button
                id={`remove${modeToUpper}`}
                title={`${mode} 삭제하기`}
                shape="delete"
                onClick={handleClicks.openDialog}
                className="removeBtn iconBtn"
              />
            )}
          </div>
        </>
      ) : (
        // string mode
        <div className="stringBtnWrapper">
          <Button
            linkTo={updateLink}
            id={`update${modeToUpper}Btn`}
            title={`${mode} 수정하기`}
            children="수정"
            className="updateBtn"
          />
          <Button
            id={`remove${modeToUpper}Btn`}
            title={`${mode} 삭제하기`}
            children="삭제"
            className="removeBtn"
            onClick={handleClicks.openDialog}
          />
        </div>
      )}
      {hasDialog && (
        <DeleteDialog
          visible={hasDialog}
          delDialogText={delDialogText}
          onClose={handleClicks.closeDialog}
          onConfirmDelete={onRemove}
        />
      )}
    </EditDeleteButtonUnitWrapper>
  );
};

export default EditDeleteButtonUnit;
