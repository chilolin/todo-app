import {
  TodoState,
  FETCH_TODO_LIST,
  FETCH_DONE_LIST,
  TASK_CREATED,
  TASK_DONE,
  TASK_TODO,
  TASK_UPDATED,
  TASK_DELETED,
  TodoActionTypes,
} from 'store/todo/types';

import {
  addTaskToTodoList,
  convertFromTodoListToDoneList,
  convertFromDoneListToTodoList,
  updateTaskInTodoList,
  removeTaskFromTodoList,
} from 'store/todo/utils';

const initialState: TodoState = {
  todoList: {},
  doneList: {},
};

const todoReducer = (
  state = initialState,
  action: TodoActionTypes,
): TodoState => {
  switch (action.type) {
    case FETCH_TODO_LIST:
      return {
        ...state,
        todoList: action.payload,
      };
    case FETCH_DONE_LIST:
      return {
        ...state,
        doneList: action.payload,
      };
    case TASK_CREATED:
      return {
        ...state,
        todoList: addTaskToTodoList(state.todoList, action.payload),
      };
    case TASK_DONE:
      return {
        ...convertFromTodoListToDoneList(state, action.payload),
      };
    case TASK_TODO:
      return {
        ...convertFromDoneListToTodoList(state, action.payload),
      };
    case TASK_UPDATED:
      return {
        ...state,
        todoList: updateTaskInTodoList(state.todoList, action.payload),
      };
    case TASK_DELETED:
      return {
        ...state,
        todoList: removeTaskFromTodoList(state.todoList, action.payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
