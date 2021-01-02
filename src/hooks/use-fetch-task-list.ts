import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTaskList } from 'firebase.utils';
import { TaskList, todoSlice, TodoState } from 'features/todo';

type ReturnValues = {
  isLoading: boolean;
  doneList: TaskList;
  todoList: TaskList;
};

const useFetchTaskList = (): ReturnValues => {
  const [isLoading, setIsLoading] = useState(false);
  const doneList = useSelector((state: TodoState) => state.doneList);
  const todoList = useSelector((state: TodoState) => state.todoList);
  const dispatch = useDispatch();

  useEffect(() => {
    let isUnmounted = false;
    const { fetchDoneList, fetchTodoList } = todoSlice.actions;

    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const doneTasks = await getTaskList('doneList');
        const todoTasks = await getTaskList('todoList');

        if (!isUnmounted) {
          dispatch(fetchDoneList(doneTasks));
          dispatch(fetchTodoList(todoTasks));
        }
      } catch (error) {
        throw new Error('error get task list');
      } finally {
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      isUnmounted = true;
    };
  }, [dispatch]);

  return { isLoading, doneList, todoList };
};

export default useFetchTaskList;
