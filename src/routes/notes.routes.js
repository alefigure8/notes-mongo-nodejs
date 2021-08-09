const { Router } = require("express");
const router = Router();

const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNotes,
    deleteNotes,
} = require("../controllers/notes.controller");

const { isAuthenticated } = require('../helpers/Auth')

//New Note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

//Get All Notes
router.get("/notes", isAuthenticated, renderNotes);

//Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

//Update Notes
router.put("/notes/edit/:id", isAuthenticated, updateNotes);

//Delete Notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNotes);

module.exports = router;