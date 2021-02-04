import { renderHook, act } from '@testing-library/react-hooks';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import * as reducers from 'features/todo/todoSlice';
import * as firebaseUtils from 'firebase/utils';

const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn(() => ({
  '123': {
    id: '123',
    title: 'task0',
    deadline: '2021-01-29',
    createdAt: new Date(2021, 1, 28),
  },
}));

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

    // const mockFetchTaskList = jest.spyOn(reducers, 'fetchTaskList');

    const mockGetTaskList = jest
      .spyOn(firebaseUtils, 'getTaskList')
      .mockImplementation(() => Promise.resolve(taskList));

    await act(async () => {
      const { waitForNextUpdate, rerender } = renderHook(() =>
        useFetchTaskList(),
      );

      rerender();
      await waitForNextUpdate();
    });

    expect(mockGetTaskList).toHaveBeenCalledTimes(2);
  });
});
