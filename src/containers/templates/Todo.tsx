/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useReducer, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/app';

import TaskBoard from 'containers/organisms/TaskBoard';
import CreateForm from 'containers/organisms/CreateForm';
import UpdateForm from 'containers/organisms/UpdateForm';
import Spinner from 'components/molecules/Spinner/Spinner';

export type Task = {
  id: string;
  title: string;
  deadline?: string;
  createdAt: Date;
};

export type TaskList = {
  [id: string]: Task;
};

type TodoState = {
  todoList: TaskList;
  doneList: TaskList;
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: { todoList: {}, doneList: {} } as TodoState,
  reducers: {
    fetchTodoList: (state, action: PayloadAction<TaskList>) => {
      state.todoList = action.payload;
    },
    fetchDoneList: (state, action: PayloadAction<TaskList>) => {
      state.doneList = action.payload;
    },
    taskCreated: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
      const { id } = action.payload;
      const createdAt = new Date();
      state.todoList[id] = { ...action.payload, id, createdAt };
    },
    taskDone: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.todoList[id];

      if (task) {
        state.doneList[id] = { ...task };
        delete state.todoList[id];
      }
    },
    taskTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.doneList[id];

      if (task) {
        state.todoList[id] = { ...task };
        delete state.doneList[id];
      }
    },
    taskUpdated: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
      const { id, ...data } = action.payload;
      const task = state.todoList[id];

      if (task) state.todoList[id] = { ...task, ...data };
    },
    taskDeleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const task = state.todoList[id];

      if (task) delete state.todoList[id];
    },
  },
});

const Todo: FC<{ initialState: TaskList }> = ({ initialState }) => {
  const firestore = firebase.firestore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(
    todoSlice.reducer,
    initialState,
    (taskList: TaskList): TodoState => ({
      todoList: taskList,
      doneList: taskList,
    }),
  );
  const {
    fetchTodoList,
    fetchDoneList,
    taskCreated,
    taskDone,
    taskTodo,
    taskUpdated,
    taskDeleted,
  } = todoSlice.actions;

  useEffect(() => {
    const fetchTaskLists = async () => {
      setIsLoading(true);
      const todoSnapshot = await firestore.collection('todoList').get();
      const transformedTodo = todoSnapshot.docs
        .map((doc) => {
          const { title, deadline, createdAt } = doc.data() as Task;

          return {
            id: doc.id,
            title,
            deadline,
            createdAt,
          };
        })
        .reduce((accumulator: TaskList, currentValue) => {
          accumulator[currentValue.id] = currentValue;

          return accumulator;
        }, {});

      const doneSnapshot = await firestore.collection('doneList').get();
      const transformedDone = doneSnapshot.docs
        .map((doc) => {
          const { title, deadline, createdAt } = doc.data() as Task;

          return {
            id: doc.id,
            title,
            deadline,
            createdAt,
          };
        })
        .reduce((accumulator: TaskList, currentValue) => {
          accumulator[currentValue.id] = currentValue;

          return accumulator;
        }, {});

      return { transformedTodo, transformedDone };
    };

    fetchTaskLists()
      .then((taskLists) => {
        dispatch(fetchTodoList(taskLists.transformedTodo));
        dispatch(fetchDoneList(taskLists.transformedDone));
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [firestore]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/">
        <TaskBoard
          todoList={state.todoList}
          doneList={state.doneList}
          taskDone={(id: string) => dispatch(taskDone(id))}
          taskTodo={(id: string) => dispatch(taskTodo(id))}
        />
      </Route>
      <Route path="/create">
        <CreateForm
          taskCreated={(task: Omit<Task, 'createdAt'>) =>
            dispatch(taskCreated(task))
          }
        />
      </Route>
      <Route path="/update/:taskId">
        <UpdateForm
          todoList={state.todoList}
          taskUpdated={(task: Omit<Task, 'createdAt'>) =>
            dispatch(taskUpdated(task))
          }
          taskDeleted={(id: string) => dispatch(taskDeleted(id))}
        />
      </Route>
    </Switch>
  );
};

export default Todo;
