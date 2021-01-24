import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { todoSlice } from 'features/todo';

import CreateForm from 'containers/organisms/CreateForm';

const middleware = getDefaultMiddleware({ serializableCheck: false });
const store = configureStore({
  reducer: todoSlice.reducer,
  middleware,
});

jest.mock('firebase/utils');

jest.mock(
  'components/molecules/SpinnerButton',
  () => ({
    children,
    color,
    isLoading,
  }: {
    children: string;
    color: string;
    isLoading: boolean;
  }) => (
    <button type="submit" color={color} disabled={isLoading}>
      {children}
    </button>
  ),
);

describe('CreateForm', () => {
  afterEach(() => {
    cleanup();
  });

  test('レンダリング', () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('追加する');
  });

  test('ボタンを押した後のローディング', async () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );
    const titleInput = screen.getByLabelText(/やる事/) as HTMLInputElement;
    const dateInput = screen.getByLabelText(/期日/) as HTMLInputElement;
    const addButton = screen.getByRole('button') as HTMLButtonElement;
    userEvent.type(titleInput, 'test-task');

    userEvent.click(addButton);
    expect(titleInput.disabled).toBe(true);
    expect(dateInput.disabled).toBe(true);
    expect(addButton.disabled).toBe(true);
    await waitFor(() => {
      expect(titleInput.disabled).toBe(false);
      expect(dateInput.disabled).toBe(false);
      expect(addButton.disabled).toBe(false);
    });
  });

  test('フォームの入力とボタンによるクリア', async () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );
    const titleInput = screen.getByLabelText(/やる事/) as HTMLInputElement;
    const dateInput = screen.getByLabelText(/期日/) as HTMLInputElement;
    const addButton = screen.getByRole('button') as HTMLButtonElement;

    userEvent.type(titleInput, 'test-task');
    expect(titleInput).toHaveValue('test-task');
    userEvent.type(dateInput, '2021-01-23');
    expect(dateInput).toHaveValue('2021-01-23');

    userEvent.click(addButton);
    await waitFor(() => {
      expect(titleInput).toHaveValue('');
      expect(dateInput).toHaveValue('');
    });
  });

  test('firebaseのエラー', async () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );
    const titleInput = screen.getByLabelText(/やる事/) as HTMLInputElement;
    const addButton = screen.getByRole('button') as HTMLButtonElement;

    userEvent.type(titleInput, 'test-error-task');
    userEvent.click(addButton);
    await waitFor(() => {
      expect(addButton.validity).toBe('');
    });
  });
});
