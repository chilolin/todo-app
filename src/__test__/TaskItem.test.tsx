import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { todoSlice } from 'features/todo';

import TaskItem from 'containers/molecules/TaskItem';

const middleware = getDefaultMiddleware({ serializableCheck: false });
const store = configureStore({
  reducer: todoSlice.reducer,
  middleware,
});

jest.mock('firebase/utils', () => ({
  taskDone: () => Promise.resolve(),
  taskTodo: () => Promise.resolve(),
}));

jest.mock('@material-ui/core/LinearProgress', () => () => (
  <div>...Loading中</div>
));

jest.mock(
  '@material-ui/core/Button',
  () => ({
    children,
    onClick,
  }: {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
);

jest.mock('containers/molecules/EditFormDialog', () => () => (
  <div>EditFormDialog</div>
));

afterEach(() => {
  cleanup();
});

describe('TaskItem', () => {
  test('todoアイテムをレンダリング', () => {
    render(
      <Provider store={store}>
        <TaskItem
          id="123"
          title="test-task"
          deadline="2021-01-01"
          isDone={false}
        />
      </Provider>,
    );
    expect(screen.getByRole('button').textContent).toBe('DONE');
  });

  test('doneアイテムをレンダリング', () => {
    render(
      <Provider store={store}>
        <TaskItem id="123" title="test-task" deadline="2021-01-01" isDone />
      </Provider>,
    );
    expect(screen.getByRole('button').textContent).toBe('TODO');
  });

  test('DONEボタンを押す', async () => {
    render(
      <Provider store={store}>
        <TaskItem
          id="123"
          title="test-task"
          deadline="2021-01-01"
          isDone={false}
        />
      </Provider>,
    );
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('...Loading中')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('...Loading中')).not.toBeInTheDocument();
    });
  });

  test('TODOボタンを押す', async () => {
    render(
      <Provider store={store}>
        <TaskItem id="123" title="test-task" deadline="2021-01-01" isDone />
      </Provider>,
    );
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('...Loading中')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('...Loading中')).not.toBeInTheDocument();
    });
  });
});
