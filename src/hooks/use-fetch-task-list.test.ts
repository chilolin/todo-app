import { renderHook } from '@testing-library/react-hooks';

import useFetchTaskList from 'hooks/use-fetch-task-list';
import { TaskList } from 'features/todo/todoSlice';
import * as firebaseUtils from 'firebase/utils';

const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => (): unknown => mockUseDispatch(),
  useSelector: () => (): unknown => mockUseSelector(),
}));

jest.mock('firebase/utils');

beforeEach(() => {
  mockUseDispatch.mockReset();
  mockUseSelector.mockReset();
});

test('taskList をフェッチする', () => {
  const taskList: TaskList = {
    '123': {
      id: '123',
      title: 'task0',
      deadline: '2021-01-29',
      createdAt: new Date(2021, 1, 28),
    },
  };

  const getTaskListStub = jest
    .spyOn(firebaseUtils, 'getTaskList')
    .mockImplementation(() => Promise.resolve(taskList));

  const { result } = renderHook(() => useFetchTaskList());

  expect(result.current.isLoading).toEqual(true);

  // await waitFor(() => {
  expect(getTaskListStub).toHaveBeenCalledTimes(2);
  // });

  expect(result.current.isLoading).toEqual(false);
  expect(result.current.doneList).toEqual(taskList);
  expect(result.current.todoList).toEqual(taskList);
});
