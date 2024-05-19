function showMessageCard(message, duration) {
var messageCard = $('<div class="message-card"></div>').text(message);
$('body').append(messageCard);
setTimeout(function() {
messageCard.remove();
}, duration);
}

document.addEventListener("DOMContentLoaded", function () {
const addNoteButton = document.getElementById("addNoteButton");
const noteModal = document.getElementById("noteModal");
const closeModal = document.getElementsByClassName("close")[0];
const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const noteIdInput = document.getElementById("noteId");
const subjectInput = document.getElementById("subject");
const descriptionInput = document.getElementById("description");

addNoteButton.onclick = function () {
noteIdInput.value = "";
subjectInput.value = "";
descriptionInput.value = "";
noteModal.style.display = "block";
};

closeModal.onclick = function () {
noteModal.style.display = "none";
};

document.addEventListener('click', function(event) {
if (event.target !== noteModal &&
!noteModal.contains(event.target) &&
event.target !== addNoteButton &&
!event.target.classList.contains('edit')
) {
noteModal.style.display = 'none';
}
});

noteForm.addEventListener("submit", function (e) {
e.preventDefault();
const noteId = noteIdInput.value;
const subject = subjectInput.value;
const description = descriptionInput.value;

if (noteId) {
updateNote({
id: noteId,
subject: subject,
description: description,
});
} else {
addNote({
subject: subject,
description: description,
});
}

noteModal.style.display = "none";
});

function fetchNotes() {
fetch("api.php?action=read")
.then((response) => response.json())
.then((data) => {
notesList.innerHTML = "";
data.forEach((note) => {
const noteElement = createNoteElement(note);
notesList.appendChild(noteElement);
});
})
.catch((error) => console.error("Error fetching notes:", error));
}

function addNote(note) {
fetch("api.php?action=create", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(note),
})
.then((response) => response.json())
.then((data) => {
console.log("Note added:", data);

const noteElement = createNoteElement(data);
notesList.appendChild(noteElement);
showMessageCard("Saved", 1000);
})
.catch((error) => console.error("Error adding note:", error));
}

function updateNote(note) {
fetch("api.php?action=update", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(note),
})
.then((response) => response.json())
.then((data) => {
showMessageCard("Edited", 1000);
console.log("Note updated:", data);
fetchNotes();
noteForm.reset();

})
.catch((error) => console.error("Error updating note:", error));
}

function deleteNote(noteId) {
fetch(`api.php?action=delete&id=${noteId}`, {
method: "GET",
})
.then((response) => response.json())
.then((data) => {
    showMessageCard("Deleted", 1000);
console.log("Note deleted:", data);

fetchNotes();

})
.catch((error) => console.error("Error deleting note:", error));
}

function createNoteElement(note) {
const notesList = document.getElementById("notesList");

// Create div for column
const colDiv = document.createElement("div");
colDiv.className = "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 list";

const li = document.createElement("li");
li.dataset.id = note.id;
li.className = "list_b my-2";

const subject = document.createElement("p");
subject.textContent = note.subject;
li.appendChild(subject);

const descriptionList = document.createElement("ul");
note.description.forEach((desc, index) => {
const descLi = document.createElement("li");
descLi.textContent = desc;
descriptionList.appendChild(descLi);
});
li.appendChild(descriptionList);

const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.className = "edit";
editButton.addEventListener("click", () => {
noteIdInput.value = note.id;
subjectInput.value = note.subject;
descriptionInput.value = note.description.join("\n");
noteModal.style.display = "block";
});
li.appendChild(editButton);

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.className = "delete";
deleteButton.addEventListener("click", () => {
deleteNote(note.id);
});
li.appendChild(deleteButton);

// Append li to the colDiv
colDiv.appendChild(li);

// Append colDiv to the notesList
notesList.appendChild(colDiv);

// Return colDiv if needed
return colDiv;
}

fetchNotes();
});
