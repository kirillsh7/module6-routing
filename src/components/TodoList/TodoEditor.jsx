import { useState } from 'react'
import '../../styles.css'
const TodoEditor = ({ editTodo, onChangeIsEditing, todo }) => {
	const [value, setValue] = useState(todo.task)

	const onSubmit = (e, id) => {
		e.preventDefault()
		editTodo(value, id)
	}
	return (
		<form
			className='TodoForm'
			onSubmit={e => onSubmit(e, todo.id)}
		>
			<input
				className='todo-input'
				type='text'
				placeholder='Update Task'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button
				type='submit'
				style={{ borderRight: '1px solid #333' }}
				className='todo-btn'
			>
				CHANGE
			</button>
			<button
				onClick={() => onChangeIsEditing(false)}
				type='button'
				className='todo-btn'
			>
				CANCEL
			</button>
		</form>
	)
}
export default TodoEditor
