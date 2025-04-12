import { SERVER_URL } from '../constants'
import { HTTP_METHOD } from '../constants'

const fetchServer = (method, { id, ...payload } = {}) => {
	let url = SERVER_URL
	let options = {
		method,
		headers: { 'Content-Type': 'application/json' },
	}

	if (method === HTTP_METHOD.GET) {
		const { searchPhrase, isAlphabetSorting } = payload
		const sortingParams = isAlphabetSorting
			? '_sort=id&_order=desc'
			: '_sort=id&_order=asc'
		url += `?${sortingParams}${
			searchPhrase ? `&task_like=${encodeURIComponent(searchPhrase)}` : ''
		}`
	} else {
		if (method !== HTTP_METHOD.POST) {
			url += `/${id}`
		}

		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload)
		}
	}
	return fetch(url, options).then(jsonData => jsonData.json())
}

export const createTodo = newTodo => fetchServer('POST', newTodo)

export const readTodos = (searchPhrase = '', isAlphabetSorting = false) =>
	fetchServer('GET', { searchPhrase, isAlphabetSorting })

export const updateTodo = (todoData, id) =>
	fetchServer('PATCH', { id, ...todoData })

export const removeTodo = todoId => fetchServer('DELETE', { id: todoId })
