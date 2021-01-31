import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import todoSlice, * as reducers from 'features/todo/todoSlice';
import * as firebaseUtils from 'firebase/utils';

import TaskItem from 'components/molecules/TaskItem';
import EnhancedTaskItem from 'containers/molecules/TaskItem';

jest.mock('firebase/utils');

jest.mock('containers/molecules/EditFormDialog', () => () => (
  <div>EditFormDialog</div>
));

jest.mock('components/molecules/Snackbars', () => () => (
  <div data-testid="error">Snackbars</div>
));

describe('TaskItem', () => {
  describe('component のテスト', () => {
    const mockHandleError = jest.fn();
    const mockhandleTaskDone = jest.fn();
    const mockhandleTaskTodo = jest.fn();

    beforeEach(() => {
      mockHandleError.mockReset();
      mockhandleTaskDone.mockReset();
      mockhandleTaskTodo.mockReset();
    });

    afterEach(() => {
      cleanup();
    });

    test('ローディング中のレンダリング', () => {
      const { getByTestId, queryByTestId } = render(
        <TaskItem
          isLoading
          isError={false}
          id="123"
          title="task0"
          deadline="2021-01-01"
          isDone={false}
          handleError={mockHandleError}
          handleTaskDone={mockhandleTaskDone}
          handleTaskTodo={mockhandleTaskTodo}
        />,
      );

      expect(getByTestId('linear')).toBeInTheDocument();
      expect(queryByTestId('task-item')).not.toBeInTheDocument();
    });

    test('todoアイテムをレンダリング', () => {
      const { queryByTestId, getByText, getByRole } = render(
        <TaskItem
          isLoading={false}
          isError={false}
          id="123"
          title="task0"
          deadline="2021-01-01"
          isDone={false}
          handleError={mockHandleError}
          handleTaskDone={mockhandleTaskDone}
          handleTaskTodo={mockhandleTaskTodo}
        />,
      );

      expect(queryByTestId('linear')).not.toBeInTheDocument();
      expect(getByText('やる事：task0')).toBeInTheDocument();
      expect(getByText('期日：2021-01-01')).toBeInTheDocument();
      expect(getByRole('button')).toHaveTextContent('DONE');
    });

    test('doneアイテムをレンダリング', () => {
      const { queryByTestId, getByText, getByRole } = render(
        <TaskItem
          isLoading={false}
          isError={false}
          id="123"
          title="task0"
          deadline="2021-01-01"
          isDone
          handleError={mockHandleError}
          handleTaskDone={mockhandleTaskDone}
          handleTaskTodo={mockhandleTaskTodo}
        />,
      );

      expect(queryByTestId('linear')).not.toBeInTheDocument();
      expect(getByText('やる事：task0')).toBeInTheDocument();
      expect(getByText('期日：2021-01-01')).toBeInTheDocument();
      expect(getByRole('button')).toHaveTextContent('TODO');
    });

    test('エラー発生時のレンダリング', () => {
      const { getByTestId } = render(
        <TaskItem
          isLoading={false}
          isError
          id="123"
          title="task0"
          deadline="2021-01-01"
          isDone
          handleError={mockHandleError}
          handleTaskDone={mockhandleTaskDone}
          handleTaskTodo={mockhandleTaskTodo}
        />,
      );

      expect(getByTestId('error')).toBeInTheDocument();
    });

    test('DONEボタンを押す処理', () => {
      const { getByRole } = render(
        <TaskItem
          isLoading={false}
          isError={false}
          id="123"
          title="task0"
          deadline="2021-01-01"
          isDone={false}
          handleError={mockHandleError}
          handleTaskDone={mockhandleTaskDone}
          handleTaskTodo={mockhandleTaskTodo}
        />,
      );

      userEvent.click(getByRole('button'));
      expect(mockhandleTaskDone).toHaveBeenCalled();
    });

    test('TODOボタンを押す処理', () => {
      const { getByRole } = render(
        <TaskItem
          isLoading={false}
          isError={false}
          id="123"
          title="task0"
          deadline="2021-01-01"
          isDone
          handleError={mockHandleError}
          handleTaskDone={mockhandleTaskDone}
          handleTaskTodo={mockhandleTaskTodo}
        />,
      );

      userEvent.click(getByRole('button'));
      expect(mockhandleTaskTodo).toHaveBeenCalled();
    });
  });

  describe('container のテスト', () => {
    const reduxProvider = (WrappedComponent: JSX.Element) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false });
      const store = configureStore({
        reducer: todoSlice,
        middleware,
      });

      return <Provider store={store}>{WrappedComponent}</Provider>;
    };

    afterEach(() => {
      cleanup();
    });

    test('DONEボタンを押す処理', async () => {
      const mockTaskDone = jest.spyOn(reducers, 'taskDone');
      const mockFirebaseTaskDone = jest
        .spyOn(firebaseUtils, 'firebaseTaskDone')
        .mockImplementation(() => Promise.resolve());

      const { getByRole, getByTestId } = render(
        reduxProvider(
          <EnhancedTaskItem
            id="123"
            title="task0"
            deadline="2021-01-01"
            isDone={false}
          />,
        ),
      );

      userEvent.click(getByRole('button'));
      expect(getByTestId('linear')).toBeInTheDocument();
      await waitFor(() => {
        expect(mockFirebaseTaskDone).toHaveBeenCalled();
      });
      expect(mockTaskDone).toHaveBeenCalled();
      expect(getByTestId('task-item')).toBeInTheDocument();
    });

    test('DONEボタンを押した時にfirebaseがエラーを返す', async () => {
      const mockTaskDone = jest.spyOn(reducers, 'taskDone');
      const mockFirebaseTaskDone = jest
        .spyOn(firebaseUtils, 'firebaseTaskDone')
        .mockImplementation(() => Promise.reject());

      const { getByRole, getByTestId, queryByTestId } = render(
        reduxProvider(
          <EnhancedTaskItem
            id="123"
            title="task0"
            deadline="2021-01-01"
            isDone={false}
          />,
        ),
      );

      userEvent.click(getByRole('button'));
      expect(getByTestId('linear')).toBeInTheDocument();
      expect(queryByTestId('error')).not.toBeInTheDocument();
      await waitFor(() => {
        expect(mockFirebaseTaskDone).toHaveBeenCalled();
      });
      expect(mockTaskDone).not.toHaveBeenCalled();
      expect(getByTestId('error')).toBeInTheDocument();
      expect(queryByTestId('linear')).not.toBeInTheDocument();
    });

    test('TODOボタンを押す', async () => {
      const mockTaskTodo = jest.spyOn(reducers, 'taskTodo');
      const mockFirebaseTaskTodo = jest
        .spyOn(firebaseUtils, 'firebaseTaskTodo')
        .mockImplementation(() => Promise.resolve());

      const { getByRole, getByTestId } = render(
        reduxProvider(
          <EnhancedTaskItem
            id="123"
            title="task0"
            deadline="2021-01-01"
            isDone
          />,
        ),
      );

      userEvent.click(getByRole('button'));
      expect(getByTestId('linear')).toBeInTheDocument();
      await waitFor(() => {
        expect(mockFirebaseTaskTodo).toHaveBeenCalled();
      });
      expect(mockTaskTodo).toHaveBeenCalled();
      expect(getByTestId('task-item')).toBeInTheDocument();
    });

    test('TODOボタンを押したときにfirebaseがエラーを返す', async () => {
      const mockTaskTodo = jest.spyOn(reducers, 'taskTodo');
      const mockFirebaseTaskTodo = jest
        .spyOn(firebaseUtils, 'firebaseTaskTodo')
        .mockImplementation(() => Promise.reject());

      const { getByRole, getByTestId, queryByTestId } = render(
        reduxProvider(
          <EnhancedTaskItem
            id="123"
            title="task0"
            deadline="2021-01-01"
            isDone
          />,
        ),
      );

      userEvent.click(getByRole('button'));
      expect(getByTestId('linear')).toBeInTheDocument();
      expect(queryByTestId('error')).not.toBeInTheDocument();
      await waitFor(() => {
        expect(mockFirebaseTaskTodo).toHaveBeenCalled();
      });
      expect(mockTaskTodo).not.toHaveBeenCalled();
      expect(getByTestId('error')).toBeInTheDocument();
      expect(queryByTestId('linear')).not.toBeInTheDocument();
    });
  });
});
