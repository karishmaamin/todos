let todoArray = [];
let countActive;

function addTodoItems(text) {
    const todo = {
        text,
        checked: false,
        id: Math.random()
    };
    todoArray.push(todo);
    displayTodoList(todoArray);
}
function updateCount()
{
    let activeItems= todoArray.filter(item => item.checked === false);
    countActive=activeItems.length;
    document.getElementsByClassName("left-item-count")[0].innerHTML=`${countActive} Items left`;
}
function toggleDone(key) {
    const index = todoArray.findIndex(item => item.id === Number(key));
    todoArray[index].checked = !todoArray[index].checked;
    const item = document.querySelector(`[data-key='${key}']`);
    if (todoArray[index].checked) {
        item.classList.add('done');
       
    } else {
        item.classList.remove('done');
    }
    updateCount();
}

function deleteTodo(key) {
    todoArray = todoArray.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
    updateCount();   
}

function editTodo(key) {
    const editableInput = document.querySelector(`[data-edit='${key}']`);

    const index = todoArray.findIndex(item => item.id === Number(key));
    if (todoArray[index].checked) {
        editableInput.disabled = true;
    } else {
        editableInput.disabled = false;
    }
}

function updateTodo(key) {
    const index = todoArray.findIndex(item => item.id === Number(key));
    const editableInput = document.querySelector(`[data-edit='${key}']`);
    const text = editableInput.value.trim();
    if (text !== '') {
        todoArray[index].text = text;
        editableInput.disabled = true;
    }
}

function allTodo() {
    displayTodoList(todoArray);
}
function activeTodo() {
    let activeArray= todoArray.filter(item => item.checked === false);
    displayTodoList(activeArray);

}
function completedTodo() {
    let completedArray= todoArray.filter(item => item.checked === true);
    displayTodoList(completedArray);
     
}

const form = document.getElementById('todoForm');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('todoInput');

    const text = input.value.trim();
    if (text !== '') {
        addTodoItems(text);
        input.value = '';
    }
});

const listDBclick = document.getElementsByClassName('js-todo-list');
listDBclick[0].addEventListener('dblclick', event => {

    if (event.target.classList.contains('todo-title')) {
        const itemKey = event.target.dataset.edit;
        editTodo(itemKey);
    }

});

function displayTodoList(array)
{
    let activeItems= todoArray.filter(item => item.checked === false);
    countActive=activeItems.length;
    const list = document.getElementsByClassName('js-todo-list');
    list[0].innerHTML = "";
    for (let i = 0; i < array.length; i++)
     {
         let checkStatus;
        if (array[i].checked) {
            checkStatus="checked";
        } else {
            checkStatus="";
        }
        list[0].innerHTML += `
            <li class="todo-item" data-key="${array[i].id}">
            <input id="${array[i].id}" type="checkbox" ${checkStatus} class="todo-check" onchange="toggleDone(${array[i].id});"/>
            <label for="${array[i].id}" class="tick js-tick"></label>
            <span class="todo-span"><input class="todo-title" value="${array[i].text}" data-edit="${array[i].id}" disabled onchange="updateTodo(${array[i].id});"></span>
            <button class="delete-todo js-delete-todo" onclick="deleteTodo(${array[i].id});">
            X
            </button>
            </li>
        `;
        const item = document.querySelector(`[data-key='${array[i].id}']`);

        if (array[i].checked) {
            item.classList.add('done');
        } else {
            item.classList.remove('done');
        }
        
    }
    list[0].innerHTML += `<li class="filters">
    <p class="left-item-count">${countActive} Items left</p>
    <button class="all-todo" onclick="allTodo();">
    All
    </button>
    <button class="active-todo" onclick="activeTodo();">
    Active
    </button>
    <button class="completed-todo" onclick="completedTodo();">
    Completed
    </button>
    </li>`;
}
