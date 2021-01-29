import { AnyAction } from 'redux';

import todoSlice, {
  fetchTaskList,
  taskCreated,
  taskDone,
  taskTodo,
  taskUpdated,
  taskDeleted,
} from 'features/todo/todoSlice';

const task1 = {
  '123': {
    id: '123',
    title: 'task1',
    deadline: '2021-01-29',
    createdAt: new Date(2021, 1, 29),
  },
};

const task2 = {
  '456': {
    id: '456',
    title: 'task2',
    deadline: '2021-01-30',
    createdAt: new Date(2021, 1, 29),
  },
};

describe('todos reducer', () => {
  it('initial state の処理', () => {
    expect(todoSlice(undefined, {} as AnyAction)).toEqual({
      todoList: {},
      doneList: {},
    });
  });

  it('FETCH_TASK_LIST の処理', () => {
    expect(
      todoSlice(undefined, {
        type: fetchTaskList.type,
        payload: {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
      }),
    ).toEqual({
      todoList: {
        ...task1,
      },
      doneList: {
        ...task2,
      },
    });
  });

  it('TASK_CREATED の処理', () => {
    expect(
      todoSlice(undefined, {
        type: taskCreated.type,
        payload: {
          id: '123',
          title: 'task1',
          deadline: '2021-01-29',
        },
      }),
    ).toEqual({
      todoList: {
        '123': {
          id: '123',
          title: 'task1',
          deadline: '2021-01-29',
          createdAt: new Date(),
        },
      },
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {},
        },
        {
          type: taskCreated.type,
          payload: {
            id: '456',
            title: 'task2',
            deadline: '2021-01-30',
          },
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
        '456': {
          id: '456',
          title: 'task2',
          deadline: '2021-01-30',
          createdAt: new Date(),
        },
      },
      doneList: {},
    });
  });

  it('TASK_DONE の処理', () => {
    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {},
        },
        {
          type: taskDone.type,
          payload: '123',
        },
      ),
    ).toEqual({
      todoList: {},
      doneList: {
        ...task1,
      },
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
            ...task2,
          },
          doneList: {},
        },
        {
          type: taskDone.type,
          payload: '456',
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
      },
      doneList: {
        ...task2,
      },
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
        {
          type: taskDone.type,
          payload: '123',
        },
      ),
    ).toEqual({
      todoList: {},
      doneList: {
        ...task1,
        ...task2,
      },
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
            ...task2,
          },
          doneList: {},
        },
        {
          type: taskDone.type,
          payload: '789',
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
        ...task2,
      },
      doneList: {},
    });
  });

  it('TASK_TODO の処理', () => {
    expect(
      todoSlice(
        {
          todoList: {},
          doneList: {
            ...task1,
          },
        },
        {
          type: taskTodo.type,
          payload: '123',
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
      },
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {},
          doneList: {
            ...task1,
            ...task2,
          },
        },
        {
          type: taskTodo.type,
          payload: '456',
        },
      ),
    ).toEqual({
      todoList: {
        ...task2,
      },
      doneList: {
        ...task1,
      },
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
        {
          type: taskTodo.type,
          payload: '456',
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
        ...task2,
      },
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
            ...task2,
          },
          doneList: {},
        },
        {
          type: taskTodo.type,
          payload: '789',
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
        ...task2,
      },
      doneList: {},
    });
  });

  it('TASK_UPDATED の処理', () => {
    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {},
        },
        {
          type: taskUpdated.type,
          payload: {
            id: '123',
            title: 'new-task1',
            deadline: '2022-01-29',
          },
        },
      ),
    ).toEqual({
      todoList: {
        '123': {
          id: '123',
          title: 'new-task1',
          deadline: '2022-01-29',
          createdAt: new Date(2021, 1, 29),
        },
      },
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
            ...task2,
          },
          doneList: {},
        },
        {
          type: taskUpdated.type,
          payload: {
            id: '123',
            title: 'new-task1',
            deadline: '2022-01-29',
          },
        },
      ),
    ).toEqual({
      todoList: {
        '123': {
          id: '123',
          title: 'new-task1',
          deadline: '2022-01-29',
          createdAt: new Date(2021, 1, 29),
        },
        ...task2,
      },
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
        {
          type: taskUpdated.type,
          payload: {
            id: '123',
            title: 'new-task1',
            deadline: '2022-01-29',
          },
        },
      ),
    ).toEqual({
      todoList: {
        '123': {
          id: '123',
          title: 'new-task1',
          deadline: '2022-01-29',
          createdAt: new Date(2021, 1, 29),
        },
      },
      doneList: {
        ...task2,
      },
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
        {
          type: taskUpdated.type,
          payload: {
            id: '789',
            title: 'new-task3',
            deadline: '2022-01-29',
          },
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
      },
      doneList: {
        ...task2,
      },
    });
  });

  it('TASK_DELETED の処理', () => {
    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {},
        },
        {
          type: taskDeleted.type,
          payload: '123',
        },
      ),
    ).toEqual({
      todoList: {},
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
            ...task2,
          },
          doneList: {},
        },
        {
          type: taskDeleted.type,
          payload: '123',
        },
      ),
    ).toEqual({
      todoList: {
        ...task2,
      },
      doneList: {},
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
        {
          type: taskDeleted.type,
          payload: '123',
        },
      ),
    ).toEqual({
      todoList: {},
      doneList: {
        ...task2,
      },
    });

    expect(
      todoSlice(
        {
          todoList: {
            ...task1,
          },
          doneList: {
            ...task2,
          },
        },
        {
          type: taskDeleted.type,
          payload: '789',
        },
      ),
    ).toEqual({
      todoList: {
        ...task1,
      },
      doneList: {
        ...task2,
      },
    });
  });
});
