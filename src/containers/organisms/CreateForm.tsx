import React, { FC, useState } from 'react';
import CreateForm from 'components/organisms/CreateForm';
import { TodoWidgetProps } from 'components/templates/TodoWidget';

const EnhancedCreateForm: FC<Pick<TodoWidgetProps, 'taskCreate'>> = ({
  taskCreate = () => undefined,
}) => {
  const [createdTask, setCreatedTask] = useState<{
    title: string;
    deadline: string;
  }>({
    title: '',
    deadline: '',
  });

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    taskCreate(createdTask);
    setCreatedTask({
      title: '',
      deadline: '',
    });
  };

  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCreatedTask({ ...createdTask, [name]: value });
  };

  return (
    <CreateForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title={createdTask.title}
      deadline={createdTask.deadline}
    />
  );
};

export default EnhancedCreateForm;
