import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { TodoState } from 'features/todo';

import TaskBoard from 'components/organisms/TaskBoard';

const EnhancedTaskBoard: FC = () => {
  const todoList = useSelector((state: TodoState) => state.todoList);
  const doneList = useSelector((state: TodoState) => state.doneList);

  return (
    <TaskBoard
      {...{
        todoList,
        doneList,
      }}
    />
  );
};

export default EnhancedTaskBoard;
