import { db } from 'firebase/index';
import { Task, TaskList } from 'store/todo/types';

const getTaskList = async (collectionId: string): Promise<TaskList> => {
  const snapshot = await db.collection(collectionId).get();
  const transformedTaskList = snapshot.docs
    .map((doc) => {
      return doc.data() as Task;
    })
    .reduce((accumulator: TaskList, collection: Task) => {
      accumulator[collection.id] = collection;

      return accumulator;
    }, {});

  return transformedTaskList;
};

const taskCreated = async (
  createdTask: Pick<Task, 'title' | 'deadline'>,
): Promise<string> => {
  const collectionRef = db.collection('todoList');
  const { id } = collectionRef.doc();
  const taskRef = collectionRef.doc(id);
  const snapshot = await taskRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    await taskRef.set({
      ...createdTask,
      id,
      createdAt,
    });
  }

  return id;
};

const taskDone = async (id: string): Promise<void> => {
  const todoListRef = db.collection('todoList').doc(id);
  const doneListRef = db.collection('doneList').doc(id);
  const todoListSnapshot = await todoListRef.get();
  const doneListSnapshot = await doneListRef.get();

  if (todoListSnapshot.exists && !doneListSnapshot.exists) {
    const task = todoListSnapshot.data();

    await doneListRef.set({ ...task });
    await todoListRef.delete();
  }
};

const taskTodo = async (id: string): Promise<void> => {
  const todoListRef = db.collection('todoList').doc(id);
  const doneListRef = db.collection('doneList').doc(id);
  const todoListSnapshot = await todoListRef.get();
  const doneListSnapshot = await doneListRef.get();

  if (!todoListSnapshot.exists && doneListSnapshot.exists) {
    const task = doneListSnapshot.data();

    await todoListRef.set({ ...task });
    await doneListRef.delete();
  }
};

const taskUpdated = async (
  updatedTask: Omit<Task, 'createdAt'>,
): Promise<void> => {
  const { id, title, deadline } = updatedTask;
  const taskRef = db.collection('todoList').doc(id);
  const snapshot = await taskRef.get();

  if (snapshot.exists) {
    await taskRef.update({
      title,
      deadline,
    });
  }
};

const taskDeleted = async (id: string): Promise<void> => {
  const taskRef = db.collection('todoList').doc(id);
  const snapshot = await taskRef.get();

  if (snapshot.exists) {
    await taskRef.delete();
  }
};

export default {
  getTaskList,
  taskCreated,
  taskDone,
  taskTodo,
  taskUpdated,
  taskDeleted,
};
