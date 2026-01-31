import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Card({  title, description }) {
  return (
    <div  className="max-w-sm h-56 rounded-xl border border-gray-200 mx-auto bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

const App = () => {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    async function fetchnotes() {
      try {
        const res = await axios.get('http://localhost:3000/api/notes')
        setNotes(res.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchnotes()
  }, [])



  return (
    <div className="min-h-screen bg-gray-100 flex   flex-wrap gap-6  p-6">
      {notes?.map((item,idx)=>{
      return <Card
      key={idx}
        title={item.title}
        description={item.description}
      />
      })}
    </div>
  )
}

export default App