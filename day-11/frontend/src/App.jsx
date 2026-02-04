import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck, FaEdit, FaSave, FaTimes, FaAlignLeft } from 'react-icons/fa';
import TodoList from './components/TodoList';
import axios from './axios';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  async function fetchAllTodos() {
    try {
      const res = await axios.get('/todo')
      setTodos(res.data.todo)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllTodos()
  }, []);

  const addTodo = async () => {
    if (editingId) {
      return saveEdit();
    } else {
      try {
        const res = await axios.post('/todo', { title, description })
        toast.success(res.data.message)
        fetchAllTodos()
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error(error);
      }
    }

  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todo/${id}`)
      toast.success('todo delete successfully')
      fetchAllTodos()
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.patch(`/todo/${id}`)
      fetchAllTodos()
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setTitle(todo.title);
    setDescription(todo.description || '');
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(`/todo/${editingId}`, { title, description })
      toast.success(res.data.message)
      fetchAllTodos()
      setTitle('');
      setDescription('');
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };



  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent mb-4">
              Todo Manager
            </h1>
          </header>

          {/* Add Todo Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-300 flex items-center gap-2">
              <FaPlus className="text-gray-400" /> Add New Todo
            </h2>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title *"
                  className="w-full bg-gray-900/70 border border-gray-600 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder-gray-500"
                />
                <div className="absolute right-3 top-3 text-gray-500 text-sm">
                  Required
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description (optional)"
                  className="w-full bg-gray-900/70 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder-gray-500 min-h-[100px] resize-none"
                />

              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={addTodo}
                disabled={!title.trim()}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${title.trim()
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 hover:scale-105 active:scale-95'
                  : 'bg-gray-800 cursor-not-allowed opacity-50 border border-gray-100'
                  }`}
              >
                <FaPlus /> {editingId ? 'Update Task' : 'Add Task'}
              </button>

            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-gray-400 text-sm">Total Tasks</div>
              <div className="text-3xl font-bold text-gray-300">{stats.total}</div>
            </div>
            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-gray-400 text-sm">Completed</div>
              <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            </div>
            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-gray-400 text-sm">Pending</div>
              <div className="text-3xl font-bold text-orange-400">{stats.pending}</div>
            </div>
          </div>

          {/* Todo List */}
          <TodoList
            todos={todos}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            onStartEdit={startEdit}
          />

          {todos.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-gray-500 text-6xl mb-4 opacity-50">📝</div>
              <h3 className="text-2xl text-gray-400 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Start by adding a title and description above</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;