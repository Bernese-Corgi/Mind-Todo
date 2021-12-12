import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TodoType } from 'utils/api/todos';
import { CheckBox, EditDeleteButtonUnit } from 'components/common';
import { TodoItemWrapper } from './TodoItem.styled';
import theme from 'styles/theme';

interface TodoItemProps {
  todo: TodoType;
  onToggle: (todoId: string, completed: boolean) => void;
  onEdit: (todoId: string, content: string) => void;
  onDelete: (todoId: string) => void;
}

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const todoId = todo?._id;
  const { content, completed } = todo;

  const editRef = useRef<HTMLTextAreaElement>(null);

  const initialContent = content ? content : '';

  const [contentVal, setContentVal] = useState(initialContent);
  const [contentError, setContentError] = useState('');

  /* ------------------------------ change event ------------------------------ */
  const handleToggleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    todoId && completed !== undefined && onToggle(todoId, completed);
  };

  const handleChangeEditTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentVal(e.target.value);
    setContentError('');
  };

  /* ------------------------------- click event ------------------------------ */
  const handleClicks = {
    confirmEditBtn: () => {
      if (!contentVal) {
        setContentError('내용을 입력하세요');
        editRef.current?.focus();
        return;
      }

      todoId && onEdit(todoId, contentVal);
    },
    confirmDelBtn: () => {
      todoId && onDelete(todoId);
    },
  };

  /* ----------------------------- key press event ---------------------------- */
  const handleKeyPressCheckBox = (e: KeyboardEvent<HTMLLabelElement>) => {
    // if (e.key === 'Enter') onToggle(todo.id);
  };

  useEffect(() => {
    const { scrollHeight } = editRef.current as HTMLTextAreaElement;
    (editRef.current as HTMLTextAreaElement).style.height = scrollHeight + 'px';
  }, []);

  return (
    <TodoItemWrapper>
      <CheckBox
        id="toggleTodo"
        name="completed"
        title={completed ? '완료되지 않음 표시하기' : '완료됨 표시하기'}
        shape="circle"
        color={theme.colors.gray.base}
        checked={completed}
        onChange={handleToggleCheckBox}
        onKeyPress={handleKeyPressCheckBox}
      />
      <EditDeleteButtonUnit
        mode="todo"
        editName="content"
        editVal={contentVal}
        completed={completed}
        editRef={editRef}
        errorMsg={contentError}
        iconMode
        hasDelButton
        onChangeEdit={handleChangeEditTextArea}
        onEdit={handleClicks.confirmEditBtn}
        onRemove={handleClicks.confirmDelBtn}
      />
    </TodoItemWrapper>
  );
};

export default TodoItem;
