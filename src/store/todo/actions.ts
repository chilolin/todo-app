import {
  Task,
  TaskList,
  FETCH_TODO_LIST,
  FETCH_DONE_LIST,
  TASK_CREATED,
  TASK_DONE,
  TASK_TODO,
  TASK_UPDATED,
  TASK_DELETED,
  TodoActionTypes,
} from 'store/todo/types';

export const fetchTodoList = (todoList: TaskList): TodoActionTypes => ({
  type: FETCH_TODO_LIST,
  payload: todoList,
});

export const fetchDoneList = (doneList: TaskList): TodoActionTypes => ({
  type: FETCH_DONE_LIST,
  payload: doneList,
});

export const taskCreated = (
  createdTask: Omit<Task, 'createdAt'>,
): TodoActionTypes => ({
  type: TASK_CREATED,
  payload: createdTask,
});

export const taskDone = (id: string): TodoActionTypes => ({
  type: TASK_DONE,
  payload: id,
});

export const taskTodo = (id: string): TodoActionTypes => ({
  type: TASK_TODO,
  payload: id,
});

export const taskUpdated = (
  updatedTask: Omit<Task, 'createdAt'>,
): TodoActionTypes => ({
  type: TASK_UPDATED,
  payload: updatedTask,
});

export const taskDeleted = (id: string): TodoActionTypes => ({
  type: TASK_DELETED,
  payload: id,
});
