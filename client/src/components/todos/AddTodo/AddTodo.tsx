import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, EditTextArea } from 'components/common';
import { StyledAddTodoForm } from './AddTodo.styled';

interface AddTodoProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const AddTodo = ({ onSubmit }: AddTodoProps) => {
  const initialValues = {
    content: '',
  };

  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState('');

  const handleChangeAddTodoInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO dispatch()
  };

  return (
    <StyledAddTodoForm onSubmit={onSubmit}>
      <EditTextArea
        id="todoAddInput"
        name="content"
        value={values.content}
        errorMsg={error}
        onChange={handleChangeAddTodoInput}
      />
      <Button
        type="submit"
        id="todoAddBtn"
        title="할 일 추가하기"
        shape="plus"
        className="todoAddBtn"
      />
    </StyledAddTodoForm>
  );
};

export default AddTodo;
