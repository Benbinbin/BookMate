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

router.post('/', upload.array('cover'), (req, res) => {
  const coversArr = [];
  req.files.forEach(file => {
    coversArr.push(file.path)
  })
  // 将上传成功的文件信息响应给浏览器
  res.send(`covers: ${coversArr} uploaded`)
})

router.delete('/', (req, res) => {
  req.body.removeCovers.forEach(cover => {
    const filePath = path.join(__dirname, `../public/images/covers/${cover}`)
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        console.log(`${filePath} doesn't exist`);
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(`${filePath} cannot deleted. ${err}`);
          } else {
            console.log(`${filePath} was deleted`);
            res.send(`${cover} removed`)
          }
        });
      }
    })
  })
})

module.exports = router;