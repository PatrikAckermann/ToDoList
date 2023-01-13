var toDoList = [];

var sidebar = document.getElementById("sidebar");
var listContainer = document.getElementById("toDos");
var currentList = 0

function clearSidebar() {
    var lists = document.getElementsByClassName("list");
    while(lists.length > 0) {
        lists[0].remove();
    }
}

function loadLists() {
    clearSidebar()
    for(i = 0; i < toDoList.length; i++) {
        var newList = document.createElement("div");
        newList.setAttribute("class", "list sidebarElement");
        newList.setAttribute("id", i);
        newList.setAttribute("onclick", "chooseList(" + i + ")");

        var listTitle = document.createElement("p");
        listTitle.appendChild(document.createTextNode(toDoList[i][0]));

        var editButton = document.createElement("button");
        editButton.setAttribute("class", "listEditButton");
        editButton.setAttribute("onclick", "editList(" + i + ")")

        var editSymbol = document.createElement("i");
        editSymbol.setAttribute("class", "fa-solid fa-pen-to-square fa-2x");
        editButton.appendChild(editSymbol);

        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "listDeleteButton");
        deleteButton.setAttribute("onclick", "deletePopup('" + toDoList[i][0] + "'," + i + ")");

        var trashSymbol = document.createElement("i");
        trashSymbol.setAttribute("class", "fa-solid fa-trash fa-2x");
        deleteButton.appendChild(trashSymbol);

        newList.appendChild(listTitle);
        newList.appendChild(deleteButton);
        newList.appendChild(editButton);
        sidebar.appendChild(newList);
    }
}

function clearToDos() {
    var toDos = document.getElementsByClassName("toDo");
    while(toDos.length > 0) {
        toDos[0].remove();
    }
}

function loadToDos(listIndex) {
    clearToDos();

    var title = document.getElementById("listTitle");
    title.innerHTML = toDoList[listIndex][0];

    for(i = 1; i < (toDoList[listIndex].length); i++) {
        var toDo = document.createElement("div");
        toDo.setAttribute("class", "toDo");
        toDo.setAttribute("id", i);

        var toDoCheckbox = document.createElement("input");
        toDoCheckbox.setAttribute("type", "checkbox");
        toDoCheckbox.setAttribute("name", "checkbox" + i);
        toDoCheckbox.setAttribute("id", ("toDo" + i));
        toDoCheckbox.setAttribute("class", "checkBox");
        toDoCheckbox.setAttribute("onclick", "checkBoxClicked(" + listIndex + ")");
        if(toDoList[listIndex][i][1] == true) {
            toDoCheckbox.setAttribute("checked", "true");
        }

        var toDoTitle = document.createElement("label");
        toDoTitle.setAttribute("for", "checkbox" + i);
        toDoTitle.appendChild(document.createTextNode(toDoList[listIndex][i][0]));
        if(toDoList[listIndex][i][1] == true) {
            toDoTitle.style.textDecoration = "line-through";
        }

        var editButton = document.createElement("button");
        editButton.setAttribute("class", "toDoEditButton");
        editButton.setAttribute("onclick", "editToDo(" + listIndex + ", " + i + ")");

        var editSymbol = document.createElement("i");
        editSymbol.setAttribute("class", "fa-solid fa-pen-to-square");
        editButton.appendChild(editSymbol);

        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "toDoDeleteButton");
        deleteButton.setAttribute("onclick", "deleteToDo(" + listIndex + ", " + i + ")");

        var trashSymbol = document.createElement("i");
        trashSymbol.setAttribute("class", "fa-solid fa-trash");
        deleteButton.appendChild(trashSymbol);

        toDo.appendChild(toDoCheckbox);
        toDo.appendChild(toDoTitle);
        toDo.appendChild(deleteButton);
        toDo.appendChild(editButton);
        listContainer.appendChild(toDo);
    }
}

function loadCookie() {
    var cookie = document.cookie.replace("data=", "");
    if(cookie != "") {
        cookie = JSON.parse(cookie);
        toDoList = cookie;
    }
}

function writeCookie() {
    expireDate = Date.now() + 31536000000; // 1 Year from now
    jsonCookie = JSON.stringify(toDoList);
    document.cookie = "data=" + jsonCookie + ";" + "expires="+ expireDate + ";SameSite=Strict";
}

function createList() {
    var newList = window.prompt("Wie soll die Liste heissen?");
    if(newList != null && newList != "") {
        toDoList.push([newList]);
        writeCookie();
        loadLists();
    } else if(newList == "") {
        alert("Der Name der Liste darf nicht leer sein.");
    }
    chooseList(toDoList.length - 1);
}

function addToDo() {
    var newToDo = window.prompt("Wie soll das ToDo heissen?");
    if(newToDo != null && newToDo != "") {
        toDoList[currentList].push([newToDo, false]);
        writeCookie();
        loadToDos(currentList);
    } else if(newToDo == "") {
        alert("Der Name des ToDos darf nicht leer sein.")
    }    
}

function deleteList(index) {
    toDoList.splice(index, 1);
    writeCookie();
    loadLists();
}

function deleteToDo(listIndex, toDoIndex) {
    toDoList[listIndex].splice(toDoIndex, 1);
    writeCookie();
    loadToDos(listIndex);
}

function editToDo(listIndex, toDoIndex) {
    var newName = window.prompt("Zu welchem Namen möchtest du das ToDo umbennnen?");
    if(newName != null && newName != "") {
        toDoList[listIndex][toDoIndex][0] = newName;
        writeCookie();
        loadToDos(listIndex);
    } else if(newName == "") {
        alert("Der Name des ToDos darf nicht leer sein.")
    }
}

function editList(listIndex) {
    var newName = window.prompt("Zu welchem Namen möchtest du die Liste umbennnen?");
    if(newName != null && newName != "") {
        toDoList[listIndex][0] = newName;
        writeCookie();
        loadLists();
    } else if(newName == "") {
        alert("Der Name des ToDos darf nicht leer sein.")
    }
}

function chooseList(listIndex) {
    if(listIndex > toDoList.length - 1) {
        listIndex = toDoList.length - 1;
    }
    var container = document.getElementById("listContainer");
    var addToDoButton = document.getElementById("addToDo");
    if(toDoList.length > 0) {
        for(i = 0; i < toDoList.length; i++) {
            document.getElementById(i).style.backgroundColor = "#359eff";
        }
        var list = document.getElementById(listIndex);
        list.style.backgroundColor = "#7abfff";
        currentList = listIndex;
        loadToDos(listIndex);
        addToDoButton.style.display = "inline";
        container.style.visibility = "visible";
    } else {
        container.style.visibility = "hidden";
        currentList = -1;
    }
}

function deletePopup(name, index) {
    if(window.confirm("Möchtest du " + name + " wirklich löschen?")) {
        deleteList(index);
    }
}

function checkBoxClicked(listIndex) {
    var checkBox = document.getElementsByClassName("checkBox");
    for(i = 0; i <= checkBox.length - 1; i++) {
        if(checkBox[i].checked) {
            toDoList[listIndex][i + 1][1] = true;
        } else {
            toDoList[listIndex][i + 1][1] = false;
        }
    }
    writeCookie();
    loadToDos(listIndex);
}

loadCookie();
loadLists();
chooseList(0);