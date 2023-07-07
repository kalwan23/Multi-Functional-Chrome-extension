const buttonClick=document.querySelector('.buttonClickTodo');

buttonClick.addEventListener('click', ()=>{
    addTodo()
});

//Models
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos7'));
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [{
        title: 'Get groceries',
        dueDate: '2021-10-04',
        id: 'id1'
    }, {
        title: 'Wash car',
        dueDate: '2021-02-03',
        id: 'id2'
    }, {
        title: 'Make dinner',
        dueDate: '2021-03-04',
        id: 'id3'
    }];
}

//Creates a todo
function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });
    saveTodos();
}

//Delete a todo
function removeTodo(idToDelete) {
    todos = todos.filter(function (todo) {
        return todo.id !== idToDelete;
    });
    saveTodos();
}

function toggleTodo(todoId, checked) {
    todos.forEach(function (todo) {
        if (todo.id === addTodo) {
            todo.isDone = checked;
        }
    });
}

render();


//Controller
function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    createTodo(title, dueDate);
    render();
}

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete);
    render();
}

function checkTodo(event) {
    const checkbox = event.target;

    const todoId = checkbox.dataset.todoId;
    const checked = checkbox.checked;

    toggleTodo(todoId, checked);
    render();
}

function saveTodos() {
    localStorage.setItem('todos7', JSON.stringify(todos));
}



//View
function render() {
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todo) {
        let element = document.createElement('div');
        element.innerText = todo.title + '   (' + todo.dueDate + ')';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onChange = checkTodo;
        checkbox.dataset.todoId = todo.id;
        if (todo.isDone === true) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
        element.prepend(checkbox);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todo.id;
        deleteButton.style = 'margin-left:15px;';
        element.appendChild(deleteButton);

        const todolist = document.getElementById('todo-list');
        todolist.appendChild(element);
    });
}