import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoForm from 'components/molecules/TodoForm';

describe('TodoForm', () => {
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  test('defaultValue がある', () => {
    const { getByLabelText } = render(
      <TodoForm
        isLoading={false}
        title="task0"
        deadline="2021-01-01"
        handleChange={mockHandleChange}
      />,
    );

    expect(getByLabelText(/やる事/)).toHaveValue('task0');
    expect(getByLabelText('期日')).toHaveValue('2021-01-01');
  });

  test('入力する処理', () => {
    const { getByLabelText } = render(
      <TodoForm
        isLoading={false}
        title=""
        deadline=""
        handleChange={mockHandleChange}
      />,
    );

    const titleInputElement = getByLabelText(/やる事/) as HTMLInputElement;
    const dateInputElement = getByLabelText('期日') as HTMLInputElement;

    userEvent.type(titleInputElement, 'task0');
    expect(mockHandleChange).toHaveBeenCalledTimes(5);

    mockHandleChange.mockReset();

    userEvent.type(dateInputElement, '2021-01-01');
    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  test('入力内容を変更する処理', () => {
    const { getByLabelText } = render(
      <TodoForm
        isLoading={false}
        title="task0"
        deadline="2021-01-01"
        handleChange={mockHandleChange}
      />,
    );

    const todoInputElement = getByLabelText(/やる事/) as HTMLInputElement;
    const dateInputElement = getByLabelText('期日') as HTMLInputElement;

    userEvent.clear(todoInputElement);
    expect(mockHandleChange).toHaveBeenCalledTimes(1);

    userEvent.type(todoInputElement, 'new-task0');
    expect(mockHandleChange).toHaveBeenCalledTimes(10);

    mockHandleChange.mockReset();

    userEvent.clear(dateInputElement);
    expect(mockHandleChange).toHaveBeenCalledTimes(1);

    userEvent.type(dateInputElement, '2021-01-02');
    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  test('ローディング中は入力することができない', () => {
    const { getByLabelText } = render(
      <TodoForm
        isLoading
        title=""
        deadline=""
        handleChange={mockHandleChange}
      />,
    );

    const titleInputElement = getByLabelText(/やる事/) as HTMLInputElement;
    const dateInputElement = getByLabelText('期日') as HTMLInputElement;

    userEvent.type(titleInputElement, 'task0');
    expect(mockHandleChange).not.toHaveBeenCalled();

    userEvent.type(dateInputElement, '2021-01-02');
    expect(mockHandleChange).not.toHaveBeenCalled();
  });
});
