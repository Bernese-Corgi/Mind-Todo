import { ChangeEvent, RefObject, useState } from 'react';
import { changeFirstStrToUpper } from 'utils/stringUtils';
import { Button, DeleteDialog, EditTextArea } from '..';
import { EditDeleteButtonUnitWrapper } from './EditDeleteButtonUnit.styled';

export interface EditDeleteIconButtonsUnitProps {
  hoverEffect?: boolean;
}

interface EditDeleteButtonUnitProps {
  mode: string;
  editName?: string;
  editVal?: string;
  completed?: boolean;
  editRef?: RefObject<HTMLTextAreaElement>;
  errorMsg?: string;
  updateLink?: string;
  iconMode?: boolean;
  hasDelButton?: boolean;
  onChangeEdit?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onEdit?: () => void;
  onRemove?: () => void;
  calssName?: string;
}

const EditDeleteButtonUnit = ({
  mode,
  editName,
  editVal,
  completed,
  editRef,
  errorMsg,
  updateLink,
  iconMode = false,
  hasDelButton = true,
  hoverEffect = true,
  onChangeEdit,
  onEdit,
  onRemove,
  calssName,
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

  return (
    <EditDeleteButtonUnitWrapper hoverEffect={hoverEffect}>
      {iconMode ? (
        // icon mode
        <>
          {editName && editVal && (
            <EditTextArea
              id={`edit${modeToUpper}TextArea`}
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
          onClose={handleClicks.closeDialog}
          onConfirmDelete={onRemove}
        />
      )}
    </EditDeleteButtonUnitWrapper>
  );
};

export default EditDeleteButtonUnit;
