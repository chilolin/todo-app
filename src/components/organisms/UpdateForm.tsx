import React, { FC } from 'react';
import FormInput from 'components/molecules/FormInput';

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteHandleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  deadline: string;
};

const UpdateForm: FC<Props> = ({
  handleSubmit = () => undefined,
  handleChange = () => undefined,
  deleteHandleClick = () => undefined,
  title = '',
  deadline = '',
}) => (
  <>
    <h1>更新ページ</h1>
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
      <button type="submit">更新する</button>
      <button type="button" onClick={deleteHandleClick}>
        削除する
      </button>
    </form>
  </>
);

export default UpdateForm;
