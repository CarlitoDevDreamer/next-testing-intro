'use client'
import React from 'react'
import TodoItem from '@/components/Todo/TodoItem'


type TodoInputProps = {
    onAdd: (title: string) => void
}

export default function TodoInput({ onAdd }: TodoInputProps) {
    const [title, setTitle] = React.useState('')

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim()) {
            onAdd(title.trim())
            setTitle('')
        }
    }

    return (
        <form onSubmit={handleAdd}>
            <input
                type="text"
                placeholder="Add new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    )
}