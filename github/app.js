const result = document.querySelector(".list-group");
const form = document.querySelector("#getNasdaq");
const newsPrice = document.querySelector(".stock-price");

(async function () {
  const marque = new Marquee(newsPrice);
  marque.load();
  const formSearch = new SearchForm(form);
  const results = new SearchResult(result);
  formSearch.onSubmit((companies) => {
    results.setResult(companies);
  });
})();
