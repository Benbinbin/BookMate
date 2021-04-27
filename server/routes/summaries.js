const express = require('express');
const SummaryModel = require('../models/summary');
const BookModel = require('../models/book')

const router = express.Router();

// get summary by id
router.get('/:summary_id', async (req, res) => {
  await SummaryModel.findById(req.params.summary_id, (err, summary) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't find quote of ${req.params.summary_id}. ${err}`)
    } else {
      res.send(summary)
    }
  })
})

// get summaries
router.get('/', async (req, res) => {
  let ids = [];
  if (req.query.summary_id) {
    ids.push(req.query.summary_id)
  } else if (req.query.book_id) {
    await BookModel.findById(req.query.book_id, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        ids = book.summary_ids;
      }
    })
  }

  if (ids.length > 0) {
    await SummaryModel.find(
      {
        _id: { $in: ids }
      },
      (err, summaries) => {
        if (err) {
          console.log(err);
          res.send(`Oops, can't find summary (summaries) of ${ids}. ${err}`)
        } else {
          res.send(summaries)
        }
      })
  } else {
    await SummaryModel.find({}, (err, summaries) => {
      if (err) {
        console.log(err);
        res.send(`Oops, can't find any summaries. ${err}`)
      } else {
        res.send(summaries)
      }
    })
  }
})

// add new summary (summaries)
router.post('/', async (req, res) => {
  summaries = [];
  req.body.summaries.forEach(summary => {
    summaries.push(new SummaryModel({ ...summary }))
  })
  await SummaryModel.insertMany(summaries, async (err, docs) => {
    if (err) {
      console.log(err);
      res.send(`Oops, can't add new summaries. ${err}`)
    } else {
      let doc_ids = [];
      docs.forEach(doc => {
        doc_ids.push(doc.id)
      })
      await BookModel.findByIdAndUpdate(req.body.book_id,
        {
          $addToSet: {
            summary_ids: {
              $each: doc_ids
            }
          }
        },
        { new: true },
        (err, data) => {
          if (err) {
            console.log(err);
            res.send(`Oops, can't insert summary id(s) to book. ${err}`)
          }
        })
      res.send(docs)
    }
  })
})

// save the summary field(s) modification
router.put('/:summary_id', async (req, res) => {
  await SummaryModel.findByIdAndUpdate(req.params.summary_id,
    {
      chapter: req.body.summary.chapter,
      content: req.body.summary.content,
      updated_date: Date.now()
    },
    { new: true },
    (err, summary) => {
      if (err) {
        console.log(err);
        res.send(`Oops, can't update summary. ${err}`)
      } else {
        res.send(summary)
      }
    })
})

// delete summary (summaries)
router.delete('/', async (req, res) => {
  await SummaryModel.deleteMany({ _id: { $in: req.body.summary_ids } }, async (err, removed) => {
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
          summary_ids: req.body.summary_ids
        }
      })
      res.send(req.body.summary_ids)
    }
  })
});


module.exports = router;