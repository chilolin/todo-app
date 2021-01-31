import { renderHook } from '@testing-library/react-hooks';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import { RootState } from 'reducers';
import * as reducers from 'features/todo/todoSlice';
// import * as firebaseUtils from 'firebase/utils';

const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn((state: RootState) => state.todo.todoList);

jest.mock('react-redux', () => ({
  useDispatch: () => (): unknown => mockUseDispatch(),
  useSelector: (): reducers.TaskList =>
    mockUseSelector({
      todo: {
        todoList: {
          '123': {
            id: '123',
            title: 'task0',
            deadline: '2021-01-29',
            createdAt: new Date(2021, 1, 28),
          },
        },
        doneList: {
          '123': {
            id: '123',
            title: 'task0',
            deadline: '2021-01-29',
            createdAt: new Date(2021, 1, 28),
          },
        },
      },
    }),
}));

jest.mock('firebase/utils');

beforeEach(() => {
  mockUseDispatch.mockReset();
  mockUseSelector.mockReset();
});

test('taskList をフェッチする', () => {
  const taskList: reducers.TaskList = {
    '123': {
      id: '123',
      title: 'task0',
      deadline: '2021-01-29',
      createdAt: new Date(2021, 1, 28),
    },
  };

  const mockFetchTaskList = jest.spyOn(reducers, 'fetchTaskList');

  // const mockGetTaskList = jest
  //   .spyOn(firebaseUtils, 'getTaskList')
  //   .mockImplementation(() => Promise.resolve(taskList));

  const { result } = renderHook(() => useFetchTaskList());

  expect(result.current.isLoading).toEqual(true);

  // await act(async () => {
  //   await expect(mockGetTaskList).toHaveBeenCalled();
  // });

  expect(mockFetchTaskList).toHaveBeenCalled();

  expect(result.current.isLoading).toEqual(false);
  expect(result.current.doneList).toEqual(taskList);
  expect(result.current.todoList).toEqual(taskList);
});
