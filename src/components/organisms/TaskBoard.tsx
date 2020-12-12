import React, { FC } from 'react';
import TaskItem from 'components/molecules/TaskItem';
import { Task } from 'containers/templates/TodoWidget';

type Props = {
  todoList: { [id: string]: Task };
};

const TaskBoard: FC<Props> = ({ todoList }) => (
  <>
    <h1>Todoリスト</h1>
    <ul>
      {Object.values(todoList).map(
        ({ id = '', title = '', deadline = undefined }) => (
          <TaskItem key={id} title={title} deadline={deadline} />
        ),
      )}
    </ul>
  </>
);

export default TaskBoard;
