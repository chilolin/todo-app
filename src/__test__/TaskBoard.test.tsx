import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import useFetchTaskList from 'hooks/use-fetch-task-list';

import { TaskList } from 'features/todo';

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
const mockUseFetchTaskList = useFetchTaskList as jest.MockedFunction<
  typeof useFetchTaskList
>;

jest.mock(
  'containers/molecules/TaskItem',
  () => ({ id, title }: { id: string; title: string }) => (
    <li key={id}>{title}</li>
  ),
);

describe('TaskBoard', () => {
  afterEach(() => {
    cleanup();
  });

  test('レンダリング', () => {
    mockUseFetchTaskList.mockReturnValue({
      isLoading: false,
      todoList: taskList,
      doneList: taskList,
    });
    render(<TaskBoard />);

    expect(screen.getByText(/Todoリスト/)).toBeInTheDocument();
    screen.debug();
  });

  test('ローディング', () => {
    mockUseFetchTaskList.mockReturnValue({
      isLoading: true,
      todoList: taskList,
      doneList: taskList,
    });
    render(<TaskBoard />);

    expect(screen.queryByText(/Todoリスト/)).not.toBeInTheDocument();
    screen.debug();
  });
});
