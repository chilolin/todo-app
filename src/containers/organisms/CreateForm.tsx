import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { firebaseTaskCreated } from 'firebase/utils';
import { taskCreated } from 'features/todo/todoSlice';
import CreateForm from 'components/organisms/CreateForm';

const EnhancedCreateForm: FC = () => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdTask, setCreatedTask] = useState<{
    title: string;
    deadline?: string;
  }>({
    title: '',
    deadline: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setIsUnmounted(false);

    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const { title, deadline } = createdTask;

  const handleTaskCreatedSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const id = await firebaseTaskCreated(createdTask);
      if (!isUnmounted) {
        dispatch(taskCreated({ id, ...createdTask }));
      }

      setCreatedTask({
        title: '',
        deadline: '',
      });
    } catch (error: unknown) {
      throw new Error(`Create Task Error`);
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
