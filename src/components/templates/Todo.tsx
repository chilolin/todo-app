import React, { FC } from 'react';

import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import CreateForm from 'containers/organisms/CreateForm';
import TaskBoard from 'containers/organisms/TaskBoard';

const Todo: FC<{ isLoading: boolean }> = ({ isLoading = false }) => (
  <Wrapper>
    {isLoading ? (
      <CircularProgress />
    ) : (
      <>
        <CreateForm />
        <TaskBoard />
      </>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  width: 98vw;
`;

export default Todo;
