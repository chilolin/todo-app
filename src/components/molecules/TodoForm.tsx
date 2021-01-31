import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  isLoading: boolean;
  title: string;
  deadline?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoForm: FC<Props> = ({
  isLoading = false,
  title = '',
  deadline = '',
  handleChange = () => undefined,
}) => (
  <>
    <TextField
      id="create-title"
      label="やる事"
      value={title}
      onChange={handleChange}
      name="title"
      InputLabelProps={{
        shrink: true,
      }}
      disabled={isLoading}
      required
    />
    <TextField
      id="create-deadline"
      label="期日"
      type="date"
      value={deadline}
      onChange={handleChange}
      name="deadline"
      InputLabelProps={{
        shrink: true,
      }}
      disabled={isLoading}
    />
  </>
);

export default TodoForm;
