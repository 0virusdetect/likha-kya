<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Likha kya ?</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<link rel="stylesheet" href="style.css">
</head>

<body>
<div class="container">

<p style="font-size: 18px;" class="my-3 text-center">Likha kya ?</p>
<button class="mb-4" id="addNoteButton">Add Note</button>
<ul class="row" id="notesList"></ul>

<!-- Modal -->
<div id="noteModal" class="modal1 col-4">
<div class="modal1-content">

<form id="noteForm">
<p class="close">&times;</p>
<input type="hidden" id="noteId">
<div class="form-group my-3">
<label for="subject">Title</label>
<input required name="title" type="text" class="form-control" id="subject" placeholder="Enter Title">
</div>

<div class="form-group my-3">
<label for="description">Description</label>
<textarea required name="title" type="text" class="form-control" id="description" placeholder="Enter Title"></textarea>
</div>

<button class="text-center btn btn-success w-100" type="submit">Save Note</button>
</form>
</div>
</div>
</div>

<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>

</html>
