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

const getTaskList = async (collectionId: string): Promise<TaskList> =>
  new Promise((resolve, reject) => {
    process.nextTick(() => (collectionId ? resolve(taskList) : reject()));
  });

const taskCreated = async (
  createdTask: Pick<Task, 'title' | 'deadline'>,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const id = '123';
    process.nextTick(() =>
      createdTask.title === 'test-task' ? resolve(id) : reject(),
    );
  });

const taskDone = async (id: string): Promise<void> =>
  new Promise((resolve, reject) => {
    process.nextTick(() => (id === '123' ? resolve() : reject()));
  });

const taskTodo = async (id: string): Promise<void> =>
  new Promise((resolve, reject) => {
    process.nextTick(() => (id === '123' ? resolve() : reject()));
  });

const taskUpdated = async (
  updatedTask: Omit<Task, 'createdAt'>,
): Promise<void> =>
  new Promise((resolve, reject) => {
    process.nextTick(() =>
      updatedTask.title === 'new-test-task' ? resolve() : reject(),
    );
  });

const taskDeleted = async (id: string): Promise<void> =>
  new Promise((resolve, reject) => {
    process.nextTick(() => (id === '123' ? resolve() : reject()));
  });

export default {
  getTaskList,
  taskCreated,
  taskDone,
  taskTodo,
  taskUpdated,
  taskDeleted,
};
