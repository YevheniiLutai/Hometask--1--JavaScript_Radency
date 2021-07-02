//********************* Variables ***********************//
let open_modal_creat = document.getElementById("creat_button");//Open pop-window for creat new note
let close_modal_creat = document.getElementById("close_creat_modal");//button close modal with creat note
let add_note = document.getElementById("add_button");//Add new note 

let edit_button = document.querySelectorAll("#button_edit");//edit button
let delete_button = document.querySelectorAll("#button_delete");//delete button
let archive_button = document.querySelectorAll("#button_archive");//delete button
let closeModalMenu = document.querySelector("#close_edit_modal");//button close modal with edit note

let deleteAllButton = document.getElementById("button_delete_all");//button for delete all notes
let archiveAllButton = document.getElementById("button_archive_all");//button for archive all notes

let openArchiveModal = document.getElementById("open_arcive_modal");//button for open modal with archive notes
let closeArchiveModal = document.getElementById("close_archive_modal");//button fot clsoe modal archive notes
let modalEditorSubmit = document.querySelector("#Change_date");

let modal_window_creat = document.getElementById("modal_menu_creat");
let modal_input_date = document.querySelector("#input_data")

let notesListWrapper = document.querySelector(".todo-list");
let notesArchiveListWrapper = document.querySelector(".todo-wrapper-info");
//************************************************************//
//********************* Local storadge ***********************//
let list_of_notes = [];//array for list with notes
let archive_list_of_notes = [];//array for list with archived notes
let local_storadge_list = JSON.parse(localStorage.getItem("list_of_notes"));
local_storadge_list = JSON.parse(localStorage.getItem("archive_list_of_notes"));
local_storadge_list != null ? (list_of_notes = local_storadge_list) : (local_storadge_list = []);
local_storadge_list != null ? (archive_list_of_notes = local_storadge_list) : (archive_list_of_notes = []);
//************************************************************//

//**************It's for testing button****************//
//********************* Buttons functions ***********************//
let windowObjectReference;//Just for test
let windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";//Just for test

edit_button.forEach(button_edit => {
    button_edit.addEventListener('click', () => {
        window.open("https://www.itc.ua", "ITC", windowFeatures);
    });
});

delete_button.forEach(button_delete => {
    button_delete.addEventListener('click', () => {
        window.open("https://www.youtube.com/", "YouTube", windowFeatures);
    });
});

archive_button.forEach(button_archive => {
    button_archive.addEventListener('click', () => {
        window.open("https://www.twitch.tv/", "Twitch", windowFeatures);
    });
});
//**************************************************//


open_modal_creat.onclick = function () {
        modalCreator.style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == modalCreator) {
          modalCreator.style.display = "none";
        }
      };
      window.onclick = function (event) {
        if (event.target == modalEditor) {
          modalEditor.style.display = "none";
        }
      };