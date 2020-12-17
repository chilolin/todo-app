import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import TaskBoard from 'components/organisms/TaskBoard';

import { TaskList } from 'containers/templates/Todo';

type Props = {
  todoList: TaskList;
  doneList: TaskList;
  taskDone: (id: string) => void;
  taskTodo: (id: string) => void;
};

const EnhancedTaskBoard: FC<Props> = ({
  todoList = {},
  doneList = {},
  taskDone = () => undefined,
  taskTodo = () => undefined,
}) => {
  const history = useHistory();
  const toCreatePageHandleClick: () => void = () => {
    history.push('/create');
  };

  return (
    <TaskBoard
      {...{
        todoList,
        doneList,
        taskDone,
        taskTodo,
        toCreatePageHandleClick,
      }}
    />
  );
};

export default EnhancedTaskBoard;
