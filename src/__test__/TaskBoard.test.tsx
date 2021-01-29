import React from 'react';
import { cleanup, render } from '@testing-library/react';

import useFetchTaskList from 'hooks/use-fetch-task-list';

import { TaskList } from 'features/todo/todoSlice';

import TaskBoard from 'containers/organisms/TaskBoard';

const taskList: TaskList = {
  '123': {
    id: '123',
    title: 'test-task-1',
    deadline: '2021-01-24',
    createdAt: new Date(2021, 1, 24, 22, 44),
  },
  '456': {
    id: '456',
    title: 'test-task-2',
    deadline: '2021-01-24',
    createdAt: new Date(2021, 1, 24, 22, 44),
  },
};

jest.mock('firebase/utils');
jest.mock('hooks/use-fetch-task-list');
const useFetchTaskListStub = useFetchTaskList as jest.MockedFunction<
  typeof useFetchTaskList
>;

jest.mock(
  'containers/molecules/TaskItem',
  () => ({ id, title }: { id: string; title: string }) => (
    <li key={id} data-testid={id}>
      {title}
    </li>
  ),
);

describe('TaskBoardコンポーネントのテスト', () => {
  afterEach(() => {
    cleanup();
  });

  test('データ取得前のレンダリング', () => {
    useFetchTaskListStub.mockReturnValue({
      isLoading: true,
      todoList: taskList,
      doneList: taskList,
    });

    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <TaskBoard />,
    );

    expect(getByTestId('circular')).toBeInTheDocument();
    expect(queryByTestId('board')).not.toBeInTheDocument();
    expect(queryAllByTestId('123')).not.toHaveLength(2);
    expect(queryAllByTestId('456')).not.toHaveLength(2);
  });

  test('データ取得後のレンダリング', () => {
    useFetchTaskListStub.mockReturnValue({
      isLoading: false,
      todoList: taskList,
      doneList: taskList,
    });

    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <TaskBoard />,
    );

    expect(queryByTestId('circular')).not.toBeInTheDocument();
    expect(getByTestId('board')).toBeInTheDocument();
    expect(getAllByTestId('123')).toHaveLength(2);
    expect(getAllByTestId('456')).toHaveLength(2);
  });
});
