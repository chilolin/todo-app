import React, { FC } from 'react';
import TaskBoard from 'components/organisms/TaskBoard';
import CreateForm from 'containers/organisms/CreateForm';
import UpdateForm from 'containers/organisms/UpdateForm';
import { Task } from 'containers/templates/TodoWidget';

export type TodoWidgetProps = {
  todoList: { [id: string]: Task };
  taskCreate: (createdTask: { title: string; deadline: string }) => void;
  taskUpdate: (updatedTask: {
    id: string;
    title: string;
    deadline: string;
  }) => void;
  taskDelete: (deleteId: string) => void;
};

const TodoWidget: FC<TodoWidgetProps> = ({
  todoList,
  taskCreate = () => undefined,
  taskUpdate = () => undefined,
  taskDelete = () => undefined,
}) => (
  <>
    <TaskBoard todoList={todoList} />
    <CreateForm taskCreate={taskCreate} />
    <UpdateForm taskUpdate={taskUpdate} taskDelete={taskDelete} />
  </>
);

export default TodoWidget;
