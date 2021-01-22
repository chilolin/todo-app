import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebaseUtils from 'firebase/utils';
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
    const { fetchTaskList } = todoSlice.actions;

    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const todoTaskList = await firebaseUtils.getTaskList('todoList');
        const doneTaskList = await firebaseUtils.getTaskList('doneList');

        if (!isUnmounted) {
          dispatch(
            fetchTaskList({ todoList: todoTaskList, doneList: doneTaskList }),
          );
        }
      } catch (error) {
        throw new Error(error);
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
