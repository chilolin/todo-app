import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseTaskUpdated, firebaseTaskDeleted } from 'firebase.utils';

import todoSlice, { TodoState } from 'features/todo';

import UpdateFormDialog from 'components/molecules/UpdateFormDialog';

const EnhancedUpdateFormDialog: FC<{ id: string }> = ({ id = '' }) => {
  const { taskUpdated, taskDeleted } = todoSlice.actions;
  const dispatch = useDispatch();
  const todoList = useSelector((state: TodoState) => state.todoList);

  const [updatedTask, setUpdatedTask] = useState<{
    title: string;
    deadline?: string;
  }>({
    title: todoList[id]?.title,
    deadline: todoList[id]?.deadline,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskUpdatedClick: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebaseTaskUpdated('todoList', { id, ...updatedTask });
      dispatch(taskUpdated({ id, ...updatedTask }));
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsError(true);
    }
  };

  const handleTaskDeletedClick: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebaseTaskDeleted('todoList', id);
      dispatch(taskDeleted(id));
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsError(true);
    }
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const { title, deadline } = updatedTask;

  return isError ? (
    <div>エラーが発生しました。</div>
  ) : (
    <UpdateFormDialog
      {...{
        open,
        isLoading,
        title,
        deadline,
        handleOpen,
        handleClose,
        handleTaskUpdatedClick,
        handleTaskDeletedClick,
        handleChange,
      }}
    />
  );
};

export default EnhancedUpdateFormDialog;
