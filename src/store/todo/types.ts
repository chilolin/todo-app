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

export const FETCH_TASK_LIST = 'todo/fetchTaskList';
export const TASK_CREATED = 'todo/taskCreated';
export const TASK_DONE = 'todo/taskDone';
export const TASK_TODO = 'todo/taskTodo';
export const TASK_UPDATED = 'todo/taskUpdated';
export const TASK_DELETED = 'todo/taskDeleted';

type FetchTaskListAction = {
  type: typeof FETCH_TASK_LIST;
  payload: { todoList: TaskList; doneList: TaskList };
};

type TaskCreatedAction = {
  type: typeof TASK_CREATED;
  payload: Omit<Task, 'createdAt'>;
};

type TaskDoneAction = {
  type: typeof TASK_DONE;
  payload: string;
};

type TaskTodoAction = {
  type: typeof TASK_TODO;
  payload: string;
};

type TaskUpdatedAction = {
  type: typeof TASK_UPDATED;
  payload: Omit<Task, 'createdAt'>;
};

type TaskDeletedAction = {
  type: typeof TASK_DELETED;
  payload: string;
};

export type TodoActionTypes =
  | FetchTaskListAction
  | TaskCreatedAction
  | TaskDoneAction
  | TaskTodoAction
  | TaskUpdatedAction
  | TaskDeletedAction;
