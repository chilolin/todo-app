import React, { FC } from 'react';

import styled from 'styled-components';
import TaskItem from 'containers/molecules/TaskItem';

import { TaskList } from 'features/todo';

type Props = {
  todoList: TaskList;
  doneList: TaskList;
};

const TaskBoard: FC<Props> = ({ todoList = {}, doneList = {} }) => (
  <BoardWrapper>
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
);

const BoardWrapper = styled.div`
  display: flex;
  width: 98vw;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  height: 480px;
`;

const ListItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  list-style: none;
`;

export default TaskBoard;
