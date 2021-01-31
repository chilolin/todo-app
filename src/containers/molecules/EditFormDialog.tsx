import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseTaskUpdated, firebaseTaskDeleted } from 'firebase/utils';
import { RootState } from 'reducers';
import { taskUpdated, taskDeleted, TaskList } from 'features/todo/todoSlice';
import EditFormDialog from 'components/molecules/EditFormDialog';

const EnhancedEditFormDialog: FC<{ id: string }> = ({ id = '' }) => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const todoList: TaskList = useSelector(
    (state: RootState) => state.todo.todoList,
  );
  const dispatch = useDispatch();
  const [updatedTask, setUpdatedTask] = useState<{
    title: string;
    deadline?: string;
  }>({
    title: todoList[id]?.title,
    deadline: todoList[id]?.deadline,
  });

  useEffect(() => {
    setIsUnmounted(false);

    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const { title, deadline } = updatedTask;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTaskUpdated = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseTaskUpdated({
        id,
        ...updatedTask,
      });
      if (!isUnmounted) {
        dispatch(taskUpdated({ id, ...updatedTask }));
      }
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleTaskDeleted = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseTaskDeleted(id);
      if (!isUnmounted) {
        dispatch(taskDeleted(id));
      }
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <EditFormDialog
      {...{
        isLoading,
        isOpen,
        isError,
        title,
        deadline,
        handleOpen,
        handleClose,
        handleTaskUpdated,
        handleTaskDeleted,
        handleChange,
      }}
    />
  );
};

export default EnhancedEditFormDialog;
