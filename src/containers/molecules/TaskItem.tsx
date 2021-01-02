import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { firebaseTaskConvert } from 'firebase.utils';
import { todoSlice } from 'features/todo';
import TaskItem from 'components/molecules/TaskItem';

type Props = {
  id: string;
  title: string;
  deadline?: string;
  isDone?: boolean;
};

const EnhancedTaskItem: FC<Props> = ({
  id = '',
  title = '',
  deadline = undefined,
  isDone = false,
}) => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const { taskDone, taskTodo } = todoSlice.actions;

  const handleTaskDoneClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseTaskConvert(id, 'todoList', 'doneList');
      if (!isUnmounted) {
        dispatch(taskDone(id));
      }
    } catch (error) {
      throw new Error('error task done');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskTodoClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseTaskConvert(id, 'doneList', 'todoList');
      if (!isUnmounted) {
        dispatch(taskTodo(id));
      }
    } catch (error) {
      throw new Error('error task todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskItem
      {...{
        isLoading,
        id,
        title,
        deadline,
        isDone,
        handleTaskDoneClick,
        handleTaskTodoClick,
      }}
    />
  );
};

export default EnhancedTaskItem;
