var input= document.querySelector(`input[type="text"]`);
var all= document.querySelector(".all");
var pending= document.querySelector(".pending");
var completed= document.querySelector(".completed");
var clearAll= document.querySelector(".clear-all");
var taskList= document.querySelector("ul");
var Checkboxes=document.querySelectorAll(`input[type="checkbox"]`);
var taskArray=[];
show("all");
input.value="";

input.addEventListener("keypress",  function(e){
    if(e.key=='Enter'&& input.value.trim() !== ''){
        var taskName = e.target.value;
        taskArray.push({
          name: taskName,
          taskStatus: 'pending'
        }) 
        show("all");
        input.value="";
    }
});

function creatLi(myTaskName , id){
  
    if(taskArray[id].taskStatus=='completed'){
      var myTaskStatus = 'checked';
    }else{
      var myTaskStatus = '';
    }
  
    taskList.innerHTML +=`
     <li id="${id}">
       <div>
         <input type="checkbox" ${myTaskStatus} onclick="changeStatus(this , ${id})"/>
         <span class="${myTaskStatus}">${myTaskName}</span>
       </div>
       <div class="dropdown">
         <svg onclick="myFunction()" class="dropbtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
           <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
         </svg>
         <div id="myDropdown" class="dropdown-content">
           <a onclick="editFunction(this , ${id})">Edit</a>
           <a onclick="deleteFunction(this , ${id})">Delete</a>
         </div>
      </div> 
    </li>`;
};

function editFunction(editThis, id){
  console.log(editThis.innerHTML)
  console.log(id)

  input.value=taskArray[id].name;
};

function deleteFunction(deleteThis, id){
  console.log(deleteThis)
  console.log(id)

  taskArray.splice(id, 1);
  show('all');
};

function changeStatus(thisInput , id) {
  console.log(thisInput.nextElementSibling.innerHTML)
  console.log(id)
     if(taskArray[id].taskStatus=='pending'){
      thisInput.nextElementSibling.classList.add("checked");
      taskArray[id].taskStatus='completed'
    } else{
          thisInput.nextElementSibling.classList.remove("checked");
          taskArray[id].taskStatus='pending'
    }   
    
  };


function show(filter){
  if(taskArray.length>0){
    taskList.innerHTML =``;
    Checkboxes= document.querySelectorAll(`input[type="checkbox"]`);
    if( filter=='all'){
      all.classList.add("blue");
      pending.classList.remove("blue");
      completed.classList.remove("blue");
      taskArray.forEach( (task , id) => {
          creatLi(task.name, id);
        });
      }
      else {
        taskArray.forEach((t , id) => {
         if(t.taskStatus==filter){
          creatLi(t.name, id);
         }
        });
     }
    }else {
      taskList.innerHTML=`Please add a task...`
    }
};

all.addEventListener("click",  function(e){
  all.classList.add("blue");
  pending.classList.remove("blue");
  completed.classList.remove("blue");
  show("all");
}
)

pending.addEventListener("click",  function(e){
    pending.classList.add("blue");
    all.classList.remove("blue");
    completed.classList.remove("blue");
    show("pending");
  }
  )

  completed.addEventListener("click",  function(e){
      completed.classList.add("blue");
      all.classList.remove("blue");
      pending.classList.remove("blue");
      show("completed");
  }
  )

  clearAll.addEventListener("click",  function(e){
      completed.classList.remove("blue");
      all.classList.add("blue");
      pending.classList.remove("blue");
    taskArray=[];
    show("all");
     
     }
  )

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
  