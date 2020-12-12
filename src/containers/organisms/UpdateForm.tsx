import React, { FC, useState } from 'react';
import UpdateForm from 'components/organisms/UpdateForm';
import { TodoWidgetProps } from 'components/templates/TodoWidget';

const EnhancedUpdateForm: FC<
  Pick<TodoWidgetProps, 'taskUpdate' | 'taskDelete'>
> = ({ taskUpdate = () => undefined, taskDelete = () => undefined }) => {
  const [updatedTask, setUpdatedTask] = useState<{
    id: string;
    title: string;
    deadline: string;
  }>({
    id: '',
    title: '',
    deadline: '',
  });

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    taskUpdate(updatedTask);
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const deleteHandleClick: (e: React.MouseEvent<HTMLButtonElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    taskDelete(updatedTask.id);
  };

  return (
    <UpdateForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      deleteHandleClick={deleteHandleClick}
      title={updatedTask.title}
      deadline={updatedTask.deadline}
    />
  );
};

export default EnhancedUpdateForm;
