import React, { FC } from 'react';
import TaskBoard from 'components/organisms/TaskBoard';
import todoList from 'data';

const EnhancedTaskBoard: FC = () => <TaskBoard todoList={todoList} />;

export default EnhancedTaskBoard;
