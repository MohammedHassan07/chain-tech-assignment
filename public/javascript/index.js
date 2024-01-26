console.log('home')

// TODO: DOMContentLoaded
// load the added, completed task taks after DOM rendered

let todos = [];
renderTodos()

// delete todo
document.getElementById('todos').addEventListener('click', (event) => {

    if (event.target.classList.contains('delete-btn')) {

        const index = event.target.getAttribute('data-index')

        todos.splice(index, 1)

        window.localStorage.setItem('todos', JSON.stringify(todos))

        renderTodos()
    }
})

const addTodo = document.getElementById('btn-add')
addTodo.addEventListener('click', (event) => {
    event.preventDefault()

    event.prevent
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {

        // date and time
        const dateTime = new Date()
        const dateAndTime = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} - ${dateTime.getHours()}:${dateTime.getMinutes()}`

        const data = { title, content, dateAndTime }

        todos.unshift(data);
        console.log('add', todos)
        window.localStorage.setItem('todos', JSON.stringify(todos))

        // render todo
        renderTodos();

        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    }

})

function renderTodos() {

    const todoContainer = document.getElementById('todos');
    todoContainer.innerHTML = ''


    const storedTodo = window.localStorage.getItem('todos')
    if (storedTodo.length == 0) {

        todoContainer.innerHTML = `<div><h2>Add Some Todo</h2></div>`
    } else {

        todos = JSON.parse(storedTodo)
        console.log('render', todos)

        todos.forEach((todo, index) => {


            const todoElement = document.createElement('div')
            todoElement.classList.add('todo')
            todoElement.classList.add('mt-15')

            todoElement.innerHTML =

                `
        <div>
            <h4>${todo.title}</h4>
        </div>
        
        <div class="mt-9">
            <p>${todo.content}</p>
        </div>
        
        <div class="flex mt-12 btn-container">
        <div><p>${todo.dateAndTime}</p></div>
            <div style="text-align: right;">
                 <button class="delete-btn" data-index="${index}" style="background-color: red;">Delete</button>
            </div>
        </div>
    `

            todoContainer.appendChild(todoElement);
        });
    }
}


