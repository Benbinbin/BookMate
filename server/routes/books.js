const express = require('express');
const BookModel = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
  let result = []
  if (req.query.limit_field) {
    result = await BookModel.find().select(['metadata'])
  } else {
    result = await BookModel.find()
  }
  res.send(result)
})

router.get('/:id', async (req, res) => {
  const book = await BookModel.findById(req.params.id)
  res.send(book)
})

router.post('/:id/metadata/:field', async (req, res) => {
  const property = `metadata.${req.params.field}`
  await BookModel.findByIdAndUpdate(
    req.params.id,
    { [property]: req.body[req.params.field] },
    { new: true },
    (err, data) => {
      if (err) console.log(err);
      res.send({
        [req.params.field]: data.metadata[req.params.field]
      })
    })
})

router.post('/:id/metadata', async (req, res) => {
  await BookModel.findByIdAndUpdate(
    req.params.id,
    { metadata: req.body.metadata },
    { new: true },
    (err, data) => {
      if (err) console.log(err);
      res.send({
        metadata: data.metadata
      })
    })
})

router.post('/new', async (req, res) => {
  const book = new BookModel({
    metadata: { ...req.body.metadata },
    quotes: req.body.quotes || [],
    summaries: req.body.summaries || [],
  });
  try {
    const saveBook = await book.save();
    res.send(`${saveBook._id}`)
  } catch (e) {
    console.log(e);
  }
  // await console.log(req.body);
  // res.send(req.body)
});


module.exports = router;