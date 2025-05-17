const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  alert('New TODO button clicked!')
}
let todos = []

function loadTodos() {
  const saved = localStorage.getItem('todos')
  todos = saved ? JSON.parse(saved) : []
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function newTodo() {
  const text = prompt("Введи нову справу:")
  if (!text) return

  const todo = {
    id: Date.now(),
    text,
    done: false
  }

  todos.push(todo)
  saveTodos()
  render()
  updateCounter()
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.done ? "checked" : ""} onchange="checkTodo(${todo.id})"/>
      <label for="${todo.id}">
        <span class="${todo.done ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `
}

function render() {
  list.innerHTML = todos.map(renderTodo).join("")
}

function updateCounter() {
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(t => !t.done).length
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  saveTodos()
  render()
  updateCounter()
}

function checkTodo(id) {
  const todo = todos.find(t => t.id === id)
  if (todo) todo.done = !todo.done
  saveTodos()
  render()
  updateCounter()
}

window.onload = function () {
  loadTodos()
  render()
  updateCounter()
}
