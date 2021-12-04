import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Button, CheckBox, Dialog, EditTextArea } from 'components/common';
import theme from 'styles/theme';
import { removeDialogStyle, TodoItemWrapper } from './TodoItem.styled';

interface TodoItemProps {
  todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const editInput = useRef<HTMLTextAreaElement>(null);
  const initialValues = {
    content: todo.content,
    done: todo.done,
  };
  const initialErrors = {
    content: '',
    done: false,
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const [isFocus, setIsFocus] = useState(false);
  const [hasDialog, setHasDialog] = useState(false);

  /* ------------------------------ change event ------------------------------ */
  const handleToggleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, done: !values.done });
    // TODO dispatch toggle todo
  };

  const handleChangeEditTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });

    // TODO dispatch toggle todo
  };

  /* ------------------------------- click event ------------------------------ */
  const handleClicks = {
    confirmBtn: () => {
      if (!values.content) {
        setErrors({ ...errors, content: '내용을 입력하세요' });
        editInput.current?.focus();
        return;
      }
      setIsFocus(false);
    },
    editBtn: () => {
      setIsFocus(true);
      editInput.current?.focus();
    },
    deleteBtn: () => {
      setHasDialog(true);
    },
    closeDialogBtn: () => {
      setHasDialog(false);
    },
    dialogDeletBtn: () => {
      // TODO dispatch delete
      setHasDialog(false);
    },
  };

  /* ----------------------------- key press event ---------------------------- */
  const handleKeyPressCheckBox = (e: KeyboardEvent<HTMLLabelElement>) => {
    // if (e.key === 'Enter') onToggle(todo.id);
  };

  console.log(values);

  return (
    <TodoItemWrapper>
      {/* TODO checkbox */}
      <CheckBox
        id="toggleTodo"
        name="done"
        title={values.done ? '완료되지 않음 표시하기' : '완료됨 표시하기'}
        shape="circle"
        color={theme.colors.gray.base}
        // value={todo.done? 'complete'}
        checked={values.done}
        onChange={handleToggleCheckBox}
        onKeyPress={handleKeyPressCheckBox}
      />
      {/* TODO input */}
      <EditTextArea
        id="editTodoInput"
        name="content"
        value={values.content}
        errorMsg={errors.content}
        ref={editInput}
        readOnly={!isFocus}
        done={values.done}
        onChange={handleChangeEditTextArea}
        // onKeyPress={handleKeyPressEditTextArea}
        preventEnter="soft"
      />
      {/* TODO edit button */}
      {/* TODO confirm button */}
      <div className="todoItemBtnWrapper">
        {isFocus ? (
          <Button
            id="confirmBtn"
            title="수정 완료"
            shape="confirm"
            onClick={handleClicks.confirmBtn}
            color={theme.colors.gray.base}
            className="confirmEditBtn"
          />
        ) : (
          <Button
            id="editBtn"
            title="수정하기"
            shape="edit"
            onClick={handleClicks.editBtn}
            color={theme.colors.gray.base}
            className="editTodoBtn"
          />
        )}
        {/* TODO delete button */}
        <Button
          id="deleteBtn"
          title="삭제하기"
          shape="delete"
          onClick={handleClicks.deleteBtn}
          color={theme.colors.gray.base}
          className="deleteTodoBtn"
        />
      </div>
      {hasDialog && (
        <Dialog
          visible={hasDialog}
          onClose={handleClicks.closeDialogBtn}
          wrapperStyle={removeDialogStyle}
          onDimClickClose={() => {}}>
          <div className="dialogBody">
            <p>정말 삭제하시겠습니까?</p>
            <div className="dialogBtnWrapper">
              <Button
                id="cancleDialogBtn"
                title="취소하기"
                onClick={handleClicks.closeDialogBtn}
                children="취소"
                round="round"
              />
              <Button
                id="confirmDialogBtn"
                title="삭제하기"
                onClick={handleClicks.dialogDeletBtn}
                children="확인"
                round="round"
                primary
              />
            </div>
          </div>
        </Dialog>
      )}
    </TodoItemWrapper>
  );
};

export default TodoItem;
