import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebaseUtils from 'firebase/utils';
import { todoSlice, TodoState } from 'features/todo';
import EditFormDialog from 'components/molecules/EditFormDialog';

const EnhancedEditFormDialog: FC<{ id: string }> = ({ id = '' }) => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const todoList = useSelector((state: TodoState) => state.todoList);
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

  const { taskUpdated, taskDeleted } = todoSlice.actions;
  const { title, deadline } = updatedTask;

  const handleTaskUpdatedClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseUtils.taskUpdated({
        id,
        ...updatedTask,
      });
      if (!isUnmounted) {
        dispatch(taskUpdated({ id, ...updatedTask }));
      }
    } catch (error) {
      throw new Error('error update task');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleTaskDeletedClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await firebaseUtils.taskDeleted(id);
      if (!isUnmounted) {
        dispatch(taskDeleted(id));
      }
    } catch (error) {
      throw new Error('error delete task');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
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
        title,
        deadline,
        handleOpen: () => setIsOpen(true),
        handleClose: () => setIsOpen(false),
        handleTaskUpdatedClick,
        handleTaskDeletedClick,
        handleChange,
      }}
    />
  );
};

export default EnhancedEditFormDialog;
