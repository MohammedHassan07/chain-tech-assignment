console.log('home')

var todos = [];
const token = localStorage.getItem('token')
const errorPara = document.getElementById('error')

// TODO: DOMContentLoaded
// load the added, completed task taks after DOM rendered
// document.addEventListener('DOMContentLoaded', async () => {


//     const taskToBeCompletedURL = 'http://127.0.0.1:3000/complete-task'

//     const response = await makeGetRequest(taskToBeCompletedURL)

//     if (response.flag) {

//         renderTodos()
//     }
// })

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

// add todo
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

        const addURL = 'http://127.0.0.1:3000/task/add-task'
        const response = await makeRequest(addURL, data, 'POST')

        if (response.flag) {

            // render todo
            renderTodos();

            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        } else {

            errorPara.innerHTML = response.message
            errorPara.style.visibility = 'visible'
        }
    }
})

// radio buttom
const btnPendingTask = document.getElementById('btn-pending-task')
const btnCompletedTask = document.getElementById('btn-completed-task')

btnPendingTask.addEventListener('change', handleChangeRadioState)
btnCompletedTask.addEventListener('change', handleChangeRadioState)


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
        <div>
        
        <p>Due Date</p>
        <p>${todo.dateAndTime}</p></div>
            <div style="text-align: right;">
            <input type="checkbox" class="delete-btn" data-index="${index}" data-index="${todo.taskId}">    
            </div>
        </div>
    `
        todoContainer.appendChild(todoElement);
    });
}

// make request
async function makeRequest(URL, data, method) {
    try {

        console.log(data)
        const response = await fetch(URL, {

            method,
            headers: {

                "Content-Type": "Application/json",
                token
            },
            body: JSON.stringify(data)

        })

        const res = await response.json()

        return res
    } catch (error) {
        console.log('makeRequest -> ', error)

        return
    }
}

// make Get request
async function makeGetRequest(URL) {
    try {

        const response = await fetch(URL, {

            method: 'GET',
            headers: {

                "Content-Type": "Application/json",
                token
            }
        })
        const res = await response.json()
        console.log(res)
        return res

    } catch (error) {
        console.log('makeGetRequest -> ', error)
        return
    }
}

async function handleChangeRadioState(event) {

    const state = event.target.value

    console.log(state)
    let taskToBeCompletedURL;
    if (state == 'pending') {

        taskToBeCompletedURL = 'http://127.0.0.1:3000/complete-task'
    } else {

        taskToBeCompletedURL = 'http://127.0.0.1:3000/get-completed-task'
    }
    const response = await makeGetRequest(taskToBeCompletedURL)
    todos = response
    console.log(response)
    renderTodos()
    return
}