import React, { FC } from 'react';

import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import SpinnerButton from 'components/molecules/SpinnerButton';

type Props = {
  isLoading: boolean;
  title: string;
  deadline?: string;
  handleTaskCreatedSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        id="standard-basic-create"
        label="やる事"
        value={title}
        onChange={handleChange}
        name="title"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        id="date"
        label="期日"
        type="date"
        value={deadline}
        onChange={handleChange}
        name="deadline"
        InputLabelProps={{
          shrink: true,
        }}
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
  width: 98vw;
  margin-top: 30px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-items: center;
  width: 347px;
`;

export default CreateForm;
