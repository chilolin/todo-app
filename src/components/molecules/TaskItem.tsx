import React, { FC } from 'react';

type Props = {
  title: string;
  deadline?: Date;
};

const TaskItem: FC<Props> = ({ title = '', deadline = undefined }) => (
  <li>
    <span>{title}</span>
    <span>{deadline?.getFullYear()}</span>
  </li>
);

export default TaskItem;
