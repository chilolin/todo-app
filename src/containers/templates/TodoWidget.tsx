/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useReducer } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';
import TodoWidget from 'components/templates/TodoWidget';

export type Task = {
  id: string;
  title: string;
  deadline?: string;
  createdAt: Date;
};

type TodoState = {
  todoList: { [id: string]: Task };
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: {} as TodoState,
  reducers: {
    taskCreated: (
      state,
      action: PayloadAction<Pick<Task, 'title' | 'deadline'>>,
    ) => {
      const id = uuid();
      const createdAt = new Date();
      state.todoList[id] = { ...action.payload, id, createdAt };
    },
    taskUpdated: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
      const { id, ...data } = action.payload;
      const task = state.todoList[id];

      if (task) state.todoList[id] = { ...task, ...data };
    },
    taskDeleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.todoList[id];

      if (task) delete state.todoList[id];
    },
  },
});

const EnhancedTodoWidget: FC<{ initialTodoList: { [id: string]: Task } }> = ({
  initialTodoList,
}) => {
  const [state, dispatch] = useReducer(
    todoSlice.reducer,
    initialTodoList,
    (todoList: { [id: string]: Task }): TodoState => ({ todoList }),
  );
  const { taskCreated, taskUpdated, taskDeleted } = todoSlice.actions;

  return (
    <TodoWidget
      todoList={state.todoList}
      taskCreate={(createdTask: { title: string; deadline: string }) =>
        dispatch(taskCreated(createdTask))
      }
      taskUpdate={(updatedTask: {
        id: string;
        title: string;
        deadline: string;
      }) => dispatch(taskUpdated(updatedTask))}
      taskDelete={(deleteId: string) => dispatch(taskDeleted(deleteId))}
    />
  );
};

export default EnhancedTodoWidget;
