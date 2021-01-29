import { combineReducers } from 'redux';
import todoReducer from 'features/todo/todoSlice';

export default combineReducers({
  todo: todoReducer,
});
