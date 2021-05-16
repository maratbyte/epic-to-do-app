// binding elements
const list = document.querySelector("ul");
const append = document.getElementById("append-button");
const input = document.getElementById("append-input");

// Adding tasks
append.onclick = function() {
    // Storing the current value of the input field
    let value = input.value;
    input.value = "";

    
    // => construct an item element <=
    let item = document.createElement("li");
    item.setAttribute("class", "to-do-item");

    // checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    item.appendChild(checkbox);

    // label
    let label = document.createElement("label");
    label.textContent = value;
    item.appendChild(label);

    // delete button
    let del = document.createElement("button");
    del.setAttribute("class", "delete-button");
    del.innerHTML = "<img src=\"images/remove.png\">";
    item.appendChild(del);

    del.onclick = function() {
        list.removeChild(item);
    }


    // append item to the list
    list.appendChild(item);
}