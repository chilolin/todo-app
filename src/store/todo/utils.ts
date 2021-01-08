import { Task, TaskList, TodoState } from 'store/todo/types';

export const addTaskToTodoList = (
  todoList: TaskList,
  taskToAdd: Omit<Task, 'createdAt'>,
): TaskList => {
  const { id } = taskToAdd;
  const createdAt = new Date();

  todoList[id] = {
    ...taskToAdd,
    createdAt,
  };

  console.log(todoList);

  return todoList;
};

export const convertFromTodoListToDoneList = (
  state: TodoState,
  id: string,
): TodoState => {
  const task = state.todoList[id];

  if (task) {
    state.doneList[id] = { ...task };
    delete state.todoList[id];
  }

  console.log(state);

  return state;
};

export const convertFromDoneListToTodoList = (
  state: TodoState,
  id: string,
): TodoState => {
  const task = state.doneList[id];

  if (task) {
    state.todoList[id] = { ...task };
    delete state.doneList[id];
  }

  console.log(state);

  return state;
};

export const updateTaskInTodoList = (
  todoList: TaskList,
  taskToUpdate: Omit<Task, 'createdAt'>,
): TaskList => {
  const { id, ...data } = taskToUpdate;
  const task = todoList[id];

  if (task) todoList[id] = { ...task, ...data };

  return todoList;
};

export const removeTaskFromTodoList = (
  todoList: TaskList,
  id: string,
): TaskList => {
  const task = todoList[id];

  if (task) delete todoList[id];

  return todoList;
};
