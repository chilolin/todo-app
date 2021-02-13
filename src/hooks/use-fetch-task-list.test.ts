import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import * as reducers from 'features/todo/todoSlice';
import * as firebaseUtils from 'firebase/utils';

const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn(
  (): reducers.TaskList => ({
    '123': {
      id: '123',
      title: 'task0',
      deadline: '2021-01-29',
      createdAt: new Date(2021, 1, 28),
    },
  }),
);

jest.mock('react-redux', () => ({
  useDispatch: () => (): unknown => mockUseDispatch(),
  useSelector: (): reducers.TaskList => mockUseSelector(),
}));

jest.mock('firebase/utils');

describe('useFetchTaskListフックのテスト', () => {
  beforeEach(() => {
    mockUseDispatch.mockReset();
    mockUseSelector.mockReset();
  });

  test('taskList をフェッチする', async () => {
    const taskList: reducers.TaskList = {
      '123': {
        id: '123',
        title: 'task0',
        deadline: '2021-01-29',
        createdAt: new Date(2021, 1, 28),
      },
    };

    const mockFetchTaskList = jest.spyOn(reducers, 'fetchTaskList');

    const mockGetTaskList = jest
      .spyOn(firebaseUtils, 'getTaskList')
      .mockImplementation(() => Promise.resolve(taskList));

    const { result } = renderHook(() => useFetchTaskList());

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => {
      expect(mockGetTaskList).toHaveBeenCalled();
    });

    expect(mockFetchTaskList).toHaveBeenCalled();
    expect(result.current.isLoading).toEqual(false);
  });
});
