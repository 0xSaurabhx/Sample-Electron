import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Container, 
  CssBaseline, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  TextField, 
  Toolbar, 
  Typography,
  Checkbox,
  Paper,
  Divider
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: Date.now()
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Electron Todo
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addTodo}
              startIcon={<AddIcon />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Task
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3}>
          <List>
            {todos.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  No tasks yet. Add one above!
                </Typography>
              </Box>
            ) : (
              todos.map((todo) => (
                <React.Fragment key={todo.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteTodo(todo.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => toggleTodo(todo.id)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={todo.completed}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: todo.completed
                                ? 'line-through'
                                : 'none',
                              color: todo.completed ? 'text.secondary' : 'text.primary',
                            }}
                          >
                            {todo.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      </Container>
      
      <Box component="footer" sx={{ py: 3, textAlign: 'center', mt: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Electron Todo App
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
