import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseTaskCreated } from 'firebase.utils';

import todoSlice from 'features/todo';

import CreateForm from 'components/organisms/CreateForm';

const EnhancedCreateForm: FC = () => {
  const { taskCreated } = todoSlice.actions;
  const dispatch = useDispatch();
  const [createdTask, setCreatedTask] = useState<{
    title: string;
    deadline?: string;
  }>({
    title: '',
    deadline: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleTaskCreatedSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => void = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const id = await firebaseTaskCreated('todoList', createdTask);
      dispatch(taskCreated({ id, ...createdTask }));
      setIsLoading(false);
      setCreatedTask({
        title: '',
        deadline: '',
      });
    } catch (error) {
      setIsError(true);
    }
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCreatedTask({ ...createdTask, [name]: value });
  };

  const { title, deadline } = createdTask;

  return isError ? (
    <div>エラーが発生しました。</div>
  ) : (
    <CreateForm
      {...{ isLoading, title, deadline, handleTaskCreatedSubmit, handleChange }}
    />
  );
};

export default EnhancedCreateForm;
