// Check or uncheck elements
var checkboxes = document.getElementsByName("todo");

for(let i=0;i<checkboxes.length; i++){
    changeState(checkboxes[i]);
}

function changeState(checkbox){
    checkbox.onclick=function(){
        if(checkbox.checked){
            checkbox.nextSibling.classList.toggle("done");
            checkIfDone(checkbox);
        } else {
            checkbox.nextSibling.classList.toggle("done");
            checkIfDone(checkbox);
            return;
            }
        }
}

function checkIfDone(element){
    var tasks = document.getElementById("notdone");
    var doneList = document.getElementById("alldone");
    if(element.nextSibling.className === "done"){
        var readd =  element.parentElement;
        element.parentElement.remove();
        doneList.appendChild(readd);
    } else{
        var readd2 =  element.parentElement;
        element.parentElement.remove();
        tasks.appendChild(readd2);
    }
}


// Add elements
var input = document.getElementById("newitem");

input.addEventListener("keypress", function(event){
    if(event.keyCode === 13){
        addTask();
    }
})

function addTask(){
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    var span = document.createElement("span");
    //Set attributes
    checkbox.type = "checkbox";
    checkbox.name = "todo";
    checkbox.checked = false;
    checkbox.value = 1 + document.getElementById("items").getElementsByTagName("li").length;
    //Append
    li.appendChild(checkbox);
    var span = li.appendChild(span);

    //Get text for element
    var text = document.getElementById("newitem").value;
    var task = document.createTextNode(text);
    span.appendChild(task);

    //Add task to list
    if(text === ''){
        alert("Do something!");
    } else {
        document.getElementById("items").appendChild(li);
        changeState(checkbox);
    }
    //Clear textbox
    document.getElementById("newitem").value = "";
}
