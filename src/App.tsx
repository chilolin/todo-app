import React, { FC } from 'react';

import GlobalStyle from 'global.styles';
import Todo from 'components/pages/Todo';

const App: FC = () => (
  <>
    <GlobalStyle />
    <Todo />
  </>
);

export default App;
