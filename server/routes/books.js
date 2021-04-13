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
        if (req.body.quotes.length === 1) {
          const newQuote = data.quotes[data.quotes.length - 1]
          res.send({
            quote: newQuote
          })
        } else {
          res.send({
            quotes: data.quotes
          })
        }
      }
    })
})

router.post('/:id/quotes/delete', async (req, res) => {
  BookModel.findOneAndUpdate({
    _id: req.params.id
  },
    {
      $pull: {
        quotes: {
          _id: req.body.quote_id
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
          quote_id: req.body.quote_id
        })
      }
    })
})

router.post('/:id/quotes/:quote_id/:field', async (req, res) => {
  let field = '';
  if (req.params.field === 'content_origin') {
    field = 'contentOrigin';
  } else if (req.params.field === 'comment_origin') {
    field = 'commentOrigin'
  } else {
    field = req.params.field;
  }

  if (field !== 'all') {
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
  } else {
    BookModel.findOneAndUpdate({
      _id: req.params.id,
      "quotes._id": req.params.quote_id
    },
      {
        $set: {
          "quotes.$.chapter": req.body.quote.chapter,
          "quotes.$.location": req.body.quote.location,
          "quotes.$.content": req.body.quote.content,
          "quotes.$.comment": req.body.quote.comment,
          "quotes.$.type": req.body.quote.type,
          "quotes.$.updatedDate": Date.now()
        }
      },
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
            quote
          })
        }
      })
  }
})

router.post('/:id/summaries/new', async (req, res) => {
  BookModel.findOneAndUpdate({
    _id: req.params.id
  },
    {
      $push: {
        summaries: {
          $each: req.body.summaries
        }
      }
    },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        if (req.body.summaries.length === 1) {
          const newSummary = data.summaries[data.summaries.length - 1]
          res.send({
            summary: newSummary
          })
        } else {
          res.send({
            summaries: data.summaries
          })
        }
      }
    })
})

router.post('/:id/summaries/delete', async (req, res) => {
  BookModel.findOneAndUpdate({
    _id: req.params.id
  },
    {
      $pull: {
        summaries: {
          _id: req.body.summary_id
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
          summary_id: req.body.summary_id
        })
      }
    })
})

router.post('/:id/summaries/:summary_id', async (req, res) => {
    BookModel.findOneAndUpdate({
      _id: req.params.id,
      "summaries._id": req.params.summary_id
    },
      {
        $set: {
          "summaries.$.chapter": req.body.summary.chapter,
          "summaries.$.content": req.body.summary.content,
          "summaries.$.updatedDate": Date.now()
        }
      },
      { new: true },
      (err, data) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const summary = data.summaries.find((item) => {
            return item.id === req.params.summary_id
          })
          res.send({
            summary
          })
        }
      })

})



module.exports = router;