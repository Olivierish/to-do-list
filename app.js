function toggleClassName() {
  const sidebarElt = document.querySelector(".sidebar");
  const openElt = document.getElementById("open");
  const closeElt = document.getElementById("close");

  sidebarElt.classList.toggle("active");

  if (sidebarElt.classList.contains("active")) {
    openElt.style.display = "none";
    closeElt.style.display = "block";
  } else {
    openElt.style.display = "block";
    closeElt.style.display = "none";
  }
}

/**
 * To-do list App
 */

const formElt = document.querySelector("form");
const inputElt = document.querySelector("input");
const listElt = document.querySelector("ul.todo-list");

let todosList = [];

formElt.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = inputElt.value.trim();
  if (text !== "") {
    addTodo(text);
    inputElt.value = "";
  }
});

function addTodo(text) {
  const todo = {
    text,
    id: Date.now(), // use timestamp as Id
  };
  displayTodos(todo);
}

function displayTodos(todo) {
  const itemElt = document.createElement("li");
  itemElt.setAttribute("data-key", todo.id);

  const checkboxElt = document.createElement("input");
  checkboxElt.setAttribute("type", "checkbox");
  checkboxElt.addEventListener("change", taskDone);
  itemElt.appendChild(checkboxElt);

  const txtElt = document.createElement("span");
  txtElt.innerText = todo.text;
  txtElt.setAttribute("class", "todo-text");
  itemElt.appendChild(txtElt);

  const btnElt = document.createElement("span");
  btnElt.setAttribute("class", "delete-todo");
  btnElt.addEventListener("click", deleteTask);
  itemElt.appendChild(btnElt);

  listElt.appendChild(itemElt);

  todosList.push(itemElt);
}

function taskDone(e) {
  const doneItemElt = e.target.parentNode;
  doneItemElt.classList.toggle("end-of-task");
  listElt.removeChild(doneItemElt);
  listElt.appendChild(doneItemElt);
}

function deleteTask(e) {
  const doneItemElt = e.target.parentNode;

  todosList.forEach((el) => {
    if (doneItemElt.getAttribute("data-key") === el.getAttribute("data-key")) {
      //listElt.removeChild(doneItemElt);
      el.remove();
      console.log(todosList);
      todosList = todosList.filter((li) => li.dataset.key !== el.dataset.key);
      console.log(todosList);
    }
  });
}
