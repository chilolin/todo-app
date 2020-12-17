import React, { FC } from 'react';

import TaskItem from 'containers/molecules/TaskItem';

import { TaskList } from 'containers/templates/Todo';

type Props = {
  todoList: TaskList;
  doneList: TaskList;
  taskDone: (id: string) => void;
  taskTodo: (id: string) => void;
  toCreatePageHandleClick: () => void;
};

const TaskBoard: FC<Props> = ({
  todoList = {},
  doneList = {},
  taskDone = () => undefined,
  taskTodo = () => undefined,
  toCreatePageHandleClick = () => undefined,
}) => (
  <>
    <h1>Todoリスト</h1>
    <button type="button" onClick={toCreatePageHandleClick}>
      追加する
    </button>
    <ul>
      {Object.values(todoList).map(({ id = '', title = '', deadline = '' }) => (
        <TaskItem key={id} {...{ id, title, deadline, taskDone }} />
      ))}
    </ul>
    <h1>Doneリスト</h1>
    <ul>
      {Object.values(doneList).map(({ id = '', title = '', deadline = '' }) => (
        <TaskItem key={id} {...{ id, title, deadline, taskTodo }} isDone />
      ))}
    </ul>
  </>
);

export default TaskBoard;
