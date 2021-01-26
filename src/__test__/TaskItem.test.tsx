import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { todoSlice } from 'features/todo';
import * as firebaseUtils from 'firebase/utils';

import TaskItem from 'containers/molecules/TaskItem';

const middleware = getDefaultMiddleware({ serializableCheck: false });
const store = configureStore({
  reducer: todoSlice.reducer,
  middleware,
});

jest.mock('firebase/utils');

jest.mock('containers/molecules/EditFormDialog', () => () => (
  <div>EditFormDialog</div>
));

describe('TaskItemコンポーネントのテスト', () => {
  afterEach(() => {
    cleanup();
  });

  test('todoアイテムをレンダリング', () => {
    const title = 'test-task';
    const deadline = '2021-01-26';

    const { getByTestId, getByText, getByRole } = render(
      <Provider store={store}>
        <TaskItem id="123" title={title} deadline={deadline} isDone={false} />
      </Provider>,
    );

    expect(getByTestId('task-item')).toBeInTheDocument();
    expect(getByText('やる事：test-task')).toBeInTheDocument();
    expect(getByText('期日：2021-01-26')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('DONE');
  });

  test('doneアイテムをレンダリング', () => {
    const title = 'test-task';
    const deadline = '2021-01-26';

    const { getByTestId, getByText, getByRole } = render(
      <Provider store={store}>
        <TaskItem id="123" title={title} deadline={deadline} isDone />
      </Provider>,
    );

    expect(getByTestId('task-item')).toBeInTheDocument();
    expect(getByText('やる事：test-task')).toBeInTheDocument();
    expect(getByText('期日：2021-01-26')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('TODO');
  });

  test('DONEボタンを押す', async () => {
    const firebaseTaskDoneStub = jest
      .spyOn(firebaseUtils, 'firebaseTaskDone')
      .mockImplementation(() => Promise.resolve());

    const { getByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <TaskItem
          id="123"
          title="test-task"
          deadline="2021-01-01"
          isDone={false}
        />
      </Provider>,
    );

    const buttonElement = getByRole('button');

    userEvent.click(buttonElement);

    expect(getByTestId('linear')).toBeInTheDocument();

    expect(firebaseTaskDoneStub).toHaveBeenCalled();

    await waitFor(() => {
      expect(queryByTestId('linear')).not.toBeInTheDocument();
      expect(getByTestId('task-item')).toBeInTheDocument();
    });
  });

  test('DONEボタンを押した時にfirebaseがエラーを返す', async () => {
    const firebaseTaskDoneStub = jest
      .spyOn(firebaseUtils, 'firebaseTaskDone')
      .mockImplementation(() => Promise.reject());

    const { getByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <TaskItem
          id="123"
          title="test-task"
          deadline="2021-01-01"
          isDone={false}
        />
      </Provider>,
    );

    const buttonElement = getByRole('button');

    userEvent.click(buttonElement);

    expect(getByTestId('linear')).toBeInTheDocument();

    expect(firebaseTaskDoneStub).toHaveBeenCalled();

    await waitFor(() => {
      expect(queryByTestId('linear')).not.toBeInTheDocument();
      expect(getByTestId('task-item')).toBeInTheDocument();
    });
  });

  test('TODOボタンを押す', async () => {
    const firebaseTaskTodoStub = jest
      .spyOn(firebaseUtils, 'firebaseTaskTodo')
      .mockImplementation(() => Promise.resolve());

    const { getByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <TaskItem id="123" title="test-task" deadline="2021-01-01" isDone />
      </Provider>,
    );

    const buttonElement = getByRole('button');

    userEvent.click(buttonElement);

    expect(getByTestId('linear')).toBeInTheDocument();

    expect(firebaseTaskTodoStub).toHaveBeenCalled();

    await waitFor(() => {
      expect(queryByTestId('linear')).not.toBeInTheDocument();
      expect(getByTestId('task-item')).toBeInTheDocument();
    });
  });

  test('TODOボタンを押したときにfirebaseがエラーを返す', async () => {
    const firebaseTaskTodoStub = jest
      .spyOn(firebaseUtils, 'firebaseTaskTodo')
      .mockImplementation(() => Promise.reject());

    const { getByRole, getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <TaskItem id="123" title="test-task" deadline="2021-01-01" isDone />
      </Provider>,
    );

    const buttonElement = getByRole('button');

    userEvent.click(buttonElement);

    expect(getByTestId('linear')).toBeInTheDocument();

    expect(firebaseTaskTodoStub).toHaveBeenCalled();

    await waitFor(() => {
      expect(queryByTestId('linear')).not.toBeInTheDocument();
      expect(getByTestId('task-item')).toBeInTheDocument();
    });
  });
});
