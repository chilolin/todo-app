import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebaseUtils from 'firebase/utils';
import { RootState } from 'store';
import { TaskList } from 'store/todo/types';
import { fetchTaskList } from 'store/todo/actions';

type ReturnValues = {
  isLoading: boolean;
  doneList: TaskList;
  todoList: TaskList;
};

const useFetchTaskList = (): ReturnValues => {
  const [isLoading, setIsLoading] = useState(false);
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const doneList = useSelector((state: RootState) => state.todo.doneList);
  const dispatch = useDispatch();

  useEffect(() => {
    let isUnmounted = false;

    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const todoTaskList = await firebaseUtils.getTaskList('todoList');
        const doneTaskList = await firebaseUtils.getTaskList('doneList');

        if (!isUnmounted) {
          dispatch(fetchTaskList(todoTaskList, doneTaskList));
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

  return { isLoading, todoList, doneList };
};

export default useFetchTaskList;
