import React, { FC } from 'react';
import FormInput from 'components/molecules/FormInput';

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  deadline: string;
};

const CreateForm: FC<Props> = ({
  handleSubmit = () => undefined,
  handleChange = () => undefined,
  title = '',
  deadline = '',
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
