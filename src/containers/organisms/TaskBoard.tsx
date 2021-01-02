import React, { FC } from 'react';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import TaskBoard from 'components/organisms/TaskBoard';

const EnhancedTaskBoard: FC = () => {
  const { isLoading, doneList, todoList } = useFetchTaskList();

  return (
    <TaskBoard
      {...{
        isLoading,
        doneList,
        todoList,
      }}
    />
  );
};

export default EnhancedTaskBoard;
