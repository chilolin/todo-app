import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { firebaseTaskUpdated, firebaseTaskDeleted } from 'firebase.utils';

import UpdateForm from 'components/organisms/UpdateForm';

import { Task, TaskList } from 'containers/templates/Todo';

type Props = {
  todoList: TaskList;
  taskUpdated: (task: Omit<Task, 'createdAt'>) => void;
  taskDeleted: (id: string) => void;
};

const EnhancedUpdateForm: FC<Props> = ({
  todoList = {},
  taskUpdated = () => undefined,
  taskDeleted = () => undefined,
}) => {
  const { taskId } = useParams<{ taskId: string }>();
  const [updatedTask, setUpdatedTask] = useState<{
    title: string;
    deadline?: string;
  }>({
    title: todoList[taskId]?.title,
    deadline: todoList[taskId]?.deadline,
  });
  const history = useHistory();

  const taskUpdatedHandleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => void = async (e) => {
    e.preventDefault();
    try {
      await firebaseTaskUpdated('todoList', { id: taskId, ...updatedTask });
      taskUpdated({ id: taskId, ...updatedTask });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const taskDeletedHandleClick: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void = async (e) => {
    e.preventDefault();
    try {
      await firebaseTaskDeleted('todoList', taskId);
      taskDeleted(taskId);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const { title, deadline } = updatedTask;

  return (
    <UpdateForm
      {...{
        title,
        deadline,
        taskUpdatedHandleSubmit,
        taskDeletedHandleClick,
        handleChange,
      }}
    />
  );
};

export default EnhancedUpdateForm;
