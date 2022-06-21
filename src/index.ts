import utils from './utils'

const onTodoClick = (todo: HTMLLIElement) => {
  todo.classList.toggle('todo-checked')
}

const createTodoElement = (textContent: string) => {
  const newTodoEl = document.createElement('li')
  newTodoEl.textContent = textContent
  newTodoEl.classList.add('todo')
  newTodoEl.addEventListener('click', () => onTodoClick(newTodoEl))
  return newTodoEl
}

type TodosFormSubmit = (
  e: Event,
  todosForm: HTMLFormElement,
  todoList: HTMLUListElement | null,
  errorLabel: HTMLParagraphElement
) => void

const onTodosFormSubmit: TodosFormSubmit = (
  e,
  todosForm,
  todoList,
  errorLabel
) => {
  e.preventDefault()
  const data = utils.getFormData(todosForm)
  if (!(data.todoTitle as string)?.trim()) {
    errorLabel.textContent = 'Error: Cannot add empty todo.'
    return
  }
  const newTodoEl = createTodoElement(data.todoTitle as string)
  todoList?.appendChild(newTodoEl)
}

const main = () => {
  const todosForm = document.querySelector<HTMLFormElement>('#todos-form')
  const errorLabel =
    document.querySelector<HTMLParagraphElement>('#error-label')
  if (!errorLabel)
    throw new Error('Expecting a paragraph with a "error-label" id')
  const todoTitleInput =
    document.querySelector<HTMLInputElement>('#todo-title-input')
  const todoList = document.querySelector<HTMLUListElement>('#todo-list')
  todosForm?.addEventListener('submit', (e) =>
    onTodosFormSubmit(e, todosForm, todoList, errorLabel)
  )
  document.querySelectorAll<HTMLLIElement>('.todo').forEach((todo) => {
    todo.addEventListener('click', () => onTodoClick(todo))
  })
  const deleteBtn = document.querySelector<HTMLButtonElement>('#delete-btn')
  deleteBtn?.addEventListener('click', () => {
    document
      .querySelectorAll('.todo-checked')
      .forEach((checkedTodo) => checkedTodo.remove())
  })
  todoTitleInput?.addEventListener('input', () => (errorLabel.textContent = ''))
}

document.addEventListener('DOMContentLoaded', main)
