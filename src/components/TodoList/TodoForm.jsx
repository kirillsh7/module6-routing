import { useState } from 'react'
import '../../styles.css'
const TodoForm = ({ addTodo }) => {
	const [value, setValue] = useState('')

	const onSubmit = e => {
		e.preventDefault()
		addTodo(value)
		setValue('')
	}
	return (
		<form
			className='TodoForm'
			onSubmit={onSubmit}
		>
			<input
				className='todo-input'
				type='text'
				placeholder='What is the task today?'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button
				type='submit'
				className='todo-btn'
			>
				ADD TASK
			</button>
		</form>
	)
}
export default TodoForm
