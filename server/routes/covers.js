const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/covers')
  },
  filename: function (req, file, cb) {
    const { name, ext } = path.parse(file.originalname)
    cb(null, `${name}${ext}`)
  }
})

var upload = multer({ storage: storage })

router.post('/add', upload.array('cover'), (req, res) => {
  const coversArr = [];
  req.files.forEach(file => {
    coversArr.push(file.path)
  })
  // 将上传成功的文件信息响应给浏览器
  res.json(coversArr)
})

router.post('/remove', upload.array('cover'), (req, res) => {

  req.body.removeCovers.forEach(cover => {
    fs.unlink(path.join(__dirname,`../public/images/covers/${cover}`), (err) => {
      if (err) throw err;
      console.log(`./public/images/covers/${cover} was deleted`);
    });
  })
  res.send(`${req.body.removeCovers} removed`)
})

module.exports = router;