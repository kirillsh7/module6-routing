import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTodo, removeTodo } from '../../api'
import TodoEditor from './TodoEditor'
const TodoEdit = () => {
	const [changeIsEditing, setChangeIsEditing] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const [data, setData] = useState({})
	const getTodo = async () => {
		const response = await fetch('http://localhost:3000/todos/' + id)
		const data = await response.json()
		setData(data)
	}
	useEffect(() => {
		getTodo()
	}, [])
	const editTodo = async (value, id) => {
		await updateTodo({ task: value }, id)
		navigate(-1)
	}
	const deleteTodo = async todoIndex => {
		await removeTodo(todoIndex)
		navigate(-1)
	}
	const onChangeIsEditing = () => {
		setChangeIsEditing(prev => !prev)
	}
	return (
		<div className='TodoWrapper'>
			{changeIsEditing ? (
				<TodoEditor
					editTodo={editTodo}
					onChangeIsEditing={onChangeIsEditing}
					todo={data}
				/>
			) : (
				<>
					<button
						style={{
							padding: '5px 10px',
							backgroundColor: 'white',
							color: 'black',
							border: '1px solid black',
							borderRadius: '5px',
							marginBottom: '10px',
						}}
						onClick={() => navigate('/edit')}
					>
						Назад
					</button>
					<div className='Todo'>{data.task}</div>
					<div
						style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
					>
						<button
							style={{ borderRight: '1px solid white', paddingRight: '10px' }}
							onClick={() => onChangeIsEditing()}
						>
							Изменить
						</button>
						<button onClick={() => deleteTodo(data.id)}>Удалить</button>
					</div>
				</>
			)}
		</div>
	)
}

export default TodoEdit
