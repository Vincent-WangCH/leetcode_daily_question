"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getFromLocalStorage, setToLocalStorage, hasInLocalStorage } from './utils/todo-utils';
import TodoItem from './todo-item';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Client Component for Todo List Page
export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState("");
  const [inputVal, setInputVal] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    if (hasInLocalStorage("todo_list")) {
      try {
        const savedTodos = getFromLocalStorage<Todo[]>("todo_list");
        if (Array.isArray(savedTodos)) {
          // Convert date strings back to Date objects
          const todosWithDates = savedTodos.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
          }));
          setTodos(todosWithDates);
        } else {
          setErrors("Invalid todo data format in localStorage.");
        }
      } catch (error) {
        setErrors("Error loading todos from localStorage.");
        console.error("Error loading todos:", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      setToLocalStorage("todo_list", todos);
    }
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputVal.trim()) {
      setErrors("Please enter a valid todo item.");
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
      text: inputVal.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos(prev => [...prev, newTodo]);
    setInputVal("");
    setErrors(""); // Clear any previous errors
  };

  const handleToggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));

    // If no todos left, clear localStorage
    if (todos.length === 1) {
      localStorage.removeItem("todo_list");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Todo List
          </h1>
        </div>

        {/* Error State */}
        {errors && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-200 font-medium">Error loading todos</p>
            </div>
            <p className="text-red-600 dark:text-red-300 mt-1 text-sm">{errors}</p>
          </div>
        )}

        {/* Add Todo Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleAddTodo} className="flex gap-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Todo
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Todos ({todos.length})
            </h2>

            {/* Stats */}
            {todos.length > 0 && (
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Pending: {todos.filter(todo => !todo.completed).length}</span>
                <span>Completed: {todos.filter(todo => todo.completed).length}</span>
              </div>
            )}
          </div>

          {todos.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No todos found</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Start by adding your first todo above!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                      Done
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Todo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      text={todo.text}
                      isCompleted={todo.completed}
                      onToggle={() => handleToggleTodo(todo.id)}
                      onDelete={() => handleDeleteTodo(todo.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
