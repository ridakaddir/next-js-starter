"use client"

import React from 'react'

import { RootState, useAppDispatch } from '@/store/store'
import { toggleTodoAsync, removeTodoAsync, fetchTodos, addTodoAsync } from 'features/todo/todoSlice'
import { useSelector } from 'react-redux'

export function TodoList() {
  const todos = useSelector((state: RootState) => state.todo)
  const dispatch = useAppDispatch()

  const [newTodo, setNewTodo] = React.useState("")

  React.useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-neutral-900/80 supports-[backdrop-filter]:backdrop-blur">
        <div className="p-6 border-b border-neutral-200/70 dark:border-neutral-800/60">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Todos</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Keep track of what needs doing.</p>
        </div>

        <div className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (newTodo.trim()) {
                dispatch(addTodoAsync({ text: newTodo, completed: false }))
                setNewTodo("")
              }
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200/60 dark:focus:ring-blue-500/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 active:bg-blue-700"
            >
              Add
            </button>
          </form>

          <div className="mt-6">
            {todos.length === 0 ? (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-200/70 dark:border-neutral-800/60 py-10 text-neutral-500 dark:text-neutral-400">
                No todos yet. Add your first one above.
              </div>
            ) : (
              <ul className="divide-y divide-neutral-200/70 dark:divide-neutral-800/60">
                {todos.map((todo) => {
                  const checkboxId = `todo-${todo.id}`
                  return (
                    <li key={todo.id} className="flex items-center gap-3 py-3">
                      <input
                        id={checkboxId}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodoAsync(todo))}
                        className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={checkboxId}
                        className={`flex-1 select-none text-sm text-neutral-900 dark:text-neutral-100 ${todo.completed ? "line-through text-neutral-400 dark:text-neutral-500" : ""
                          }`}
                      >
                        {todo.text}
                      </label>
                      <button
                        onClick={() => dispatch(removeTodoAsync(todo.id))}
                        className="text-sm text-red-600 hover:text-red-500 px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30"
                        aria-label="Remove todo"
                      >
                        Remove
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}