let tasks = [];
console.log(typeof(tasks))

function add(event) {
  event.preventDefault();
  const input = document.getElementById("New_ToDo").value;
  const newTask = input.trim();

  if (newTask === "") {
    alert("Enter To-Do");
    return;
  }

  tasks.push({ task: newTask, taskStatus: false });
  console.log(tasks);

  document.getElementById("New_ToDo").value = null;

  listToDo();
  categorizeTasksByStatus();
}

function listToDo() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((tasks, index) => {
    const taskItem = document.createElement("div");
    taskItem.id = "item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tasks.taskStatus;
    
    checkbox.addEventListener("change", () => {
      updateTaskStatus(tasks, checkbox);
      categorizeTasksByStatus();
    });

    const label = document.createElement("span");
    label.textContent = tasks.task;

    const remove = document.createElement("button");
    remove.textContent = "delete";
    remove.addEventListener("click", () =>{
      removeTask(index);
      categorizeTasksByStatus();
    });
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskList.appendChild(taskItem);
    taskItem.appendChild(remove);
  });
}

function categorizeTasksByStatus(){
  const pendingTask = document.getElementById("pendingTask");
  pendingTask.innerHTML = "";

  const completedTask = document.getElementById("completedTask");
  completedTask.innerHTML = "";

  tasks.forEach((tasks, index) => {
    const taskSeparate = document.createElement("div");

    if(tasks.taskStatus){
    const label = document.createElement("li");
    label.textContent = tasks.task;
    
    taskSeparate.appendChild(label);
    completedTask.appendChild(taskSeparate);
    }
    else{
      const label = document.createElement("li");
      label.textContent = tasks.task;

      taskSeparate.appendChild(label);
      pendingTask.appendChild(taskSeparate);
    }
  });
}

function updateTaskStatus(tasks, checkbox) {
  tasks.taskStatus = checkbox.checked;
  listToDo();
  console.log(tasks);
}

function removeTask(index){
  tasks.splice(index,1);
  console.log(tasks);
  listToDo();
}

