import { useState } from 'react';
import './App.scss';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'delectus aut autem',
      userId: 1,
      completed: false,
    },
    {
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      userId: 4,
      completed: false,
    },
  ]);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState({ title: false, user: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(prev => ({ ...prev, title: true }));

      return;
    }

    if (userId === 0) {
      setError(prev => ({ ...prev, user: true }));

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      title,
      userId,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setError({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setError(prev => ({ ...prev, title: false }));
            }}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setError(prev => ({ ...prev, user: false }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
