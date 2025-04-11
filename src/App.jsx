import './styles.css'
import TodoWrapper from './components/TodoList/TodoWrapper'
import TodoWrapperEdit from './components/TodoList/TodoWrapperEdit'
import TodoEdit from './components/TodoList/TodoEdit'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

function App() {
	const navigate = useNavigate()
	return (
		<>
			<ul
				style={{
					display: 'flex',
					width: '100%',
					gap: '20px',
					marginBottom: '20px',
				}}
			>
				<li>
					<Link to='/'>Список задач</Link>
				</li>
				<li>
					<Link to='/edit'>Редактиврование</Link>
				</li>
			</ul>
			<Routes>
				<Route
					path='/'
					element={<TodoWrapper />}
				/>

				<Route
					path='/edit'
					element={<TodoWrapperEdit />}
				/>
				<Route
					path='/edit/todo/:id'
					element={<TodoEdit />}
				/>
				<Route
					path='*'
					element={<div>404</div>}
				/>
			</Routes>
		</>
	)
}
export default App
