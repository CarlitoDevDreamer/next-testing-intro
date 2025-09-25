import TodoInput from '@/components/Todo/TodoInput'
import TodoItem from '@/components/Todo/TodoItem'

export default function Home() {
  return (
    <>
      <TodoInput />
      <TodoItem id="1" title="Buy milk" completed={false} />
    </>
  )
}
