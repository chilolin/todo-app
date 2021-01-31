import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTaskList, TaskList } from 'features/todo/todoSlice';
import { RootState } from 'reducers';
import { getTaskList } from 'firebase/utils';

type ReturnValues = {
  isLoading: boolean;
  todoList: TaskList;
  doneList: TaskList;
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
        const todoTaskList = await getTaskList('todoList');
        const doneTaskList = await getTaskList('doneList');

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

  return { isLoading, todoList, doneList };
};

export default useFetchTaskList;
