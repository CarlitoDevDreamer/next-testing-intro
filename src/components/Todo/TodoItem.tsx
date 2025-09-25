'use client'
import React from 'react'

type TodoItemProps = {
  id: string
  title: string
  completed?: boolean
  onToggle?: (id: string) => void
}

export default function TodoItem({ id, title, completed = false, onToggle }: TodoItemProps) {
  return (
    <label style={{display: 'flex', gap: 8, alignItems: 'center'}}>
      <input
        data-testid="todo-checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => onToggle?.(id)}
      />
      <span data-testid="todo-title">{title}</span>
    </label>
  )
}