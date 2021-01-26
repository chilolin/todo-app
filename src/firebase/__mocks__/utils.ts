import { Task, TaskList } from 'features/todo';

const task: Task = {
  id: '123',
  title: 'test-task',
  deadline: '2021-01-24',
  createdAt: new Date(2021, 1, 24, 22, 44),
};

const taskList: TaskList = {
  '123': task,
};

export const getTaskList = async (): Promise<TaskList> =>
  new Promise((resolve) => {
    process.nextTick(() => resolve(taskList));
  });

export const firebaseTaskCreated = async (): Promise<string> =>
  new Promise((resolve) => {
    const id = '123';
    process.nextTick(() => resolve(id));
  });

export const firebaseTaskDone = async (): Promise<void> =>
  new Promise((resolve) => {
    process.nextTick(() => resolve());
  });

export const firebaseTaskTodo = async (): Promise<void> =>
  new Promise((resolve) => {
    process.nextTick(() => resolve());
  });

export const firebaseTaskUpdated = async (): Promise<void> =>
  new Promise((resolve) => {
    process.nextTick(() => resolve());
  });

export const firebaseTaskDeleted = async (): Promise<void> =>
  new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
