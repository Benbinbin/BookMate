const express = require('express');
const BookModel = require('../models/book');
const QuoteModel = require('../models/quote');
const SummaryModel = require('../models/summary');


const router = express.Router();

// get book information (or certain fields) by id
router.get('/:id', async (req, res) => {
  let fields = ['metadata', 'quote_ids', 'summary_ids']
  if (req.query.fields) {
    fields = [];
    req.query.fields.forEach(field => {
      fields.push(field)
    })
  }
  await BookModel.findById(req.params.id, fields, (err, book) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't find book of ${req.params.id}. ${err}`)
    } else {
      res.send(book)
    }
  })
})

// get all books information (or certain fields)
router.get('/', async (req, res) => {
  let fields = ['metadata', 'quote_ids', 'summary_ids'];
  if (req.query.metadata) {
    fields = [];
    req.query.metadata.forEach(field => {
      fields.push(`metadata.${field}`)
    })
  }
  const books = await BookModel.find().select(fields)
  res.send(books)
})

// add new book
// just contain metadata
router.post('/', async (req, res) => {
  const book = new BookModel({
    metadata: { ...req.body.metadata },
  });
  try {
    const saveBook = await book.save();
    res.send(`${saveBook._id} saved`)
  } catch (e) {
    console.log(e);
    res.send(`Oops, can't add new book. ${err}`)
  }
});

// save the book metadata field(s) modification
router.put('/:id/metadata', async (req, res) => {
  await BookModel.findByIdAndUpdate(
    req.params.id,
    { [req.body.field]: req.body.value },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        res.send(`Oops, can't update this book  ${req.body.field}. ${err}`)
      } else {
        let value = null;
        if(req.body.field === 'metadata') {
          value = data.metadata
        } else {
          const field = req.body.field.split('.')[1]
          if (field) value = data.metadata[field]
        }
        res.send({
          value
        })
      }
    })
})

// delete book(s)
router.delete('/', async (req, res) => {
  await BookModel.deleteMany({ _id: { $in: req.body.book_ids } }, async (err, removed) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't delete book(s). ${err}`)
    } else {
      res.send(req.body.book_ids)
    }
  })
})

module.exports = router;