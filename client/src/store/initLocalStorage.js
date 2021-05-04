export default function initLocalStorage() {
  if (!localStorage.getItem('shareQuotesAsImageSelectedType')) localStorage.setItem('shareQuotesAsImageSelectedType', 'default');

  if (!localStorage.getItem('shareQuoteAsImageWidth')) localStorage.setItem('shareQuoteAsImageWidth', 36);

  if (!localStorage.getItem('shareQuotesAsImageShow')) {
    localStorage.setItem('shareQuotesAsImageShow',
      JSON.stringify({
        logo: true,
        cover: true,
        comment: true,
        title: true,
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
