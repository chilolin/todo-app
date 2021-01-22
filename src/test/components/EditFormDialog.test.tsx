/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { todoSlice } from 'features/todo';

import EditFormDialog from 'containers/molecules/EditFormDialog';

const middleware = getDefaultMiddleware({ serializableCheck: false });
const store = configureStore({
  reducer: todoSlice.reducer,
  middleware,
});

jest.mock(
  '@material-ui/core/TextField',
  () => ({
    InputLabelProps,
    ...otherProps
  }: {
    InputLabelProps: { shrink: boolean };
    [prop: string]: unknown;
  }) => (InputLabelProps ? <input {...otherProps} /> : null),
);

jest.mock(
  'components/molecules/SpinnerButton',
  () => ({
    children,
    onClick,
    isLoading,
    ...otherProps
  }: {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
    [other: string]: unknown;
  }) =>
    !isLoading ? (
      <button type="button" onClick={onClick} {...otherProps}>
        {children}
      </button>
    ) : null,
);

jest.mock('firebase/utils', () => ({
  taskUpdated: () => Promise.resolve(),
  taskDeleted: () => Promise.resolve(),
}));

let container: Element | null = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

describe('EditFormDialog', () => {
  test('レンダリング', () => {
    render(
      <Provider store={store}>
        <EditFormDialog id="123" />
      </Provider>,
    );
    expect(screen.getByTestId('dialog-toggle').getAttribute('aria-label')).toBe(
      'edit',
    );
  });

  test('ダイアログを開閉', async () => {
    render(
      <Provider store={store}>
        <EditFormDialog id="123" />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('dialog-toggle'));
    const updateButton = screen.getByTestId('update-button');
    const deleteButton = screen.getByTestId('delete-button');
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(updateButton);
    });
  });

  test('入力できる', () => {
    render(
      <Provider store={store}>
        <EditFormDialog id="123" />
      </Provider>,
    );
    userEvent.click(screen.getByTestId('dialog-toggle'));

    const todoInput = screen.getByTestId('todo-input') as HTMLInputElement;
    const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
    userEvent.type(todoInput, 'task2');
    userEvent.type(dateInput, '2021-01-22');
    expect(todoInput.value).toBe('task2');
    expect(dateInput.value).toBe('2021-01-22');
  });
});
