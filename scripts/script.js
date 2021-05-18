// binding elements
const list = document.querySelector("ul");
const append = document.getElementById("append-button");
const input = document.getElementById("append-input");

// Adding tasks
function addTask() {
    // Storing the current value of the input field
    const value = input.value;
    input.value = "";

    
    // => construct an item element <=
    const item = document.createElement("li");
    item.setAttribute("class", "to-do-item");

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    item.appendChild(checkbox);

    // label
    const label = document.createElement("label");
    label.textContent = value;
    item.appendChild(label);

    // delete button
    const del = document.createElement("button");
    del.setAttribute("class", "delete-button");
    del.innerHTML = "<img src=\"images/remove.png\">";
    item.appendChild(del);

    del.addEventListener("click", () => {
        list.removeChild(item);
    });

    // append item to the list
    list.appendChild(item);
}

append.addEventListener("click", addTask);