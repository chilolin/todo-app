import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import { RootState } from 'store';
import TaskBoard from 'components/organisms/TaskBoard';

const EnhancedTaskBoard: FC = () => {
  const { isLoading } = useFetchTaskList();
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const doneList = useSelector((state: RootState) => state.todo.doneList);
  console.log(todoList, doneList);

  return (
    <TaskBoard
      {...{
        isLoading,
        todoList,
        doneList,
      }}
    />
  );
};

export default EnhancedTaskBoard;
