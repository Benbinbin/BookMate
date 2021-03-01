const express = require('express');
const BookModel = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
  const book = await BookModel.find()
  res.send(book)
})

router.get('/:id', async (req, res) => {
  const book = await BookModel.findById(req.params.id)
  res.send(book)
})

router.post('/', async (req, res) => {
  const book = new BookModel({
    metadata: { ...req.body.metadata },
    quotes: req.body.quotes || [],
    summaries: req.body.summaries || [],
  });
  try {
    const saveBook = await book.save();
    res.redirect(`/books/${saveBook._id}`)
  } catch (e) {
    console.log(e);
  }
  // await console.log(req.body);
  // res.send(req.body)
});


module.exports = router;