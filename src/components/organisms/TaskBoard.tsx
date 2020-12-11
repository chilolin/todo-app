import React, { FC } from 'react';
import TaskItem from 'components/molecules/TaskItem';

type Task = {
  id: string;
  title: string;
  deadline?: Date;
  createdAt: Date;
};

type Props = {
  todoList: Task[];
};

const TaskBoard: FC<Props> = ({ todoList }) => (
  <>
    <h1>Todoリスト</h1>
    <ul>
      {todoList.map(({ id = '', title = '', deadline = undefined }) => (
        <TaskItem key={id} title={title} deadline={deadline} />
      ))}
    </ul>
  </>
);

export default TaskBoard;
