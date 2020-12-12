import React, { FC } from 'react';
import TodoWidget from 'containers/templates/TodoWidget';
import todoList from 'data';

const App: FC = () => <TodoWidget initialTodoList={todoList} />;

export default App;
