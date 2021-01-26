import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { todoSlice } from 'features/todo';
import * as firebaseUtils from 'firebase/utils';

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

describe('CreateFormコンポーネントのテスト', () => {
  afterEach(() => {
    cleanup();
  });

  test('レンダリングする', () => {
    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );

    expect(getByLabelText(/やる事/)).toBeInTheDocument();
    expect(getByLabelText(/期日/)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('フォームに入力する', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );

    const titleInputElement = getByLabelText(/やる事/) as HTMLInputElement;
    const dateInputElement = getByLabelText(/期日/) as HTMLInputElement;

    userEvent.type(titleInputElement, 'test-task');
    userEvent.type(dateInputElement, '2021-01-26');

    expect(titleInputElement).toHaveValue('test-task');
    expect(dateInputElement).toHaveValue('2021-01-26');
  });

  test('追加するボタンを押す', async () => {
    const taskCreatedStub = jest
      .spyOn(firebaseUtils, 'firebaseTaskCreated')
      .mockImplementation(() => Promise.resolve('123'));

    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );

    const titleInputElement = getByLabelText(/やる事/) as HTMLInputElement;
    const dateInputElement = getByLabelText(/期日/) as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;

    userEvent.type(titleInputElement, 'test-task');
    userEvent.type(dateInputElement, '2021-01-26');

    expect(titleInputElement.value).toEqual('test-task');
    expect(dateInputElement.value).toEqual('2021-01-26');

    userEvent.click(buttonElement);

    expect(titleInputElement.disabled).toEqual(true);
    expect(dateInputElement.disabled).toEqual(true);
    expect(buttonElement.disabled).toEqual(true);

    expect(taskCreatedStub).toHaveBeenCalled();

    await waitFor(() => {
      expect(titleInputElement.value).toEqual('');
      expect(dateInputElement.value).toEqual('');
      expect(titleInputElement.disabled).toEqual(false);
      expect(dateInputElement.disabled).toEqual(false);
      expect(buttonElement.disabled).toEqual(false);
    });
  });

  test('firebaseがエラーを返す', async () => {
    const firebaseTaskCreatedStub = jest
      .spyOn(firebaseUtils, 'firebaseTaskCreated')
      .mockImplementation(() => Promise.reject());

    const { getByRole } = render(
      <Provider store={store}>
        <CreateForm />
      </Provider>,
    );

    const buttonElement = getByRole('button') as HTMLButtonElement;

    userEvent.click(buttonElement);

    expect(buttonElement.disabled).toEqual(true);

    expect(firebaseTaskCreatedStub).toHaveBeenCalled();

    await waitFor(() => {
      expect(buttonElement.disabled).toEqual(false);
    });
  });
});
