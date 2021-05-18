// => Reducer function <=
function listReducer(tasks = [], action) {
    switch (action.type) {
        case "addTask":
            let id = tasks.reduce((maxId, {id}) => id > maxId ? id : maxId, 0) + 1;
            tasks.push({
                id: tasks.length ? id : 0,
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

// Version 1
function listRender1() {
    const tasks = store.getState();
    const html = tasks.map(task => 
        `<li id="${task.id}" class="to-do-item">
            <input type="checkbox">
            <label>${task.value}</label>
            <button class="delete-button">
                <img src="images/remove.png">
            </button>
        </li>`).join("");
    list.innerHTML = html;
    list.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            store.dispatch({id: parseInt(button.parentElement.getAttribute("id"), 10), type: "deleteTask"});
        });
    });
}

// Version 2
function listRender2() {
    const tasks = store.getState();
    const items = list.querySelectorAll("li");
    
    // if the state changed
    if (tasks.length != items.length) {

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
        console.log(task);
        const item = document.createElement("li");
        item.setAttribute("class", "to-do-item");
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
        del.setAttribute("class", "delete-button");
        del.innerHTML = "<img src=\"images/remove.png\">";
        del.addEventListener("click", () => {
            store.dispatch({id: task.id, type: "deleteTask"});
        }); 
        item.appendChild(del);

        list.appendChild(item);
    }
}


// creating a Redux store holding the current state
const store = Redux.createStore(listReducer);


// binding elements
const list = document.querySelector("ul");
const form = document.getElementById("to-do-append");
const input = document.getElementById("append-input");


// setting functionality to the add-task form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = input.value;
    input.value = "";
    store.dispatch({task, type: "addTask"});
});


// Rendering the initial state
listRender1();


// Using subscribe() method to update the UI in response to state changes
store.subscribe(listRender1);
