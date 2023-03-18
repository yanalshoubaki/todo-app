import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
export type Todo = {
  id: number;
  text: string;
  status: 'active' | 'completed';
};

// Define a type for the slice state
interface TodoList {
  todos: Todo[];
}

// Define the initial state using that type
const initialState: TodoList = {
  todos: [
    { id: 1, text: 'Learn React', status: 'completed' },
    { id: 2, text: 'Learn Redux', status: 'active' },
    { id: 3, text: 'Build something fun!', status: 'active' },
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              status: todo.status === 'active' ? 'completed' : 'active',
            }
          : todo
      );
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
