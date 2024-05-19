<?php

$action = $_GET['action'];

switch ($action) {
case 'create':
createNote();
break;
case 'read':
readNotes();
break;
case 'update':
updateNote();
break;
case 'delete':
deleteNote();
break;
default:
echo json_encode(['error' => 'Invalid action']);
}

function getNotes() {
$file = 'notes.json';
if (!file_exists($file)) {
file_put_contents($file, json_encode([]));
}
return json_decode(file_get_contents($file), true);
}

function saveNotes($notes) {
file_put_contents('notes.json', json_encode($notes, JSON_PRETTY_PRINT));
}

function createNote() {
$notes = getNotes();
$data = json_decode(file_get_contents('php://input'), true);

$newNote = [
'id' => uniqid(),
'subject' => $data['subject'],
'description' => explode("\n", $data['description'])
];

$notes[] = $newNote;
saveNotes($notes);
echo json_encode($newNote);
}

function readNotes() {
$notes = getNotes();
echo json_encode($notes);
}

function updateNote() {
$notes = getNotes();
$data = json_decode(file_get_contents('php://input'), true);

foreach ($notes as &$note) {
if ($note['id'] === $data['id']) {
$note['subject'] = $data['subject'];
$note['description'] = explode("\n", $data['description']);
break;
}
}

saveNotes($notes);
echo json_encode(['status' => 'success']);
}

function deleteNote() {
$notes = getNotes();
$id = $_GET['id'];

$notes = array_filter($notes, function ($note) use ($id) {
return $note['id'] !== $id;
});

saveNotes(array_values($notes));
echo json_encode(['status' => 'success']);
}
