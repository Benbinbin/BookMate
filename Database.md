# 数据库结构
使用 MongoDb 作为数据库，数据库的结构如图所示。


```mermaid
graph LR
  root[(BookMate)] === note[note]
  root === book[book]
  
  book --- book1(book1)
  book --- book2(book2)
  book --- book3(book3)
  
  note --- note1(note1)
  note --- note2(note2)
  note --- note3(note3)
  
  note1 --- link[[双向链接]]
  note1 --- noteContent[[内容]]
  note1 --- noteCreatedDate[[创建日期]]

  book1 ---  metadata[[书籍元数据]]
  style metadata fill: #A7F3D0
  book1 ---  quote[[书摘]]
  book1 ---  summary[[总结]]

  quote -.- quoteContent([内容])
  quote -.- comment([批注])
  quote -.- quoteCreatedDate([创建日期])
```

```mermaid
graph TD
  metadata(书籍元数据) -.- isbn([ISBN])
  metadata -.- titles([书名])
  metadata -.- date([出版日期])
  metadata -.- authors([作者])
  metadata -.- translators([译者])
  metadata -.- covers([封面链接])
  metadata -.- pagination([页数])
  metadata -.- description([描述])
  metadata -.- review([书评])
  metadata -.- tags([标签])
  metadata -.- stars([评分])
  metadata -.- sources([文件源])
  metadata -.- links([购买链接])
  metadata -.- bookCreatedData([创建日期])
  style metadata fill: #A7F3D0
```