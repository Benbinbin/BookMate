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
});

router.post('/:id/quotes/:quote_id/:field', async (req, res) => {
  let field = '';
  if (req.params.field === 'content_origin') {
    field = 'contentOrigin';
  } else if (req.params.field === 'comment_origin') {
    field = 'commentOrigin'
  } else {
    field = req.params.field;
  }

  BookModel.findOneAndUpdate({
    _id: req.params.id,
    "quotes._id": req.params.quote_id
  },
    { $set: { [`quotes.$.${field}`]: req.body.content } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const quote = data.quotes.find((item) => {
          return item.id === req.params.quote_id
        })
        res.send({
          [req.params.field]: quote[field]
        })
      }
    })
})

router.post('/:id/quotes/new', async (req, res) => {

  BookModel.findOneAndUpdate({
    _id: req.params.id
  },
  {
    $push: {
      quotes: {
        $each: req.body.quotes
      }
    }
  },
  { new: true },
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send({
        quotes: data.quotes
      })
    }
  })
})


module.exports = router;