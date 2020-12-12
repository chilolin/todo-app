import React, { FC, useState } from 'react';
import UpdateForm from 'components/organisms/UpdateForm';

const EnhancedUpdateForm: FC = () => {
  const [updateTask, setUpdateTask] = useState<{
    title: string;
    deadline: string;
  }>({
    title: '',
    deadline: '',
  });

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUpdateTask({ ...updateTask, [name]: value });
  };

  const deleteHandleClick: (e: React.MouseEvent<HTMLButtonElement>) => void = (
    e,
  ) => {
    e.preventDefault();
  };

  return (
    <UpdateForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      deleteHandleClick={deleteHandleClick}
      title={updateTask.title}
      deadline={updateTask.deadline}
    />
  );
};

export default EnhancedUpdateForm;
