// => Reducer function <=
function listReducer(tasks = [], action) {
    switch (action.type) {
        case "addTask":
            let id = task.length ? tasks.reduce((maxId, {id}) => id > maxId ? id : maxId, 0) + 1 : 0;
            tasks.push({
                id,
                value: action.task
            });
            return tasks;
        case "deleteTask":
            return tasks.filter(task => task.id !== action.id);
        default:
            return tasks;
    }
}


// => Rendering function <=
function listRender() {
    const tasks = store.getState();
    const items = list.querySelectorAll("li");
    
    // check if there's a deleted task
    const ids = tasks.map(task => task.id);
    for (let item of items) {
        const id = parseInt(item.getAttribute("id"), 10);
        if (!ids.includes(id)) {
            item.remove();
            return;
        }
    }

    // if nothing was deleted, that means we need to add a new task
    const task = tasks[tasks.length - 1];
    const item = document.createElement("li");
    item.setAttribute("id", task.id.toString());
    // checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    item.appendChild(checkbox);
    // label
    const label = document.createElement("label");
    label.textContent = task.value;
    item.appendChild(label);
    // delete button
    const del = document.createElement("button");
    del.innerHTML = "<img src=\"images/remove.png\">";
    del.addEventListener("click", () => {
        store.dispatch({id: task.id, type: "deleteTask"});
    }); 
    item.appendChild(del);

    list.appendChild(item);
}


// creating a Redux store holding the current state
const store = Redux.createStore(listReducer);


// binding elements
const list = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("input");


// setting functionality to the add-task form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = input.value;
    input.value = "";
    store.dispatch({task, type: "addTask"});
});


// Rendering the initial state
listRender();


// Using subscribe() method to update the UI in response to state changes
store.subscribe(listRender);
