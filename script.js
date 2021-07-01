//********************* Variables ***********************//
let creatNote = document.getElementById("creat_button");//Open pop-window for creat new note
let addNote = document.getElementById("add_button");//Add new note 
let editButton = document.querySelectorAll("#button_edit");//edit button
let deleteButton = document.querySelectorAll("#button_delete");//delete button
let archiveButton = document.querySelectorAll("#button_archive");//delete button
let windowObjectReference;//Just for test
let windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";//Just for test
//**************************************************//

//********************* Buttons functions ***********************//
editButton.forEach(button_edit => {
    button_edit.addEventListener('click', () => {
        window.open("https://www.itc.ua", "ITC", windowFeatures);
    });
});
//**************************************************//

//**************It's for testing button****************//
deleteButton.forEach(button_delete => {
    button_delete.addEventListener('click', () => {
        window.open("https://www.youtube.com/", "YouTube", windowFeatures);
    });
});

archiveButton.forEach(button_archive => {
    button_archive.addEventListener('click', () => {
        window.open("https://www.twitch.tv/", "Twitch", windowFeatures);
    });
});
//**************************************************//


let editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    
    
    var listItem=this.parentNode;
    
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var containsClass=listItem.classList.contains("editMode");
            //If class of the parent is .editmode
            if(containsClass){
    
            //switch to .editmode
            //label becomes the inputs value.
                label.innerText=editInput.value;
            }else{
                editInput.value=label.innerText;
            }
    
            //toggle .editmode on the parent.
            listItem.classList.toggle("editMode");
    }