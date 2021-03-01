const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/covers')
  },
  filename: function (req, file, cb) {
    const {name, ext} = path.parse(file.originalname)
    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

var upload = multer({ storage: storage })

router.post('/', upload.array('cover_file'), (req, res) => {
  const coversArr = [];
  req.files.forEach(file => {
    coversArr.push(file.path)
  })
  // 将上传成功的文件信息响应给浏览器
  res.json(coversArr)
})

module.exports = router;