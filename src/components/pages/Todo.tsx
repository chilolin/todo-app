import React, { FC } from 'react';
import styled from 'styled-components';

import CreateForm from 'containers/organisms/CreateForm';
import TaskBoard from 'containers/organisms/TaskBoard';

const Todo: FC = () => (
  <Wrapper>
    <CreateForm />
    <TaskBoard />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
`;

export default Todo;
