# 书摘

## 添加书摘

### 批量导入 [:movie_camera:](https://user-images.githubusercontent.com/40909550/120364983-7a2c9f00-c340-11eb-86c6-b5d432b869c8.mp4) [:tv:](https://www.bilibili.com/video/BV1sv411V7tE?p=5)
从相应的阅读应用中批量导入书摘

1. 在阅读应用中导出书摘
2. 在 BookMate 「书籍页面」 中，点击 「书摘」 栏目右上角的汉堡菜单（三等号）按钮
3. 在弹出框中 「批量导入书摘」 条目下，选择相应的阅读应用
4. 在弹出框中依照提示操作导入书摘

![import quotes](../assets/images/screenshots/import_quotes.png)

:bulb: 为了避免导入重复的书摘，所以会基于文本将待导入的书摘与已导入到数据库中的书摘进行比对，完全相同（`100%` 相似度）的书摘无法导入，而其他相似度的书摘可执行不同的操作：

![conflict quotes](../assets/images/screenshots/conflict_quotes.png)

* **合并**：保留（相似的）待导入和已导入的书摘里所有文本，包括相同和不同的部分
* **覆盖**：用（相似的）待导入的书摘替换已导入的书摘
* **导入**：直接导入（相似的）待导入的书摘

### 手动添加 [:movie_camera:](https://user-images.githubusercontent.com/40909550/120364997-7e58bc80-c340-11eb-9810-70268a1b173a.mp4) [:tv:](https://www.bilibili.com/video/BV1sv411V7tE?p=6)
* 在 「书籍页面」 中点击 「书摘」 栏目左上角的 「+」 按钮可以添加一篇书摘
* 如果当前书摘的 「书摘展示模式」 是 「按章节分类书摘」，则在 「书摘」 栏目章节左侧会有加号按钮，也可以用来新增书摘

![add quote](../assets/images/screenshots/add_quote.png)

## 浏览书摘 [:movie_camera:](https://user-images.githubusercontent.com/40909550/120365048-8fa1c900-c340-11eb-9a34-8d989dc4f23b.mp4) [:tv:](https://www.bilibili.com/video/BV1sv411V7tE?p=7)
书摘的浏览和展示有几种模式，可以点击 「书摘」 栏目右上角的汉堡菜单（三等号）按钮，在弹出框中进行设置

* **按照章节分类书摘**：在该模式下，如果书籍有目录数据，可以作为书摘分类导航
* **并列排布书摘**：最多支持每行展示 5 篇书摘
* **书摘排序方式**：支持按页码/按更新时间顺序/倒序排列

![show quotes](../assets/images/screenshots/show_quotes.png)

## 编辑书摘
点击书摘卡片右下角的编辑图标，启动书摘的编辑模式，可以编辑书摘内容和相应的 「评论」 内容。

![edit quote](../assets/images/screenshots/edit_quote.png)

:bulb: 书摘的 「评论」 作为对当前书摘的笔记，如果书摘没有 「评论」，可以点击书摘卡片右下角的 「+」 图标按钮进行添加。

书摘内容支持富文本：

* 标题 1~6 级
* 粗体
* 斜体
* 引用
* 无序列表
* 有序列表
* 代码（行内代码、代码块）
* 数学公式（[KaTex](https://katex.org/) 行内公式、行间公式）
* 图片
* 链接

输入支持部分常见 Markdown 快捷键：

* `# 一级标题`、`###### 六级标题`
* `**粗体**`
* `*斜体*`
* `* 无序列表项`
* `1. 有序列表项`
* `> 引用内容`
* \`行间代码\`
* \```代码块\```
* `$行间公式$`
* `$$$$` 触发行间数学公式输入框
* `![图片标题](图片链接)`

## 删除书摘 [:movie_camera:](https://user-images.githubusercontent.com/40909550/120365078-9597aa00-c340-11eb-979c-6a282f429ac6.mp4) [:tv:](https://www.bilibili.com/video/BV1sv411V7tE?p=8)
* **删除单篇书摘**：点击书摘卡片右上角的红色删除图标，会弹出框询问是否删除当前书摘。
* **删除当前书籍的全部书摘**：点击 「书摘」 栏目右上角的汉堡菜单（三等号）按钮，在弹出框中 「删除书摘」 条目下，点击红色删除图标，会弹出框询问是否删除当前所有书摘。

![delete qutoes](../assets/images/screenshots/delete_quotes.png)