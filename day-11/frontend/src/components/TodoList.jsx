import React from 'react';
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes, FaAlignLeft, FaHeading } from 'react-icons/fa';

const TodoList = ({
  todos,
  onToggleComplete,
  onDelete,
  onStartEdit,
}) => {
  return (
    <div className="space-y-4">
      {todos.map((todo, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-r ${todo.completed
              ? 'from-gray-800/40 to-gray-900/40'
              : 'from-gray-800/60 to-gray-900/60'
            } backdrop-blur-sm rounded-xl p-5 border ${todo.completed ? 'border-gray-700' : 'border-gray-600'
            } shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
        >
            <div className="flex items-start gap-4">
              <button
                onClick={() => onToggleComplete(todo._id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${todo.completed
                    ? 'bg-green-500/20 border-green-500'
                    : 'border-gray-500 hover:border-gray-400'
                  } transition-colors`}
              >
                {todo.completed && <FaCheck className="text-green-400 text-xs" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold mb-1 ${todo.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-200'
                        }`}
                    >
                      {todo.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>
                        {new Date(todo.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      {todo.description && (
                        <span className="flex items-center gap-1">
                          <FaAlignLeft /> Has description
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartEdit(todo)}
                      className="text-gray-400 hover:text-gray-300 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                      title="Edit task"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(todo._id)}
                      className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                      title="Delete task"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {todo.description && (
                  <div className="mt-4 pt-4 border-t border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                      <FaAlignLeft /> Description
                    </div>
                    <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                      {todo.description}
                    </p>
                  </div>
                )}
                
                {!todo.description && (
                  <div className="mt-4 pt-4 border-t border-gray-800/50">
                    <p className="text-gray-500 text-sm italic">
                      No description added. Click edit to add one.
                    </p>
                  </div>
                )}
              </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;