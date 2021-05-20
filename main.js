//DEFINING UI VARIABLES

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListener();

function loadEventListener(){
    //DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks)

    //add task event
    form.addEventListener("submit", addTask);

    //remove task event
    taskList.addEventListener("click", removeTask);

    //clear task event
    clearBtn.addEventListener("click", clearTask)

    //filter task event
    filter.addEventListener("keyup", filterTask)

}

//get task from LS onto the DOM
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
        //Create LI element
        const li = document.createElement("li")
        //Add class to li elements
        li.className = "collection-item";
        //create text node and append to li
        li.appendChild(document.createTextNode(task))
        //create new link element
        const link = document.createElement("a")
        //add class to element
        link.className = "delete-item secondary-content"
        //add icon html
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    })

}


//Add task function
function addTask(e){
    if(taskInput.value === ""){
        alert("Add a task")
    }
    //Create LI element
    const li = document.createElement("li")
    //Add class to li elements
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    //create new link element
    const link = document.createElement("a")
    //add class to element
    link.className = "delete-item secondary-content"
    //add icon html
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear Input
    taskInput.value = "";

    e.preventDefault();
}

//Store task in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

//remove task function
function removeTask(e){

    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove()

            //remove task from local storage
            removeFromLocalStorage(e.target.parentElement.parentElement)
        }    
    }
    
}
//remove from local storage function
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks))

}


//clear task
function clearTask(e){
    if(confirm("are you sure?")){
        //taskList.remove()

        //remove using while loop
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }

        //clearTask from local storage
        clearTaskFromLocalStorage();
    }
    e.preventDefault()
}

//Clear Task from Local Storage
function clearTaskFromLocalStorage(){
    localStorage.clear()
}


//filter task
function filterTask(e){
    const text= e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }

    })

}

