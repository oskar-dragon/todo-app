const inputField = document.getElementById("add-task-field");
const addBtn = document.querySelector(".btn--add");
const todoList = document.querySelector(".todo-list");
const deleteBtn = document.querySelector(".trash-icon");
const clearBtn = document.querySelector(".btn--clear");

// Activates and disactivates "add button" when field is empty or has text.
inputField.addEventListener("keyup", () => {
  if (inputField.value.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
});

// Adds tasks to the list of tasks
addBtn.addEventListener("click", () => {
  let userEnteredValue = inputField.value;
  let getLocalStorageData = localStorage.getItem("New Task");

  if (getLocalStorageData == null) {
    // if local storage has no data
    tasksArray = [];
  } else {
    tasksArray = JSON.parse(getLocalStorageData); // transforming JSON string into a JS object
  }

  tasksArray.push(userEnteredValue);
  localStorage.setItem("New Task", JSON.stringify(tasksArray)); //transforming JS object into a JSON string
  showTasks();
  addBtn.classList.remove("active");
});

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Task");

  if (getLocalStorageData == null) {
    tasksArray = [];
  } else {
    tasksArray = JSON.parse(getLocalStorageData); // transforming JS object into
  }

  if (tasksArray.length === 1) {
    document.getElementById("pending-tasks").innerHTML = `${tasksArray.length} pending task`;
  } else {
    document.getElementById("pending-tasks").innerHTML = `${tasksArray.length} pending tasks`;
  }

  if (tasksArray.length > 0) {
    clearBtn.classList.add("active");
  } else {
    clearBtn.classList.remove("active");
  }

  let newLiElement = "";
  tasksArray.forEach((task, index) => {
    newLiElement += `<li class="task">${task}<span class="trash-icon hide" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>`;
  });
  todoList.innerHTML = newLiElement;
  inputField.value = "";
}

showTasks();

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Task");
  tasksArray = JSON.parse(getLocalStorageData);
  tasksArray.splice(index, 1);
  console.log(tasksArray);
  localStorage.setItem("New Task", JSON.stringify(tasksArray));
  showTasks();
}

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  showTasks();
});
