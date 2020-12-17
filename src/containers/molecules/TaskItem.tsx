import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseTaskConvert } from 'firebase.utils';

import TaskItem from 'components/molecules/TaskItem';

type Props = {
  id: string;
  title: string;
  deadline: string;
  isDone?: boolean;
  taskDone?: (id: string) => void;
  taskTodo?: (id: string) => void;
};

const EnhancedTaskItem: FC<Props> = ({
  id = '',
  title = '',
  deadline = '',
  isDone = false,
  taskDone = () => undefined,
  taskTodo = () => undefined,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  const toUpdatePageHandleClick = () => {
    history.push(`/update/${id}`);
  };

  const taskDoneHandleClick = async () => {
    setIsLoading(true);
    try {
      await firebaseTaskConvert(id, 'todoList', 'doneList');
      taskDone(id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const taskTodoHandleClick = async () => {
    setIsLoading(true);
    try {
      await firebaseTaskConvert(id, 'doneList', 'todoList');
      taskTodo(id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading ? (
    <div>変更中・・・</div>
  ) : (
    <TaskItem
      {...{
        title,
        deadline,
        isDone,
        toUpdatePageHandleClick,
        taskDoneHandleClick,
        taskTodoHandleClick,
      }}
    />
  );
};

export default EnhancedTaskItem;
