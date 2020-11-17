const resultTag = document.querySelector(".results");
const formTag = document.querySelector(".form");
const MarqueeTag = document.querySelector(".Marquee");
const footer = document.querySelector(".foot");
(async function () {
  const marque = new Marquee(MarqueeTag, footer);
  marque.load();
  const formSearch = new SearchForm(formTag, resultTag);
  const results = new SearchResult(resultTag);
  formSearch.onPageLoad();
  formSearch.onSubmit((companies) => {
    results.setResult(companies);
  });
  formSearch.onChange((dataChange) => {
    results.setResult(dataChange);
  });
})();

let btnPresa = async (btn) => {
  const compare = new Comparison();
  compare.comparClick(btn);
};

let closeClick = (compBtn) => {
  const compare = new Comparison();
  compare.closeClick(compBtn);
};
