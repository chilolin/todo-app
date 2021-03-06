import React, { FC } from 'react';
import styled from 'styled-components';

import TodoForm from 'components/molecules/TodoForm';
import SpinnerButton from 'components/molecules/SpinnerButton';
import Snackbars from 'components/molecules/Snackbars';

type Props = {
  isLoading: boolean;
  isError: boolean;
  title: string;
  deadline?: string;
  handleError: () => void;
  handleTaskCreated: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CreateForm: FC<Props> = ({
  isLoading = false,
  isError = false,
  title = '',
  deadline = undefined,
  handleError = () => undefined,
  handleTaskCreated = () => undefined,
  handleChange = () => undefined,
}) => (
  <FormWrapper onSubmit={handleTaskCreated} data-testid="create-form">
    <FormContents>
      <TodoForm {...{ isLoading, title, deadline, handleChange }} />
    </FormContents>
    <FormActions>
      <SpinnerButton isLoading={isLoading} type="submit" color="primary">
        追加する
      </SpinnerButton>
    </FormActions>
    {isError && <Snackbars open={isError} handleClose={handleError} />}
  </FormWrapper>
);

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const FormContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 370px;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    width: 250px;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 370px;

  @media screen and (max-width: 800px) {
    width: 250px;
  }
`;

export default CreateForm;
