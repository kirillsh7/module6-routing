import { useEffect, useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import TodoSearch from './TodoSearch'
import { readTodos, createTodo } from '../../api'
import { GoArrowDown } from 'react-icons/go'

const TodoWrapper = () => {
	const [todos, setTodos] = useState([])
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false)
	const [searchPhrase, setSearchPhrase] = useState('')
	const getTodos = async (phrase = '') => {
		const data = await readTodos(phrase, isAlphabetSorting)
		setTodos(data)
	}
	useEffect(() => {
		getTodos(searchPhrase)
	}, [isAlphabetSorting, searchPhrase])
	const addTodo = async todo => {
		await createTodo({ task: todo, completed: false, isEditing: false })
		await getTodos()
	}

	const toggleComplete = todoIndex => {
		setTodos(
			todos.map(todo => {
				return todoIndex === todo.id
					? { ...todo, completed: !todo.completed }
					: todo
			})
		)
	}
	const searchTodo = value => {
		setSearchPhrase(value.toLowerCase().trim())
	}
	const onSortedClick = () => {
		setIsAlphabetSorting(prev => !prev)
	}
	return (
		<>
			<TodoSearch searchTodo={searchTodo} />

			<div className='TodoWrapper'>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '1rem',
						justifyContent: 'space-around',
					}}
				>
					<TodoForm addTodo={addTodo} />
					<GoArrowDown
						onClick={onSortedClick}
						size={20}
						style={{
							transform: !isAlphabetSorting ? 'rotate(0deg)' : 'rotate(180deg)',
						}}
					/>
				</div>

				{todos.map(todo => (
					<Todo
						toggleComplete={toggleComplete}
						todo={todo}
						key={todo.id}
					/>
				))}
			</div>
		</>
	)
}
export default TodoWrapper
