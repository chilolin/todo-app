type Task = {
  id: string;
  title: string;
  deadline?: Date;
  createdAt: Date;
};

const date: Date = new Date(2020, 12);

const todoList: Task[] = [
  {
    id: '1',
    title: 'task1',
    deadline: date,
    createdAt: date,
  },
];

export default todoList;
