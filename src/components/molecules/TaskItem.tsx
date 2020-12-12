import React, { FC } from 'react';

type Props = {
  title: string;
  deadline?: string;
};

const TaskItem: FC<Props> = ({ title = '', deadline = undefined }) => (
  <li>
    <span>{title}</span>
    <span>{deadline}</span>
  </li>
);

export default TaskItem;
