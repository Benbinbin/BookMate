const express = require('express');
const NoteModel = require('../models/note');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Get notes');
});

router.get('/:id', async (req, res) => {
  res.send(`Get ${req.params.id} note.`);
});

router.post('/', async (req, res) => {

});

module.exports = router;