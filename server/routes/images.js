const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/images/${req.params.type}`)
  },
  filename: function (req, file, cb) {
    const { name, ext } = path.parse(file.originalname)
    cb(null, `${name}${ext}`)
  }
})

var upload = multer({ storage: storage })

router.post('/:type', upload.array('image'), (req, res) => {
  const imagesArr = [];
  req.files.forEach(file => {
    imagesArr.push(file.path)
  })
  // 将上传成功的文件信息响应给浏览器
  res.json('uploaded')
})

router.delete('/:type', upload.array('image'), (req, res) => {
  req.body.removeImages.forEach(image => {
    fs.unlink(path.join(__dirname, `../public/images/${req.params.type}/${image}`), (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`${image} was deleted`);
      }
    });
  })
  res.send(`${req.body.removeCovers} removed`)
})

module.exports = router;