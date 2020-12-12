type Task = {
  id: string;
  title: string;
  deadline?: string;
  createdAt: Date;
};

const todoList: { [id: string]: Task } = {
  '1': {
    id: '1',
    title: 'task1',
    deadline: '12/12',
    createdAt: new Date(2020, 12, 12),
  },
};

export default todoList;
