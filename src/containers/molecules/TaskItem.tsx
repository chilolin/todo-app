import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseTaskConvert } from 'firebase.utils';

import todoSlice from 'features/todo';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { taskDone, taskTodo } = todoSlice.actions;

  const handleTaskDoneClick = async () => {
    setIsLoading(true);
    try {
      await firebaseTaskConvert(id, 'todoList', 'doneList');
      dispatch(taskDone(id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  const handleTaskTodoClick = async () => {
    setIsLoading(true);
    try {
      await firebaseTaskConvert(id, 'doneList', 'todoList');
      dispatch(taskTodo(id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  return (
    <TaskItem
      {...{
        id,
        title,
        deadline,
        isLoading,
        isDone,
        handleTaskDoneClick,
        handleTaskTodoClick,
      }}
    />
  );
};

export default EnhancedTaskItem;
