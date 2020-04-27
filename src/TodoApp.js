import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import uuid from 'uuid/v4';

function TodoApp() {
  // Initial Todos
  const initialTodos = [
    { id: 1, task: 'Take out trash', completed: false },
    { id: 2, task: 'Do dishes', completed: true },
    { id: 3, task: 'Laundry', completed: false },
  ];
  // Set State
  const [todos, setTodos] = useState(initialTodos);
  // Add Todos
  const addTodo = (newTodoText) => {
    setTodos([...todos, { id: uuid(), task: newTodoText, complete: false }]);
  };
  // Remove Todos
  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };
  // Toggle Todos
  const toggleTodo = (todoId, newTask) => {
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
