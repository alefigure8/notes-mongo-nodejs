const Note = require('../models/Note');

const noteCtrl = {};

noteCtrl.renderNoteForm = (req, res) => { //Muestra el formulario

    res.render('notes/new-note')

};


noteCtrl.createNewNote = async(req, res) => {

    const { title, description } = req.body
    const newNotes = new Note({ title, description })
    newNotes.user = req.user.id; //Agregamos user de passport al objeto a guardar
    await newNotes.save() //Guarda nota
    req.flash('success_msg', 'Note added successfuly')
    res.redirect('/notes')

};


noteCtrl.renderNotes = async(req, res) => {

    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean() //Busca todas las notas y las ordena
    res.render('notes/all-notes', { notes })

};


noteCtrl.renderEditForm = async(req, res) => { //Busca por id para editar, y protege rutas de usuario

    const notes = await Note.findById(req.params.id).lean()

    if (notes.user != req.user.id) { //Si el usuario logeado no es igual al usuario de la nota creada
        req.flash('error_msg', 'Not Authorized')
        return res.redirect('/notes')
    }

    res.render('notes/edit-note.hbs', { notes }); //Render notes según parámetros de find

};


noteCtrl.updateNotes = async(req, res) => {

    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('success_msg', 'Note updated successfuly')
    res.redirect('/notes')

};


noteCtrl.deleteNotes = async(req, res) => {

    await Note.findByIdAndDelete(req.params.id) //Busca yy elimina las notas
    req.flash('success_msg', 'Note deleted successfuly')
    res.redirect('/notes')

};


module.exports = noteCtrl;