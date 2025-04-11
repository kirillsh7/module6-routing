import { IoIosSearch } from 'react-icons/io'
import { useState } from 'react'
const TodoSearch = ({ searchTodo }) => {
	const [value, setValue] = useState('')

	const onSubmit = e => {
		e.preventDefault()
		searchTodo(value)
	}
	const changeValue = e => {
		const inputValue = e.target.value
		setValue(inputValue)
		searchTodo(inputValue)
	}
	return (
		<form
			className='TodoSearch'
			onSubmit={onSubmit}
		>
			<input
				className='input-search'
				type='text'
				placeholder='search task'
				value={value}
				onChange={e => changeValue(e)}
			/>
			<button
				type='submit'
				className='search-btn'
				disabled={!value.length}
			>
				<IoIosSearch size={20} />
			</button>
		</form>
	)
}
export default TodoSearch
