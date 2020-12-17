import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseTaskCreated } from 'firebase.utils';

import CreateForm from 'components/organisms/CreateForm';

import { Task } from 'containers/templates/Todo';

const EnhancedCreateForm: FC<{
  taskCreated: (task: Omit<Task, 'createdAt'>) => void;
}> = ({ taskCreated = () => undefined }) => {
  const [createdTask, setCreatedTask] = useState<{
    title: string;
    deadline: string;
  }>({
    title: '',
    deadline: '',
  });
  const history = useHistory();

  const taskCreatedHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => void = async (e) => {
    e.preventDefault();
    try {
      const id = await firebaseTaskCreated('todoList', createdTask);
      taskCreated({ id, ...createdTask });
      history.push('/');
      setCreatedTask({
        title: '',
        deadline: '',
      });
    } catch (error) {
      console.error(error);
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

  return (
    <CreateForm
      {...{ title, deadline, taskCreatedHandleSubmit, handleChange }}
    />
  );
};

export default EnhancedCreateForm;
