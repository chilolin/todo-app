import React from 'react';
import { Provider } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';

import { RootState } from 'reducers';
import * as reducers from 'features/todo/todoSlice';
import * as firebaseUtils from 'firebase/utils';

import EditFormDialog from 'components/molecules/EditFormDialog';
import EnhancedEditFormDialog from 'containers/molecules/EditFormDialog';

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
  () => ({
    children,
    onClick,
    isLoading,
  }: {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      data-testid={children}
    >
      {children}
    </button>
  ),
);

describe('EditFormDialog', () => {
  describe('component のテスト', () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const mockhandleTaskUpdated = jest.fn();
    const mockhandleTaskDeleted = jest.fn();
    const mockHandleChange = jest.fn();

    beforeEach(() => {
      mockHandleOpen.mockReset();
      mockHandleClose.mockReset();
      mockhandleTaskUpdated.mockReset();
      mockhandleTaskDeleted.mockReset();
      mockHandleChange.mockReset();
    });

    afterEach(() => {
      cleanup();
    });

    test('ダイアログが閉じているときのレンダリング', () => {
      const { getByTestId, queryByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen={false}
          isError={false}
          title="task0"
          deadline="2021-01-01"
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      expect(getByTestId('edit-button')).toBeInTheDocument();
      expect(queryByTestId('dialog')).not.toBeInTheDocument();
      expect(queryByTestId('error')).not.toBeInTheDocument();
    });

    test('ダイアログが開いているときのレンダリング', () => {
      const { getByTestId, queryByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen
          isError={false}
          title="task0"
          deadline="2021-01-01"
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      expect(getByTestId('edit-button')).toBeInTheDocument();
      expect(getByTestId('dialog')).toBeInTheDocument();
      expect(queryByTestId('error')).not.toBeInTheDocument();
    });

    test('エラー発生時のレンダリング', () => {
      const { getByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen
          isError
          title="task0"
          deadline="2021-01-01"
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      expect(getByTestId('error')).toBeInTheDocument();
    });

    test('ローディング中にボタンを押すことができない', () => {
      const { getByTestId } = render(
        <EditFormDialog
          isLoading
          isOpen
          isError={false}
          title=""
          deadline=""
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      const updateButtonElement = getByTestId('更新する');
      const deleteButtonElement = getByTestId('削除する');

      userEvent.click(updateButtonElement);
      expect(mockhandleTaskUpdated).not.toHaveBeenCalled();

      userEvent.click(deleteButtonElement);
      expect(mockhandleTaskUpdated).not.toHaveBeenCalled();
    });

    test('編集ボタンを押す処理', () => {
      const { getByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen={false}
          isError={false}
          title="task0"
          deadline="2021-01-01"
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      const buttonElement = getByTestId('edit-button');

      userEvent.click(buttonElement);
      expect(mockHandleOpen).toHaveBeenCalledTimes(1);

      userEvent.click(buttonElement);
      expect(mockHandleOpen).toHaveBeenCalledTimes(2);
    });

    test('ダイアログが開いていても編集ボタンは押せる', () => {
      const { getByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen
          isError={false}
          title=""
          deadline=""
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      userEvent.click(getByTestId('edit-button'));
      expect(mockHandleOpen).toHaveBeenCalled();
    });

    test('更新ボタンを押す処理', () => {
      const { getByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen
          isError={false}
          title="task0"
          deadline="2021-01-01"
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      userEvent.click(getByTestId('更新する'));
      expect(mockhandleTaskUpdated).toHaveBeenCalled();
    });

    test('削除ボタンを押す処理', () => {
      const { getByTestId } = render(
        <EditFormDialog
          isLoading={false}
          isOpen
          isError={false}
          title="task0"
          deadline="2021-01-01"
          handleOpen={mockHandleOpen}
          handleClose={mockHandleClose}
          handleTaskUpdated={mockhandleTaskUpdated}
          handleTaskDeleted={mockhandleTaskDeleted}
          handleChange={mockHandleChange}
        />,
      );

      userEvent.click(getByTestId('削除する'));
      expect(mockhandleTaskDeleted).toHaveBeenCalled();
    });
  });

  describe('container のテスト', () => {
    const initialState: RootState = {
      todo: {
        todoList: {
          '123': {
            id: '123',
            title: 'task0',
            deadline: '2021-01-01',
            createdAt: new Date(2021, 1, 1),
          },
        },
        doneList: {},
      },
    };

    const reduxProvider = (WrappedComponent: JSX.Element) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false });
      const mockStore = configureStore(middleware);

      return (
        <Provider store={mockStore(initialState)}>{WrappedComponent}</Provider>
      );
    };

    afterEach(() => {
      cleanup();
    });

    test('編集ボタンを押すとダイアログが開く', () => {
      const { getByTestId, queryByTestId } = render(
        reduxProvider(<EnhancedEditFormDialog id="123" />),
      );

      expect(getByTestId('edit-button')).toBeInTheDocument();
      expect(queryByTestId('dialog')).not.toBeInTheDocument();

      userEvent.click(getByTestId('edit-button'));
      expect(getByTestId('edit-button')).toBeInTheDocument();
      expect(getByTestId('dialog')).toBeInTheDocument();
    });

    test('フォームに入力する処理', () => {
      const { getByTestId, getByLabelText } = render(
        reduxProvider(<EnhancedEditFormDialog id="123" />),
      );

      userEvent.click(getByTestId('edit-button'));

      const titleInputElement = getByLabelText('やる事') as HTMLInputElement;
      const dateInputElement = getByLabelText('期日') as HTMLInputElement;

      userEvent.clear(titleInputElement);
      expect(titleInputElement).toHaveValue('');

      userEvent.type(titleInputElement, 'task1');
      expect(titleInputElement).toHaveValue('task1');

      userEvent.clear(dateInputElement);
      expect(dateInputElement).toHaveValue('');

      userEvent.type(dateInputElement, '2021-01-02');
      expect(dateInputElement).toHaveValue('2021-01-02');
    });

    test('更新ボタンを押す処理', async () => {
      const mockTaskUpdated = jest.spyOn(reducers, 'taskUpdated');
      const mockFirebaseTaskUpdated = jest
        .spyOn(firebaseUtils, 'firebaseTaskUpdated')
        .mockImplementation(() => Promise.resolve());

      const { getByTestId, queryByTestId } = render(
        reduxProvider(<EnhancedEditFormDialog id="123" />),
      );

      userEvent.click(getByTestId('edit-button'));

      const buttonElement = getByTestId('更新する') as HTMLButtonElement;

      userEvent.click(buttonElement);
      expect(buttonElement.disabled).toEqual(true);
      await waitFor(() => {
        expect(mockFirebaseTaskUpdated).toHaveBeenCalled();
      });
      expect(mockTaskUpdated).toHaveBeenCalled();
      expect(buttonElement.disabled).toEqual(false);
      expect(queryByTestId('dialog')).not.toBeInTheDocument();
    });

    test('更新ボタンを押したときfirebaseがエラーを返す', async () => {
      const mockTaskUpdated = jest.spyOn(reducers, 'taskUpdated');
      const mockFirebaseTaskUpdated = jest
        .spyOn(firebaseUtils, 'firebaseTaskUpdated')
        .mockImplementation(() => Promise.reject());

      const { getByTestId, queryByTestId } = render(
        reduxProvider(<EnhancedEditFormDialog id="123" />),
      );

      userEvent.click(getByTestId('edit-button'));

      const buttonElement = getByTestId('更新する') as HTMLButtonElement;

      userEvent.click(buttonElement);
      expect(buttonElement.disabled).toEqual(true);
      expect(queryByTestId('error')).not.toBeInTheDocument();
      await waitFor(() => {
        expect(mockFirebaseTaskUpdated).toHaveBeenCalled();
      });
      expect(mockTaskUpdated).not.toHaveBeenCalled();
      expect(getByTestId('error')).toBeInTheDocument();
      expect(buttonElement.disabled).toEqual(false);
    });

    test('削除ボタンを押す処理', async () => {
      const mockTaskDeleted = jest.spyOn(reducers, 'taskDeleted');
      const mockFirebaseTaskDeleted = jest
        .spyOn(firebaseUtils, 'firebaseTaskDeleted')
        .mockImplementation(() => Promise.resolve());

      const { getByTestId, queryByTestId } = render(
        reduxProvider(<EnhancedEditFormDialog id="123" />),
      );

      userEvent.click(getByTestId('edit-button'));

      const buttonElement = getByTestId('削除する') as HTMLButtonElement;

      userEvent.click(buttonElement);
      expect(buttonElement.disabled).toEqual(true);
      await waitFor(() => {
        expect(mockFirebaseTaskDeleted).toHaveBeenCalled();
      });
      expect(mockTaskDeleted).toHaveBeenCalled();
      expect(buttonElement.disabled).toEqual(false);
      expect(queryByTestId('dialog')).not.toBeInTheDocument();
    });

    test('削除ボタンを押したときfirebaseがエラーを返す', async () => {
      const mockTaskDeleted = jest.spyOn(reducers, 'taskDeleted');
      const mockFirebaseTaskDeleted = jest
        .spyOn(firebaseUtils, 'firebaseTaskDeleted')
        .mockImplementation(() => Promise.reject());

      const { getByTestId, queryByTestId } = render(
        reduxProvider(<EnhancedEditFormDialog id="123" />),
      );

      userEvent.click(getByTestId('edit-button'));

      const buttonElement = getByTestId('削除する') as HTMLButtonElement;

      userEvent.click(buttonElement);
      expect(buttonElement.disabled).toEqual(true);
      expect(queryByTestId('error')).not.toBeInTheDocument();
      await waitFor(() => {
        expect(mockFirebaseTaskDeleted).toHaveBeenCalled();
      });
      expect(mockTaskDeleted).not.toHaveBeenCalled();
      expect(getByTestId('error')).toBeInTheDocument();
      expect(buttonElement.disabled).toEqual(false);
    });
  });
});
