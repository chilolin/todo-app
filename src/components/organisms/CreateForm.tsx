import React, { FC } from 'react';
import FormInput from 'components/molecules/FormInput';

type Props = {
  title: string;
  deadline: string;
  taskCreatedHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CreateForm: FC<Props> = ({
  title = '',
  deadline = '',
  taskCreatedHandleSubmit = () => undefined,
  handleChange = () => undefined,
}) => (
  <>
    <h1>作成ページ</h1>
    <form onSubmit={taskCreatedHandleSubmit}>
      <FormInput
        name="title"
        type="text"
        handleChange={handleChange}
        value={title}
        label="タイトル"
      />
      <FormInput
        name="deadline"
        type="text"
        handleChange={handleChange}
        value={deadline}
        label="期日"
      />
      <button type="submit">作成する</button>
    </form>
  </>
);

export default CreateForm;
