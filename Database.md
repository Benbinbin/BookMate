# 数据库结构
使用 MongoDb 作为数据库，数据库的结构如图所示。


```mermaid
graph LR
  root(数据库) === notes[(notes)]
  root === book[(book)]

  notes --- link[[双向链接]]
  notes --- noteContent[[内容]]
  notes --- noteCreatedDate[[创建日期]]

  book ---  metadata[[书籍元数据]]
  style metadata fill: #A7F3D0
  book ---  quote[[书摘]]
  book ---  summary[[总结]]

  quote -.- quoteContent([内容])
  quote -.- comment([批注])
  quote -.- quoteCreatedDate([创建日期])
```
```mermaid
graph TD
  metadata(书籍元数据) -.- isbn([ISBN])
  style metadata fill: #A7F3D0
  metadata -.- date([出版日期])
  metadata -.- author([作者])
  metadata -.- translator([译者])
  metadata -.- cover([封面链接])
  metadata -.- description([描述])
  metadata -.- review([书评])
  metadata -.- tags([标签])
  metadata -.- star([评分])
  metadata -.- source([文件源])
  metadata -.- shop([购买链接])
  metadata -.- bookCreatedData([创建日期])
```