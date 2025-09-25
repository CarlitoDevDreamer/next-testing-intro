import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'
import fs from 'fs'
import path from 'path'
import TodoInput from './TodoInput'

test('is a client component (contains "use client" directive)', () => {
  const file = fs.readFileSync(path.join(__dirname, 'TodoItem.tsx'), 'utf8')
  const firstNonEmpty = file
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0) || ''
  expect(firstNonEmpty).toMatch(/^["']use client["'];?$/)
})

test('TodoInput is a client component (contains "use client" directive)', () => {
  const file = fs.readFileSync(path.join(__dirname, 'TodoInput.tsx'), 'utf8')
  const firstNonEmpty = file
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0) || ''
  expect(firstNonEmpty).toMatch(/^["']use client["'];?$/)
})

test('renders title and calls onToggle when checkbox clicked', async () => {
  const user = userEvent.setup()
  const handleToggle = jest.fn()
  render(<TodoItem id="1" title="Buy milk" completed={false} onToggle={handleToggle} />)

  const title = screen.getByTestId('todo-title')
  expect(title).toHaveTextContent('Buy milk')

  const checkbox = screen.getByTestId('todo-checkbox') as HTMLInputElement
  expect(checkbox.checked).toBe(false)

  await user.click(checkbox)
  expect(handleToggle).toHaveBeenCalledWith('1')
})

test('clicking TodoItem without onToggle does not throw and remains controlled', async () => {
  const user = userEvent.setup()
  render(<TodoItem id="1" title="No handler" completed={false} />)

  const checkbox = screen.getByTestId('todo-checkbox') as HTMLInputElement
  expect(checkbox.checked).toBe(false)

  await user.click(checkbox) // should not throw even though no onToggle provided
  expect(checkbox.checked).toBe(false) // still controlled by prop
})

test('page does not pass function props to TodoItem (Option A)', () => {
  const pagePath = path.join(process.cwd(), 'src', 'app', 'page.tsx')
  const file = fs.readFileSync(pagePath, 'utf8')

  // ensure TodoItem is used on the page
  expect(file).toMatch(/<TodoItem[\s\S]*?>/)

  // ensure no function prop is passed (no onToggle= in the file)
  expect(file).not.toMatch(/onToggle\s*=/)
})

test('page does not pass function props to TodoInput (Option A)', () => {
  const pagePath = path.join(process.cwd(), 'src', 'app', 'page.tsx')
  const file = fs.readFileSync(pagePath, 'utf8')

  // ensure TodoInput is used on the page
  expect(file).toMatch(/<TodoInput[\s\S]*?>/)

  // ensure no function prop is passed (no onAdd= in the file)
  expect(file).not.toMatch(/onAdd\s*=/)
})

test('renders input and calls onAdd with typed title when Add clicked, then clears input', async () => {
  const user = userEvent.setup()
  const handleAdd = jest.fn()
  render(<TodoInput onAdd={handleAdd} />)

  const input = screen.getByPlaceholderText('Add new task') as HTMLInputElement
  expect(input).toBeInTheDocument()

  await user.type(input, 'Walk the dog')
  expect(input.value).toBe('Walk the dog')

  const addButton = screen.getByRole('button', { name: /add/i })
  await user.click(addButton)

  expect(handleAdd).toHaveBeenCalledWith('Walk the dog')
  expect(input.value).toBe('')
})