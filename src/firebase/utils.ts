import { db } from 'firebase/index';
import { Task, TaskList } from 'features/todo/todoSlice';

export const getTaskList = async (collectionId: string): Promise<TaskList> => {
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

export const firebaseTaskCreated = async (
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

export const firebaseTaskDone = async (id: string): Promise<void> => {
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

export const firebaseTaskTodo = async (id: string): Promise<void> => {
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

export const firebaseTaskUpdated = async (
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

export const firebaseTaskDeleted = async (id: string): Promise<void> => {
  const taskRef = db.collection('todoList').doc(id);
  const snapshot = await taskRef.get();

  if (snapshot.exists) {
    await taskRef.delete();
  }
};
