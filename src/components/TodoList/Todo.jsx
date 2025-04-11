import React, { useEffect, useState, useRef } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { MdModeEditOutline } from 'react-icons/md'

const Todo = ({ todo, toggleComplete }) => {
	const [displayedTask, setDisplayedTask] = useState('')
	const [isEditMode, setIsEditMode] = useState(false)
	const [showActiveMenu, setShowActiveMenu] = useState(false)
	const maxTextLengthRef = useRef(26)

	const reduceText = () => {
		if (todo.task.length > maxTextLengthRef.current) {
			const task = todo.task.split(' ')
			let countTextLength = 0
			let newTask = task.reduce((acc, text) => {
				if (countTextLength < maxTextLengthRef.current) {
					acc.push(text)
					countTextLength += text.length
				}
				return acc
			}, [])
			setShowActiveMenu(true)
			setIsEditMode(true)
			setDisplayedTask(() => newTask.join(' ').trim() + '...')
		} else {
			setShowActiveMenu(false)
			setDisplayedTask(todo.task)
		}
	}
	useEffect(() => {
		reduceText()
	}, [])

	const changeTask = e => {
		e.preventDefault()
		if (isEditMode) {
			setDisplayedTask(todo.task)
			setIsEditMode(false)
		} else {
			reduceText()
		}
	}

	return (
		<div className='Todo'>
			<div
				style={{
					display: 'flex',
					gap: '5px',
					flexDirection: !isEditMode ? 'column' : '',
				}}
			>
				<p
					onClick={toggleComplete.bind(null, todo.id)}
					className={todo.completed ? 'completed' : ''}
					style={{
						whiteSpace: isEditMode ? 'nowrap' : '',
					}}
				>
					{displayedTask}
				</p>
				{showActiveMenu ? (
					<a
						href='#'
						onClick={e => changeTask(e)}
						style={{
							textDecoration: 'none',
						}}
					>
						{isEditMode ? 'еще' : 'свернуть'}
					</a>
				) : null}
			</div>
		</div>
	)
}
export default Todo
