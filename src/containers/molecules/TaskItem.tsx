import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { firebaseTaskDone, firebaseTaskTodo } from 'firebase/utils';
import { taskDone, taskTodo } from 'features/todo/todoSlice';
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
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsUnmounted(false);

    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const handleTaskDone = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseTaskDone(id);
      if (!isUnmounted) {
        dispatch(taskDone(id));
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskTodo = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseTaskTodo(id);
      if (!isUnmounted) {
        dispatch(taskTodo(id));
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskItem
      {...{
        isLoading,
        isError,
        id,
        title,
        deadline,
        isDone,
        handleTaskDone,
        handleTaskTodo,
      }}
    />
  );
};

export default EnhancedTaskItem;
