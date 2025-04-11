import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { readTodos } from '../../api'
const TodoWrapperEdit = () => {
	const navigate = useNavigate()
	const [data, setData] = useState([])
	useEffect(() => {
		readTodos().then(data => setData(data))
	}, [])

	return (
		<div className='TodoWrapper'>
			<button
				style={{
					padding: '5px 10px',
					backgroundColor: 'white',
					color: 'black',
					border: '1px solid black',
					borderRadius: '5px',
					marginBottom: '10px',
				}}
				onClick={() => navigate('/')}
			>
				Назад
			</button>
			<h1 style={{ marginBottom: '10px', fontSize: '16px' }}>
				Выберете задачу для редактирования или удаления
			</h1>
			{data.map((todo, index) => (
				<Link
					className='Todo'
					to={`/edit/todo/${todo.id}`}
					key={index}
				>
					{todo.task}
				</Link>
			))}
		</div>
	)
}
export default TodoWrapperEdit
