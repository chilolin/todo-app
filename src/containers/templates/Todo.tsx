/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { firestore } from 'firebase.utils';

import todoSlice, { Task, TaskList } from 'features/todo';

import Todo from 'components/templates/Todo';

const EnhancedTodo: FC = () => {
  const { fetchDoneList, fetchTodoList } = todoSlice.actions;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const todoUnsubscribe = firestore
      .collection('todoList')
      .onSnapshot((snapshot) => {
        setIsLoading(true);
        if (snapshot.size) {
          const transformedTodo = snapshot.docs
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
          dispatch(fetchTodoList(transformedTodo));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });

    const doneUnsubscribe = firestore
      .collection('doneList')
      .onSnapshot((snapshot) => {
        setIsLoading(true);
        if (snapshot.size) {
          const transformedDone = snapshot.docs
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
          dispatch(fetchDoneList(transformedDone));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });

    return () => {
      todoUnsubscribe();
      doneUnsubscribe();
    };
  }, [dispatch, fetchDoneList, fetchTodoList]);

  return <Todo isLoading={isLoading} />;
};

export default EnhancedTodo;
