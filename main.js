let tasks = []

let currentStatus = 0

const statusClasses = {
    1: "status-active",
    2: "status-in-work",
    3: "status-finished"
}

const statusListClasses = {
    0: "status-list-all",
    1: "status-list-active",
    2: "status-list-in-work",
    3: "status-list-finished"
}

function createTask(name,text){
    const taksObj = {
        id: tasks.length,
        name: name,
        text: text,
        status: 1,
    }
    tasks.push(taksObj)
}

function updateTaskTable(){
    let table = document.querySelector("#list-container")
    let tableHTML = ""
    for (let i = 0; i < tasks.length; i++){
        const task = tasks[i]
        if (task.status == currentStatus || currentStatus == 0){
            tableHTML += `
            <div class="task-container">             
    
              <div class="tasks">
                <div class="task-title-name" id="task-title-name-${task.id}" onclick="showTaskText(${task.id})">
                    ${task.name}
                </div>
                
                <input type="text" placeholder="новый текст задания.." class="task-title-edit hidden" onblur="confirmNewTaskTitle(${task.id})" id="edit-task-input-${task.id}">
                <input type="text" placeholder="новое имя задания.." class="task-title-edit-name hidden" onblur="confirmNewTaskTitleName(${task.id})" id="edit-task-input-name-${task.id}">
                
                <div class="task-title hidden wow animate__animated animate__slideInDown" id="task-title-${task.id}">
                    ${task.text}
                </div>

                </div>

               <div class="task-buttons">
                    <select class="task-status ${statusClasses[task.status]}" id="status-select-${task.id}" onchange="editTaskStatus(${task.id})">
                        <option value="1" ${task.status == 1 ? "selected" : ""}>Не начато</option>
                        <option value="2" ${task.status == 2 ? "selected" : ""}>В работе</option>
                        <option value="3" ${task.status == 3 ? "selected" : ""}>Готово</option>
                    </select>

                    <div class="change-buttons" onclick="showChangeButtons(${task.id})">
                    <div id="change-${task.id}" class="change">Изменить</div>
                    <button class="button-edit hidden name" onclick="editTaskTitleName(${task.id})" id="name-${task.id}">Название</button>
                    <button class="button-edit hidden text" onclick="editTaskTitle(${task.id})" id="text-${task.id}">Tекст</button>
                   
                    </div>
                    
                    <button class="button-delete" onclick="deleteTask(${task.id})">Удалить</button>
                
                    </div> 
                
                </div>
                
            </div>`
        }
    }
    table.innerHTML = tableHTML

    let title = document.querySelector(".todoList-header")
    title.innerHTML = `Задания (${tasks.length}):`
}


function getTaskIndexById(id) {
    let i = 0
    let task = tasks[i]
    while (task.id != id) {
        i += 1
        task = tasks[i]
    }
    return i
}

function editTaskTitle(id){ 
    const taskTitle = document.querySelector(`#task-title-${id}`)
    taskTitle.classList.add("hidden")

    const inputField = document.querySelector(`#edit-task-input-${id}`)
    inputField.classList.remove("hidden")

    const taskName = tasks[getTaskIndexById(id)].text
    inputField.value = taskName
}

function editTaskTitleName(id){ 
    const taskTitleName = document.querySelector(`#task-title-name-${id}`)
    taskTitleName.classList.add("hidden")

    const inputField = document.querySelector(`#edit-task-input-name-${id}`)
    inputField.classList.remove("hidden")

    const taskName = tasks[getTaskIndexById(id)].name
    inputField.value = taskName
}

function confirmNewTaskTitle(id){
    const taskTitle = document.querySelector(`#task-title-${id}`)
    taskTitle.classList.remove("hidden")

    const inputField = document.querySelector(`#edit-task-input-${id}`)
    inputField.classList.add("hidden")

    const index = getTaskIndexById(id)
    tasks[index].text = inputField.value
    taskTitle.innerHTML = inputField.value
}

function confirmNewTaskTitleName(id){
    const taskTitleName = document.querySelector(`#task-title-name-${id}`)
    taskTitleName.classList.remove("hidden")

    const inputField = document.querySelector(`#edit-task-input-name-${id}`)
    inputField.classList.add("hidden")

    const index = getTaskIndexById(id)
    tasks[index].name = inputField.value
    taskTitleName.innerHTML = inputField.value
}

function editTaskStatus(id){ 
    const index = getTaskIndexById(id)
    const oldStatus = tasks[index].status

    const statusSelect = document.querySelector(`#status-select-${id}`)
    const newStatus = parseInt(statusSelect.value)
    
    tasks[index].status = newStatus
    statusSelect.classList.add(statusClasses[newStatus])
    statusSelect.classList.remove(statusClasses[oldStatus])
}

function deleteTask(id){
    const index = getTaskIndexById(id)
    tasks.splice(index, 1)
    updateTaskTable()
}
function selectList(){
    const select = document.querySelector("#list-select")
    const newClass = statusListClasses[parseInt(select.value)]
    for (let statusListClass in statusListClasses){
        select.classList.remove(statusListClasses[statusListClass])
    }
    select.classList.add(newClass)
    currentStatus = parseInt(select.value)
    updateTaskTable()
}

function errorLog(text){
    let messageContainer = document.querySelector("#message-container")
    messageContainer.innerHTML = text
    if (text != "") messageContainer.style.opacity = "1"
    else messageContainer.style.opacity = "0"
}

function submitTask(){
    const taskName = document.querySelector("#task-name-input")
    const taskText = document.querySelector("#task-text-input")
    
    try {
       if (taskText.value =="" && taskName.value =="") throw "Введите данные"
       if (taskText.value =="") throw "Введите текст задания"
       if (taskName.value =="") throw "Введите название задания"

        createTask(taskName.value,taskText.value)
        updateTaskTable()
        errorLog("")
        taskText.value = ""  
        taskName.value = "" 
    }
    catch (error){
        errorLog(error)
    }
}

function showTaskText(id){
    const index = tasks[getTaskIndexById(id)].id
    const taskText = document.querySelector(`#task-title-${id}`)  
    taskText.classList.toggle("hidden")
}

function showChangeButtons(id){
    const index = tasks[getTaskIndexById(id)].id
    const taskName = document.querySelector(`#name-${id}`)  
    const taskText = document.querySelector(`#text-${id}`)  
    const taskChange = document.querySelector(`#change-${id}`)  
    taskName.classList.toggle("hidden")
    taskText.classList.toggle("hidden")
    taskChange.classList.toggle("hidden")
}


