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
}
