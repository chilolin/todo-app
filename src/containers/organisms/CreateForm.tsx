import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { firebaseTaskCreated } from 'firebase.utils';
import { todoSlice } from 'features/todo';
import CreateForm from 'components/organisms/CreateForm';

const EnhancedCreateForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdTask, setCreatedTask] = useState<{
    title: string;
    deadline?: string;
  }>({
    title: '',
    deadline: '',
  });
  const dispatch = useDispatch();

  const { taskCreated } = todoSlice.actions;
  const { title, deadline } = createdTask;

  const handleTaskCreatedSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const id = await firebaseTaskCreated(createdTask);
      dispatch(taskCreated({ id, ...createdTask }));

      setCreatedTask({
        title: '',
        deadline: '',
      });
    } catch (error) {
      throw new Error('error create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setCreatedTask({ ...createdTask, [name]: value });
  };

  return (
    <CreateForm
      {...{ isLoading, title, deadline, handleTaskCreatedSubmit, handleChange }}
    />
  );
};

export default EnhancedCreateForm;
