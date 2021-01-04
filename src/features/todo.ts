import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: string;
  title: string;
  deadline?: string;
  createdAt: Date;
};

export type TaskList = {
  [id: string]: Task;
};

export type TodoState = {
  todoList: TaskList;
  doneList: TaskList;
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: { todoList: {}, doneList: {} } as TodoState,
  reducers: {
    fetchTodoList: (state, action: PayloadAction<TaskList>) => {
      state.todoList = action.payload;
    },
    fetchDoneList: (state, action: PayloadAction<TaskList>) => {
      state.doneList = action.payload;
    },
    taskCreated: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
      const { id } = action.payload;
      const createdAt = new Date();
      state.todoList[id] = { ...action.payload, id, createdAt };
    },
    taskDone: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.todoList[id];

      if (task) {
        state.doneList[id] = { ...task };
        delete state.todoList[id];
      }
    },
    taskTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.doneList[id];

      if (task) {
        state.todoList[id] = { ...task };
        delete state.doneList[id];
      }
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
