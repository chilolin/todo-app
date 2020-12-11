import React, { FC } from 'react';
import FormInput from 'components/molecules/FormInput';

type Props = {
  handleSubmit: () => void;
  handleChange: () => void;
  title: string;
  deadline: Date;
};

const TaskEditor: FC<Props> = ({
  handleSubmit = () => undefined,
  handleChange = () => undefined,
  title = '',
  deadline = undefined,
}) => (
  <>
    <h2>作成ページ</h2>
    <form onSubmit={handleSubmit}>
      <FormInput
        name="title"
        type="text"
        handleChange={handleChange}
        value={title}
        label="タイトル"
      />
      <FormInput
        name="title"
        type="text"
        handleChange={handleChange}
        value={deadline}
        label="期日"
      />
      <button type="submit">作成する</button>
    </form>
  </>
);

export default TaskEditor;
