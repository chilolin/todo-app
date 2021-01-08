import { combineReducers } from 'redux';

import todoReducer from 'store/todo/reducers';

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
