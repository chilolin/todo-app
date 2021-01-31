import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import todoSlice, * as reducers from 'features/todo/todoSlice';
import * as firebaseUtils from 'firebase/utils';

import CreateForm from 'components/organisms/CreateForm';
import EnhancedCreateForm from 'containers/organisms/CreateForm';

jest.mock('firebase/utils');

jest.mock(
  'components/molecules/TodoForm',
  () => ({
    title,
    deadline,
    handleChange,
  }: {
    title: string;
    deadline: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <>
      <label htmlFor="create-title">
        やる事
        <input
          id="create-title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="create-deadline">
        期日
        <input
          id="create-deadline"
          name="deadline"
          value={deadline}
          onChange={handleChange}
        />
      </label>
    </>
  ),
);

jest.mock(
  'components/molecules/SpinnerButton',
  () => ({ children, isLoading }: { children: string; isLoading: boolean }) => (
    <button type="submit" disabled={isLoading}>
      {children}
    </button>
  ),
);

jest.mock('components/molecules/Snackbars', () => () => (
  <div data-testid="error">Snackbars</div>
));

describe('CreateForm', () => {
  describe('component のテスト', () => {
    const mockHandleError = jest.fn();
    const mockHandleTaskCreated = jest.fn();
    const mockHandleChange = jest.fn();

    beforeEach(() => {
      mockHandleError.mockReset();
      mockHandleTaskCreated.mockReset();
      mockHandleChange.mockReset();
    });

    afterEach(() => {
      cleanup();
    });

    test('レンダリングする', () => {
      const { getByTestId } = render(
        <CreateForm
          isLoading={false}
          isError={false}
          title=""
          deadline=""
          handleError={mockHandleError}
          handleTaskCreated={mockHandleTaskCreated}
          handleChange={mockHandleChange}
        />,
      );

      expect(getByTestId('create-form')).toBeInTheDocument();
    });

    test('エラー発生時のレンダリング', () => {
      const { getByTestId } = render(
        <CreateForm
          isLoading={false}
          isError
          title=""
          deadline=""
          handleError={mockHandleError}
          handleTaskCreated={mockHandleTaskCreated}
          handleChange={mockHandleChange}
        />,
      );

      expect(getByTestId('error')).toBeInTheDocument();
    });

    test('ボタンを押す処理', () => {
      const { getByRole } = render(
        <CreateForm
          isLoading={false}
          isError={false}
          title=""
          deadline=""
          handleError={mockHandleError}
          handleTaskCreated={mockHandleTaskCreated}
          handleChange={mockHandleChange}
        />,
      );

      userEvent.click(getByRole('button'));
      expect(mockHandleTaskCreated).toHaveBeenCalled();
    });

    test('ローディング中はボタンを押すことができない', () => {
      const { getByRole } = render(
        <CreateForm
          isLoading
          isError={false}
          title=""
          deadline=""
          handleError={mockHandleError}
          handleTaskCreated={mockHandleTaskCreated}
          handleChange={mockHandleChange}
        />,
      );

      userEvent.click(getByRole('button'));
      expect(mockHandleTaskCreated).not.toHaveBeenCalled();
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

    test('フォームに入力する処理', () => {
      const { getByLabelText } = render(reduxProvider(<EnhancedCreateForm />));

      const titleInputElement = getByLabelText('やる事') as HTMLInputElement;
      const deadlineInputElement = getByLabelText('期日') as HTMLInputElement;

      userEvent.type(titleInputElement, 'task0');
      expect(titleInputElement).toHaveValue('task0');

      userEvent.clear(titleInputElement);
      expect(titleInputElement).toHaveValue('');

      userEvent.type(deadlineInputElement, '2021-01-01');
      expect(deadlineInputElement).toHaveValue('2021-01-01');

      userEvent.clear(deadlineInputElement);
      expect(deadlineInputElement).toHaveValue('');
    });

    test('ボタンを押す処理', async () => {
      const mockTaskCreated = jest.spyOn(reducers, 'taskCreated');
      const mockFirebaseTaskCreated = jest
        .spyOn(firebaseUtils, 'firebaseTaskCreated')
        .mockImplementation(() => Promise.resolve('123'));

      const { getByLabelText, getByRole } = render(
        reduxProvider(<EnhancedCreateForm />),
      );

      const titleInputElement = getByLabelText('やる事') as HTMLInputElement;
      const deadlineInputElement = getByLabelText('期日') as HTMLInputElement;
      const buttonElement = getByRole('button') as HTMLButtonElement;

      userEvent.type(titleInputElement, 'task0');
      expect(titleInputElement).toHaveValue('task0');

      userEvent.type(deadlineInputElement, '2021-01-01');
      expect(deadlineInputElement).toHaveValue('2021-01-01');

      userEvent.click(buttonElement);
      expect(buttonElement.disabled).toEqual(true);
      await waitFor(() => {
        expect(mockFirebaseTaskCreated).toHaveBeenCalled();
      });
      expect(mockTaskCreated).toHaveBeenCalled();
      expect(titleInputElement).toHaveValue('');
      expect(deadlineInputElement).toHaveValue('');
      expect(buttonElement.disabled).toEqual(false);
    });

    test('firebaseがエラーを返す', async () => {
      const mockTaskCreated = jest.spyOn(reducers, 'taskCreated');
      const mockFirebaseTaskCreated = jest
        .spyOn(firebaseUtils, 'firebaseTaskCreated')
        .mockImplementation(() => Promise.reject());

      const { getByLabelText, getByRole, getByTestId, queryByTestId } = render(
        reduxProvider(<EnhancedCreateForm />),
      );

      const inputElement = getByLabelText('やる事');

      userEvent.type(inputElement, 'task0');
      expect(inputElement).toHaveValue('task0');

      const buttonElement = getByRole('button') as HTMLButtonElement;

      userEvent.click(buttonElement);
      expect(queryByTestId('error')).not.toBeInTheDocument();
      expect(buttonElement.disabled).toEqual(true);
      await waitFor(() => {
        expect(mockFirebaseTaskCreated).toHaveBeenCalled();
      });
      expect(mockTaskCreated).not.toHaveBeenCalled();
      expect(inputElement).toHaveValue('task0');
      expect(getByTestId('error')).toBeInTheDocument();
      expect(buttonElement.disabled).toEqual(false);
    });
  });
});
