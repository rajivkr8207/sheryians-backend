import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function ItemCard({ title, description, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition">

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-sm rounded-md border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-sm rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}



const App = () => {
  const [notes, setNotes] = useState(null)
  const [noteid, setNoteid] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  async function fetchnotes() {
    try {
      const res = await axios.get('https://sheryians-backend-z7p9.onrender.com/api/notes')
      setNotes(res.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchnotes()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    if (noteid) {
      handleEdit()
      return
    }
    try {
      await axios.post('https://sheryians-backend-z7p9.onrender.com/api/notes', {
        title: title,
        description: description
      })
      fetchnotes()
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://sheryians-backend-z7p9.onrender.com/api/notes/${id}`)
      fetchnotes()
    } catch (error) {
      console.error(error);
    }

  }
  function onEdit(id, title, description) {
    console.log('sdfa');
    setNoteid(id)
    setTitle(title)
    setDescription(description)
  }
  async function handleEdit() {
    try {
      await axios.put(`https://sheryians-backend-z7p9.onrender.com/api/notes/${noteid}`, {
        title, description
      })
      fetchnotes()
      setNoteid(null)
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300 p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-5 text-center">
            Create Note
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-600 to-purple-600 hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {notes?.map((item) => (
            <ItemCard
              key={item._id}
              title={item.title}
              description={item.description}
              onDelete={() => handleDelete(item._id)}
              onEdit={() => onEdit(item._id, item.title, item.description)}
            />
          ))}
        </div>

      </div>
    </div>

  )
}

export default App