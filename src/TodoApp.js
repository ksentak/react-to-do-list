import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { db } from './firebase';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';

import uuid from 'uuid/v4';

function TodoApp() {
  // Initial Todos
  const initialTodos = [{ id: '', task: '', completed: false }];

  // Set State
  const [todos, setTodos] = useState(initialTodos);

  // Loads Firebase Todos
  useEffect(() => {
    const unsub = db.collection('items').onSnapshot((snapshot) => {
      const todos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todos);
    });
    return () => {
      console.log('cleanup');
      unsub();
    };
  }, []);

  // Add Todos
  // const addTodo = (newTodoText) => {
  //   setTodos([...todos, { id: uuid(), task: newTodoText, complete: false }]);
  // };

  // Add Todos
  const addTodo = (newTodoText) => {
    db.collection('items')
      .doc()
      .set({
        id: uuid(),
        task: newTodoText,
        completed: false,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  // Remove Todos
  // const removeTodo = (todoId) => {
  //   const updatedTodos = todos.filter((todo) => todo.id !== todoId);
  //   setTodos(updatedTodos);
  // };

  const removeTodo = (id, todoId) => {
    db.collection('items')
      .where(id, '==', todoId)
      .doc()
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  // Toggle Todos
  const toggleTodo = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Edit Todos
  const editTodo = (todoId, newTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        height: '100vh',
        backgroundColor: '#fafafa',
      }}
      elevation={0}
    >
      <AppBar color='primary' position='static' style={{ height: '64px' }}>
        <Toolbar color='inherit'>To-Do List w/ Hooks</Toolbar>
      </AppBar>
      <Grid container justify='center' style={{ marginTop: '1rem' }}>
        <Grid item xs={11} md={8} lg={4}>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={todos}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TodoApp;
