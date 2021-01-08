import produce from 'immer';

import {
  TodoState,
  FETCH_TASK_LIST,
  TASK_CREATED,
  TASK_DONE,
  TASK_TODO,
  TASK_UPDATED,
  TASK_DELETED,
  TodoActionTypes,
} from 'store/todo/types';

const initialState: TodoState = {
  todoList: {},
  doneList: {},
};

const todoReducer = (
  state = initialState,
  action: TodoActionTypes,
): TodoState => {
  switch (action.type) {
    case FETCH_TASK_LIST:
      return {
        ...action.payload,
      };
    case TASK_CREATED:
      return {
        ...state,
        todoList: produce(state.todoList, (draftTodoList) => {
          const { id } = action.payload;
          const createdAt = new Date();

          draftTodoList[id] = {
            ...action.payload,
            createdAt,
          };
        }),
      };
    case TASK_DONE:
      return {
        ...state,
        ...produce(state, (draftState) => {
          const id = action.payload;
          const task = draftState.todoList[id];

          if (task) {
            draftState.doneList[id] = { ...task };
            delete draftState.todoList[id];
          }
        }),
      };
    case TASK_TODO:
      return {
        ...state,
        ...produce(state, (draftState) => {
          const id = action.payload;
          const task = draftState.doneList[id];

          if (task) {
            draftState.todoList[id] = { ...task };
            delete draftState.doneList[id];
          }
        }),
      };
    case TASK_UPDATED:
      return {
        ...state,
        todoList: produce(state.todoList, (draftTodoList) => {
          const { id, ...data } = action.payload;
          const task = draftTodoList[id];

          if (task) draftTodoList[id] = { ...task, ...data };
        }),
      };
    case TASK_DELETED:
      return {
        ...state,
        todoList: produce(state.todoList, (draftTodoList) => {
          const id = action.payload;
          const task = draftTodoList[id];

          if (task) delete draftTodoList[id];
        }),
      };
    default:
      return state;
  }
};

export default todoReducer;
