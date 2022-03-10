import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, EditTextArea } from 'components/common';
import { StyledAddTodoForm } from './AddTodo.styled';

interface AddTodoProps {
  onAddTodo: (content: string) => void;
}

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const addInputRef = useRef<HTMLTextAreaElement>(null);

  const [isEdit, setIsEdit] = useState(false);

  const [contentVal, setContentVal] = useState('');
  const [error, setError] = useState('');

  const handleChangeAddTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentVal(e.target.value);
    setError('');
  };

  const handleFocusEdit = () => {
    setError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contentVal) {
      setError('내용을 입력해주세요.');
      return;
    }

    onAddTodo(contentVal);

    setContentVal('');
    addInputRef.current?.focus();
  };

  const handleClicks = {
    openAddTodo: () => {
      setIsEdit(true);
    },
    closeAddTodo: () => {
      setIsEdit(false);
    },
  };

  useEffect(() => {
    if (isEdit) {
      addInputRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <StyledAddTodoForm onSubmit={handleSubmit}>
      {isEdit ? (
        <EditTextArea
          id="todoAddInput"
          name="content"
          value={contentVal}
          errorMsg={error}
          className="addTodoTextArea"
          errorClassName="errorTextArea"
          onChange={handleChangeAddTextArea}
          onFocus={handleFocusEdit}
          ref={addInputRef}
        />
      ) : (
        <Button
          id="openAddTodo"
          title="할 일 작성 창 열기"
          round="round"
          onClick={handleClicks.openAddTodo}
          children="할 일 작성"
          className="openBtn"
        />
      )}
      {isEdit && (
        <>
          <Button
            type="submit"
            id="todoAddBtn"
            title="할 일 추가하기"
            shape="plus"
            className="todoAddBtn"
          />
          <Button
            id="closeAddTodo"
            title="창 닫기"
            onClick={handleClicks.closeAddTodo}
            shape="cancel"
            className="closeBtn"
          />
        </>
      )}
    </StyledAddTodoForm>
  );
};

export default AddTodo;
