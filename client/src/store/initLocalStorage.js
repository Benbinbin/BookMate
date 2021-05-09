export default function initLocalStorage() {
  if (!localStorage.getItem('shareQuoteAsImageType')) localStorage.setItem('shareQuoteAsImageType', 'default');
  if (!localStorage.getItem('shareQuotesAsImageType')) localStorage.setItem('shareQuotesAsImageType', 'default');

  if (!localStorage.getItem('shareQuotesAsImageCols')) localStorage.setItem('shareQuotesAsImageCols', 3);

  if (!localStorage.getItem('shareQuoteAsImageWidth')) localStorage.setItem('shareQuoteAsImageWidth', 36);
  if (!localStorage.getItem('shareQuotesAsImageWidth')) localStorage.setItem('shareQuotesAsImageWidth', 25);

  if (!localStorage.getItem('shareQuoteAsImageShow')) {
    localStorage.setItem('shareQuoteAsImageShow',
      JSON.stringify({
        logo: true,
        cover: true,
        comment: true,
        title: true,
        chapter: true,
        location: true,
      }));
  }

  if (!localStorage.getItem('shareQuotesAsImageLayout')) {
    localStorage.setItem('shareQuotesAsImageLayout', 'masonry');
  }
  if (!localStorage.getItem('shareQuotesAsImageShow')) {
    localStorage.setItem('shareQuotesAsImageShow',
      JSON.stringify({
        layout: 'masonry',
        metadata: true,
        title: true,
        cover: true,
        authors: true,
        translators: true,
        isbn: true,
        logo: true,
        comment: true,
        chapterType: 'heading',
        chapter: true,
        location: true,
      }));
  }

  if (!localStorage.getItem('shareQuotesAsMarkdownShow')) {
    localStorage.setItem('shareQuotesAsMarkdownShow',
      JSON.stringify({
        blockquote: true,
        cover: false,
        comment: true,
        location: true,
        chapter: true,
        chapterType: 'heading',
      }));
  }
  if (!localStorage.getItem('shareQuotesAsJsonShow')) {
    localStorage.setItem('shareQuotesAsJsonShow',
      JSON.stringify({
        // _id: true,
        // book: true,
        title: true,
        // chapter: true,
        // location: true,
        // content: true,
        // content_origin: true,
        content_rendered: true,
        // comment: true,
        // comment_origin: true,
        comment_rendered: true,
        // tags: true,
        // type: true,
        // summary_links: true,
        // note_links: true,
        // created_date: true,
        // updated_date: true,
      }));
  }
}
