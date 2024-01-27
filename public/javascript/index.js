console.log('home')

// TODO: DOMContentLoaded
// load the added, completed task taks after DOM rendered

let todos = [];
const token = localStorage.getItem('token')
renderTodos()

// delete todo
document.getElementById('todos').addEventListener('click', (event) => {

    if (event.target.classList.contains('delete-btn')) {

        const checkBox = event.target

        if (checkBox.checked) {


            const index = event.target.getAttribute('data-index')
            console.log('checked', index)

            // todos.splice(index, 1)
            window.localStorage.setItem('todos', JSON.stringify(todos))

            renderTodos()
        }
    }
})

const addTodo = document.getElementById('btn-add')
addTodo.addEventListener('click', async (event) => {
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

        const addURL = ''
        const response = await makeRequest(addURL, data, 'POST')

        if (response.message == 'success') {

            // render todo
            renderTodos();

            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        } else {

            console.log('add todo --> something went wrong')
        }

    }

})

function renderTodos() {

    const todoContainer = document.getElementById('todos');
    todoContainer.innerHTML = ''

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
            <input type="checkbox" class="delete-btn" data-index="${index}" data-index="${todo.taskId}">    
            </div>
        </div>
    `
        todoContainer.appendChild(todoElement);
    });
}


async function makeRequest(URL, data, type) {
    try {


        const response = await fetch(URL, {

            method: `${type}`,
            headers: {

                "Content-Type": "Application/json",
                "token": `${token}`
            }
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log('makeRequest -> ', error)

        return
    }
}
