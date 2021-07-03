//********************* Variables ***********************//
let list_of_notes = []; //Declare array for notes
let archive_list_of_notes = []; //Declare array for notes
let close_modal_menu_edit = document.querySelector("#close_edit_modal"); // button for close modal window update
let modal_window_creat = document.getElementById("modal_menu_creat"); // modal window for creat new note
let open_modal_creat = document.getElementById("creat_button"); // button for open modal window for creat new note 
let close_modal_window_creat = document.querySelector("#close"); // button close
let modal_input_date = document.querySelector("#input_data"); // input iformation
let list_with_note = document.querySelector(".notes_content_list"); // list with all active notes
let list_with_archived_note = document.querySelector(".notes_content_archived_list"); // list witn all archived notes
let archive_all_button = document.querySelector("#button_archive_all"); // button for archive all notes
let delete_all_button = document.querySelector("#button_delete_all"); // button for delete all notes
let open_archive_modal = document.querySelector("#open_arcive_modal"); // button for open modal with archive notes
let note_modal_editor = document.querySelector("#Change_modal"); // modal window for update information
let modal_editor_submit = document.querySelector("#modal_change_date"); // open window with change modal
//************************************************************//
//********************* Local storadge ***********************//
let local_storadge_list = JSON.parse(localStorage.getItem("list_of_notes"));
local_storadge_list != null ? (list_of_notes = local_storadge_list) : (list_of_notes = []);
local_storadge_list = JSON.parse(localStorage.getItem("archive"));
local_storadge_list != null ? (archive_list_of_notes = local_storadge_list) : (archive_list_of_notes = []);
//************************************************************//
//********************* Local storadge ***********************//
const upload_from_storage  = (name, list) => {
  list
    ? localStorage.setItem(name, JSON.stringify(list))
    : localStorage.setItem(name, JSON.stringify([]));
};
//************************************************************//
//********************* Open and close modal window ***********************//
open_modal_creat.onclick = function () {
  modal_window_creat.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal_window_creat) {
    modal_window_creat.style.display = "none";
  }
};

window.onclick = function (event) {
  if (event.target == note_modal_editor) {
    note_modal_editor.style.display = "none";
  }
};

close_modal_menu_edit.addEventListener("click", () => {
  note_modal_editor.style.display = "none";
});

close_modal_window_creat.addEventListener("click", () => {
  modal_window_creat.style.display = "none";
});

const modalEditorOpen = (index) => {
  note_modal_editor.style.display = "block";
  modal_editor_submit.addEventListener("submit", (e) =>
    modalEditorFunc(e, index)
  );
};
//************************************************************//
//********************* Template for add new note ***********************//
const creat_note = (item, index, archive) => {
  const archive_svg_icon = archive
  ? "./img/download-button_reverce.svg"
  : "./img/download-button.svg";
  const classChange = archive ? "Non-Change" : "";
  let icon;
  if (item.category == "Random Thought") {
    icon = 'img src="img/mind-settings.svg" alt="mind" class="icon_background icon_random_thought"';
  } else if (item.category == "Task") {
    icon = 'img src="img/cart.svg" alt="cart" class="icon_background icon_item"';
  } else if (item.category == "Quote") {
    icon = 'img src="img/right-quote-sign.svg" alt="quote" class="icon_background icon_quote"';
  } else {
    icon = 'img src="img/idea.svg" alt="idea" class="icon_background icon_idea"';
  }
  let template_for_note = ` <tr class="note">
                            <td class="first_column"><${icon}></td>
                            <td class="name second_column">${item?.name}</td>
                            <td class="third_column">${item.date}</td>
                            <td class="fourth_column">${item.category}</td>
                            <td class="fifth_column">${item.context}</td>
                            <td class="sixth_column">${item.planDate}</td>
                            <td class="seventh_column"> 
                                <img src="img/edit.svg" alt="edit" class="note_icon ${classChange}" id="button_edit" onclick={modalEditorOpen(${index})}> 
                                <img src="${archive_svg_icon}" alt="archive" class="note_icon" id="button_archive" onclick={changeArchiveStatus(${index},${archive})}>
                                <img src="img/delete.svg" alt="delete" class="note_icon" id="button_delete" onclick={deleteNote(${archive},${index})}>
                            </td>
                          </tr>`;
  return template_for_note;
};
//************************************************************//
//********************* Local storadge ***********************//
const notes_print = (td, list, archive) => {
  if (archive) {
    td.innerHTML = "";
    list.map((i, ind) => (td.innerHTML += creat_note(i, ind, true)));
  } else {
    td.innerHTML = "";
    list.map((i, ind) => (td.innerHTML += creat_note(i, ind, false)));
  }
};
//************************************************************//
//********************* Open modal window with archived ***********************//
open_archive_modal.addEventListener("click", () => {
  if (list_with_archived_note.classList[1] == "notes_content_archived_list_unactive") {
    list_with_archived_note.classList.remove("notes_content_archived_list_unactive");
  } else {
    list_with_archived_note.classList.add("notes_content_archived_list_unactive");
  }
});
//************************************************************//
//********************* Button for archived all notes ***********************//
archive_all_button.addEventListener("click", () => {
  list_of_notes.forEach((i) => {
    archive_list_of_notes.push(i);
  });
  list_of_notes = [];
  notes_print(list_with_archived_note, archive_list_of_notes, true);
  notes_print(list_with_note, list_of_notes, false);
  upload_from_storage ("archive", archive_list_of_notes);
  upload_from_storage ("list_of_notes", list_of_notes);
  counter_active_archived(list_of_notes, archive_list_of_notes);
});
//************************************************************//
//********************* Button for delete all notes ***********************//
delete_all_button.addEventListener("click", () => {
  list_of_notes = [];
  list_with_note.innerHTML = "";
  archive_list_of_notes = [];
  list_with_archived_note.innerHTML = "";
  upload_from_storage ("list_of_notes", list_of_notes);
  upload_from_storage ("archive", archive_list_of_notes);
  counter_active_archived(list_of_notes, archive_list_of_notes);
});
//************************************************************//
//********************* Button for singl delete note ***********************//
const deleteNote = (archiv, index) => {
  if (archiv) {
    archive_list_of_notes.pop(index);
    notes_print(list_with_archived_note, archive_list_of_notes, archiv);
    upload_from_storage ("archive", archive_list_of_notes);
  } else {
    list_of_notes.pop(index);
    notes_print(list_with_note, list_of_notes, archiv);
    upload_from_storage ("list_of_notes", list_of_notes);
  }
  counter_active_archived(list_of_notes, archive_list_of_notes);
};
//************************************************************//
//*********************  ***********************//
const changeArchiveStatus = (index, archive) => {
  if (archive) {
    list_of_notes.push(archive_list_of_notes[index]);
    archive_list_of_notes.pop(index);
    notes_print(list_with_note, list_of_notes, false);
    notes_print(list_with_archived_note, archive_list_of_notes, true);
    upload_from_storage ("list_of_notes", list_of_notes);
    upload_from_storage ("archive", archive_list_of_notes);
    upload_from_storage ("list_of_notes", list_of_notes);
    counter_active_archived(list_of_notes, archive_list_of_notes);
  } else {
    archive_list_of_notes.push(list_of_notes[index]);
    list_of_notes.pop(index);
    notes_print(list_with_note, list_of_notes, false);
    notes_print(list_with_archived_note, archive_list_of_notes, true);
    upload_from_storage ("list_of_notes", list_of_notes);
    upload_from_storage ("archive", archive_list_of_notes);
    counter_active_archived(list_of_notes, archive_list_of_notes);
  }
};
//************************************************************//

