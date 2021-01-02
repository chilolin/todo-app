import React, { FC } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import SpinnerButton from 'components/molecules/SpinnerButton';

type Props = {
  isLoading: boolean;
  title: string;
  deadline?: string;
  handleTaskCreatedSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CreateForm: FC<Props> = ({
  isLoading = false,
  title = '',
  deadline = undefined,
  handleTaskCreatedSubmit = () => undefined,
  handleChange = () => undefined,
}) => (
  <FormWrapper onSubmit={handleTaskCreatedSubmit}>
    <div>
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
        id="create-date"
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
    </div>
    <FormActions>
      <SpinnerButton isLoading={isLoading} type="submit" color="primary">
        追加する
      </SpinnerButton>
    </FormActions>
  </FormWrapper>
);

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 347.87px;
`;

export default CreateForm;
