import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { TaskList } from 'features/todo/todoSlice';

import TaskBoard from 'components/organisms/TaskBoard';

jest.mock('firebase/utils');

jest.mock(
  'containers/molecules/TaskItem',
  () => ({ id, title }: { id: string; title: string }) => (
    <li key={id} data-testid={id}>
      {title}
    </li>
  ),
);

describe('TaskBoard', () => {
  const todoListStub: TaskList = {
    '123': {
      id: '123',
      title: 'task1',
      deadline: '2021-01-01',
      createdAt: new Date(2021, 1, 1),
    },
    '456': {
      id: '456',
      title: 'task2',
      deadline: '2021-01-02',
      createdAt: new Date(2021, 1, 2),
    },
  };

  const doneListStub: TaskList = {
    '789': {
      id: '789',
      title: 'task3',
      deadline: '2021-01-03',
      createdAt: new Date(2021, 1, 3),
    },
  };

  afterEach(() => {
    cleanup();
  });

  test('データ取得前のレンダリング', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskBoard isLoading todoList={todoListStub} doneList={doneListStub} />,
    );

    expect(getByTestId('circular')).toBeInTheDocument();
    expect(queryByTestId('board')).not.toBeInTheDocument();
    expect(queryByTestId('123')).not.toBeInTheDocument();
    expect(queryByTestId('456')).not.toBeInTheDocument();
    expect(queryByTestId('789')).not.toBeInTheDocument();
  });

  test('データ取得後のレンダリング', () => {
    const { getByTestId, queryByTestId } = render(
      <TaskBoard
        isLoading={false}
        todoList={todoListStub}
        doneList={doneListStub}
      />,
    );

    expect(queryByTestId('circular')).not.toBeInTheDocument();
    expect(getByTestId('board')).toBeInTheDocument();
    expect(getByTestId('123')).toBeInTheDocument();
    expect(getByTestId('456')).toBeInTheDocument();
    expect(getByTestId('789')).toBeInTheDocument();
  });
});