//************ Function for modal window creat new note with input ************//
modal_input_date.addEventListener("submit", (e) => {
  e.preventDefault();
  let tempDate = new Date();
  const Note = {
    name: e.target.name.value,
    date: tempDate.toLocaleDateString(),
    category: e.target.category.value,
    context: e.target.context.value,
    planDate: e.target.date.value,
  };
  list_of_notes.push(Note);
  modal_window_creat.style.display = "none";
  list_with_note.innerHTML = "";
  list_of_notes.forEach(
    (i, index) => (list_with_note.innerHTML += creat_note(i, index, false))
  );
  localStorage.setItem("list_of_notes", JSON.stringify(list_of_notes));
  counter_active_archived(list_of_notes, archive_list_of_notes);
});
//************************************************************//
//********************* Function for modal window update some informaition ***********************//
const modalEditorFunc = (e, index) => {
  e.preventDefault();
  let newDate = e.target.date.value;
  let newName = e.target.name.value;
  let newContext = e.target.context.value;
  newDate == ""
    ? (note_modal_editor.style.display = "none")
    : (list_of_notes[index].planDate = e.target.date.value);
  newName == ""
    ? (note_modal_editor.style.display = "none")
    : (list_of_notes[index].name = e.target.name.value);
  newContext == ""
    ? (note_modal_editor.style.display = "none")
    : (list_of_notes[index].context = e.target.context.value);
  notes_print(list_with_note, list_of_notes, false);
  upload_from_storage ("list_of_notes", list_of_notes);
  note_modal_editor.style.display = "none";
};
//************************************************************//
//********************* Counter for active and archived notes, sorted by categories ***********************//
const counter_active_archived = (list_of_notes, archive_list_of_notes) => {
  let thought_active = document.querySelector("#random_thought_active");
  let thought_archived = document.querySelector("#random_thought_archived");
  let tack_active = document.querySelector("#cart_active");
  let tack_archived = document.querySelector("#cart_archived");
  let idea_active = document.querySelector("#idea_active");
  let idea_archived = document.querySelector("#idea_archived");
  let quote_active = document.querySelector("#quote_active");
  let quote_archived = document.querySelector("#quote_archived");

  let idea_temp = 0;
  let task_temp = 0;
  let thought_temp = 0;
  let temp_quote = 0;

  list_of_notes.map((i) => {
    if (i.category == "Idea") {
      idea_temp++;
    } else if (i.category == "Task") {
      task_temp++;
    } else if (i.category == "Random Thought") {
      thought_temp++;
    } else if (i.category == "Quote") {
      temp_quote++;
    }
  });

  idea_active.innerHTML = idea_temp;
  tack_active.innerHTML = task_temp;
  thought_active.innerHTML = thought_temp;
  quote_active.innerHTML = temp_quote;

  idea_temp = 0;
  task_temp = 0;
  thought_temp = 0;
  temp_quote = 0;

  archive_list_of_notes.map((i) => {
    if (i.category == "Idea") {
      idea_temp++;
    } else if (i.category == "Task") {
      task_temp++;
    } else if (i.category == "Random Thought") {
      thought_temp++;
    } else if (i.category == "Quote") {
      temp_quote++;
    }
  });

  idea_archived.innerHTML = idea_temp;
  tack_archived.innerHTML = task_temp;
  thought_archived.innerHTML = thought_temp;
  quote_archived.innerHTML = temp_quote;
};

list_of_notes.forEach(
  (i, index) => (list_with_note.innerHTML += creat_note(i, index, false))
);

archive_list_of_notes.forEach(
  (i, index) => (list_with_archived_note.innerHTML += creat_note(i, index, true))
);

counter_active_archived(list_of_notes, archive_list_of_notes);
//************************************************************//