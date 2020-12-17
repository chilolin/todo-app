import React, { FC } from 'react';

import Todo, { TaskList } from 'containers/templates/Todo';

const initialState: TaskList = {
  '1': {
    id: '1',
    title: 'task1',
    deadline: undefined,
    createdAt: new Date(2020, 12, 17),
  },
};

const App: FC = () => <Todo initialState={initialState} />;

export default App;
