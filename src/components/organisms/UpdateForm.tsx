import React, { FC } from 'react';
import FormInput from 'components/molecules/FormInput';

type Props = {
  title: string;
  deadline?: string;
  taskUpdatedHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  taskDeletedHandleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UpdateForm: FC<Props> = ({
  title = '',
  deadline = '',
  taskUpdatedHandleSubmit = () => undefined,
  taskDeletedHandleClick = () => undefined,
  handleChange = () => undefined,
}) => (
  <>
    <h1>更新ページ</h1>
    <form onSubmit={taskUpdatedHandleSubmit}>
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
      <button type="button" onClick={taskDeletedHandleClick}>
        削除する
      </button>
    </form>
  </>
);

export default UpdateForm;
