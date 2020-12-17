import React, { FC } from 'react';

type Props = {
  title: string;
  deadline?: string;
  isDone?: boolean;
  toUpdatePageHandleClick: () => void;
  taskDoneHandleClick: () => void;
  taskTodoHandleClick: () => void;
};

const TaskItem: FC<Props> = ({
  title = '',
  deadline = undefined,
  isDone = false,
  toUpdatePageHandleClick = () => undefined,
  taskDoneHandleClick = () => undefined,
  taskTodoHandleClick = () => undefined,
}) => (
  <li>
    <span>{title}</span>
    <span> 期日{deadline}</span>
    {isDone ? (
      <button type="button" onClick={taskTodoHandleClick}>
        やってない
      </button>
    ) : (
      <>
        <button type="button" onClick={toUpdatePageHandleClick}>
          編集する
        </button>
        <button type="button" onClick={taskDoneHandleClick}>
          やった！
        </button>
      </>
    )}
  </li>
);

export default TaskItem;
