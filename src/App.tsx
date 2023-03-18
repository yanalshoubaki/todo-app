import { useState } from 'react';
import { addTodo, toggleTodo } from './providers/redux/reducers/todo';
import { useSelector } from 'react-redux';
import { RootState } from './providers/redux/store';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

function App() {
  const { todo } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');
  const [text, setText] = useState('');
  const [index, set] = useState(0);

  const handleAddTodo = (event: any) => {
    event.preventDefault();
    dispatch(
      addTodo({
        id: todo.todos.length + 1,
        text,
        status: 'active',
      })
    );
  };
  const handleCompleteTodo = (event: any, id: number) => {
    set(id);
    dispatch(toggleTodo(id));
  };

  return (
    <div className="bg-gradient-to-tr overflow-hidden from-indigo-700 to-emerald-700 h-screen">
      <div className="flex h-screen justify-center items-center">
        <div className="max-w-md mx-auto p-4 bg-white my-auto rounded-md shadow-md">
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Add a new todo"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleAddTodo}
              className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-4">
            <div className="flex flex-row space-x-2 justify-between">
              <button
                onClick={() => setStatus('all')}
                className={clsx(
                  'px-4 w-full py-2 rounded-md',
                  status === 'all' && 'bg-indigo-600 text-white',
                  status !== 'all' &&
                    'bg-indigo-100 text-indigo-600 border border-indigo-600'
                )}
              >
                All
              </button>
              <button
                onClick={() => setStatus('active')}
                className={clsx(
                  'px-4 w-full py-2 rounded-md',
                  status === 'active' && 'bg-indigo-600 text-white',
                  status !== 'active' &&
                    'bg-indigo-100 text-indigo-600 border border-indigo-600'
                )}
              >
                Active
              </button>
              <button
                onClick={() => setStatus('completed')}
                className={clsx(
                  'px-4 w-full py-2 rounded-md',
                  status === 'completed' && 'bg-indigo-600 text-white',
                  status !== 'completed' &&
                    'bg-indigo-100 text-indigo-600 border border-indigo-600'
                )}
              >
                Completed
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto ">
              <div className="sticky top-0 bg-white w-full p-2">
                <h1>
                  Todo List (
                  {
                    todo.todos.filter((todo) =>
                      status != 'all' ? todo.status == status : true
                    ).length
                  }
                  )
                </h1>
              </div>
              {todo.todos.map((todo) => {
                return (
                  <div
                    key={todo.id}
                    className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md mt-2"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        defaultChecked={todo.status == 'completed'}
                        onClick={(e) => handleCompleteTodo(e, todo.id)}
                      />
                      <span>{todo.text}</span>
                    </div>
                    <button className="px-2 py-1 bg-red-600 text-white rounded-md">
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
