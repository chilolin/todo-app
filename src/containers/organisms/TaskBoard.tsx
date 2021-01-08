import React, { FC } from 'react';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import TaskBoard from 'components/organisms/TaskBoard';

const EnhancedTaskBoard: FC = () => {
  const { isLoading, todoList, doneList } = useFetchTaskList();

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
