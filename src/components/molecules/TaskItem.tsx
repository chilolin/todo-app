import React, { FC } from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';

import EditFormDialog from 'containers/molecules/EditFormDialog';

type Props = {
  isLoading: boolean;
  isError: boolean;
  id: string;
  title: string;
  deadline?: string;
  isDone?: boolean;
  handleTaskDone: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleTaskTodo: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TaskItem: FC<Props> = ({
  isLoading = false,
  isError = false,
  id = '',
  title = '',
  deadline = undefined,
  isDone = false,
  handleTaskDone = () => undefined,
  handleTaskTodo = () => undefined,
}) => (
  <>
    {isLoading ? (
      <LinearProgress data-testid="linear" />
    ) : (
      <ItemWrapper data-testid="task-item">
        <p>やる事：{title}</p>
        <p>期日：{deadline}</p>
        {isDone ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<FastRewindIcon />}
            onClick={handleTaskTodo}
          >
            TODO
          </Button>
        ) : (
          <ButtonWrapper>
            <EditFormDialog id={id} />
            <Button
              variant="contained"
              color="primary"
              endIcon={<FastForwardIcon />}
              onClick={handleTaskDone}
            >
              DONE
            </Button>
          </ButtonWrapper>
        )}
        {isError && <div data-testid="error">エラーが発生しました</div>}
      </ItemWrapper>
    )}
  </>
);

const ItemWrapper = styled.li`
  padding-bottom: 8px;
  margin: 0 15px 5px 15px;
  border-bottom: 1px solid lightgray;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default TaskItem;
