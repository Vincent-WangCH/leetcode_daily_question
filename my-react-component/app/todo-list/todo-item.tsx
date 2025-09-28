"use client"

import React from 'react';

interface TodoItemProps {
  text: string;
  isCompleted?: boolean;
  onToggle?: () => void;
  onDelete: () => void;
}

export default function TodoItem({
  text,
  isCompleted = false,
  onToggle,
  onDelete
}: TodoItemProps) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      {/* Checkbox */}
      <td className="px-4 py-3 w-12">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggle}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </td>

      {/* Todo Text */}
      <td className="px-4 py-3">
        <span className={`text-sm font-medium ${
          isCompleted
            ? 'text-gray-500 dark:text-gray-400 line-through'
            : 'text-gray-900 dark:text-white'
        }`}>
          {text}
        </span>
      </td>

      {/* Delete Button */}
      <td className="px-4 py-3 w-20">
        <div className="flex items-center justify-center">
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Delete todo"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}