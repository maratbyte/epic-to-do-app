// => Reducer function <=
function listReducer(tasks = [], action) {
    switch (action.type) {
        case "addTask":
            let id = tasks.reduce((maxId, {id}) => id > maxId ? id : maxId, 0) + 1;
            tasks.push({
                id: tasks.length ? id : 0,
                value: action.task
            });
            console.log(tasks);
            return tasks;
        case "deleteTask":
            tasks = tasks.filter(task => task.id !== action.id);
            console.log(tasks);
            return tasks;
            // return tasks.filter(task => task.id !== action.id);
        default:
            return tasks;
    }
}


// => Rendering function <=

// The app works fine if I use this rendering function
// and set "onsubmit='return false'" attribute on adding task form.
// On the other hand, if I do not set this attribute, it doesn't work.
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

// Doesn't work. Why?
function listRender2() {
    const tasks = store.getState();
    for (let task of tasks) {
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
const append = document.getElementById("append-button");
const input = document.getElementById("append-input");


// setting functionality to the add-task form
append.addEventListener("click", () => {
    const task = input.value;
    input.value = "";
    store.dispatch({task, type: "addTask"});
});


// Rendering the initial state
listRender1();


// Using subscribe() method to update the UI in response to state changes
store.subscribe(listRender1);
