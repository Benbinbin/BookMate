const express = require('express');
const QuoteModel = require('../models/quote');
const BookModel = require('../models/book')

const router = express.Router();

// get quote by id
router.get('/:quote_id', async (req, res) => {
  await QuoteModel.findById(req.params.quote_id, (err, quote) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't find quote of ${req.params.quote_id}. ${err}`)
    } else {
      res.send(quote)
    }
  })
})

// get quotes
router.get('/', async (req, res) => {
  let ids = [];
  if (req.query.quote_id) {
    ids.push(req.query.quote_id)
  } else if (req.query.book_id) {
    await BookModel.findById(req.query.book_id, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        ids = book.quote_ids;
      }
    })
  }

  if (ids.length > 0) {
    await QuoteModel.find(
      {
        _id: { $in: ids }
      },
      (err, quotes) => {
        if (err) {
          console.log(err);
          res.send(`Oops, can't find quote(s) of ${ids}. ${err}`)
        } else {
          res.send(quotes)
        }
      })
  } else {
    await QuoteModel.find({}, (err, quotes) => {
      if (err) {
        console.log(err);
        res.send(`Oops, can't find any quotes. ${err}`)
      } else {
        res.send(quotes)
      }
    })
  }
})

// add new quote(s)
router.post('/', async (req, res) => {
  quotes = [];
  req.body.quotes.forEach(quote => {
    quotes.push(new QuoteModel({ ...quote }))
  })
  await QuoteModel.insertMany(quotes, async (err, docs) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't add new quotes. ${err}`)
    } else {
      let doc_ids = [];
      docs.forEach(doc => {
        doc_ids.push(doc.id)
      })
      await BookModel.findByIdAndUpdate(req.body.book_id,
        {
          $addToSet: {
            quote_ids: {
              $each: doc_ids
            }
          }
        },
        {new: true},
        (err, data) => {
          if (err) {
            console.log(err);
            res.send(`Oops, can't insert quote id(s) to book. ${err}`)
          }
        })
      res.send(docs)
    }
  })
})

// save the quote field(s) modification
router.put('/:quote_id/:field', async (req, res) => {
  const field = req.params.field;

  if (field !== 'all') {
    await QuoteModel.findByIdAndUpdate(req.params.quote_id,
      {
        [field]: req.body.content,
        updated_date: Date.now()
      },
      { new: true },
      (err, quote) => {
        if (err) {
          console.log(err);
          res.send(`Oops, can't update quote. ${err}`)
        } else {
          res.send(quote)
        }
      })
  } else {
    await QuoteModel.findByIdAndUpdate(req.params.quote_id,
      {
        chapter: req.body.quote.chapter,
        location: req.body.quote.location,
        content: req.body.quote.content,
        comment: req.body.quote.comment,
        type: req.body.quote.type,
        updated_date: Date.now()
      },
      { new: true },
      (err, quote) => {
        if (err) {
          console.log(err);
          res.send(`Oops, can't update quote. ${err}`)
        } else {
          res.send(quote)
        }
      })
  }
})

// delete quote(s)
router.delete('/', async (req, res) => {
  await QuoteModel.deleteMany({ _id: { $in: req.body.quote_ids } }, async (err, removed) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't delete summaries. ${err}`)
    } else {
      // let doc_ids = [];
      // removed.forEach(doc => {
      //   doc_ids.push(doc.id)
      // })
      await BookModel.findByIdAndUpdate(req.body.book_id, {
        $pullAll: {
          quote_ids: req.body.quote_ids
        }
      })
      res.send(req.body.quote_ids)
    }
  })
})

module.exports = router;