import React, { FC } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { TaskList } from 'features/todo';
import TaskItem from 'containers/molecules/TaskItem';

type Props = {
  isLoading: boolean;
  doneList: TaskList;
  todoList: TaskList;
};

const TaskBoard: FC<Props> = ({
  isLoading = false,
  todoList = {},
  doneList = {},
}) => (
  <>
    {isLoading ? (
      <CircularWrapper data-testid="circular">
        <CircularProgress />
      </CircularWrapper>
    ) : (
      <BoardWrapper data-testid="board">
        <ListWrapper>
          <h2>Todoリスト</h2>
          <ListItemWrapper>
            {Object.values(todoList).map(
              ({ id = '', title = '', deadline = undefined }) => (
                <TaskItem key={id} {...{ id, title, deadline }} />
              ),
            )}
          </ListItemWrapper>
        </ListWrapper>
        <ListWrapper>
          <h2>Doneリスト</h2>
          <ListItemWrapper>
            {Object.values(doneList).map(
              ({ id = '', title = '', deadline = undefined }) => (
                <TaskItem key={id} {...{ id, title, deadline }} isDone />
              ),
            )}
          </ListItemWrapper>
        </ListWrapper>
      </BoardWrapper>
    )}
  </>
);

const CircularWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
`;

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 450px;
`;

const ListItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
  padding-left: 0;
  overflow-y: scroll;
  list-style: none;
`;

export default TaskBoard;
