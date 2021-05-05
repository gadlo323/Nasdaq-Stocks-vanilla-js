class SearchForm extends SearchResult {
  constructor(form) {
    super(results);
    this.form = form;
  }

  //serach companys by user input
  async onSearch(query) {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const message = await response.text();
        console.log(message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit(companies) {
    let listResults = document.querySelector(".list-group");
    let formID = document.querySelector("#getNasdaq");
    let searchValue = document.querySelector(".search-fiald");
    formID.addEventListener("submit", async (e) => {
      e.preventDefault();
      listResults.innerHTML = " ";
      const data = await this.onSearch(searchValue.value);
      return companies(data);
    });
  }

  onChange(dataChange) {
    let listResults = document.querySelector(".list-group");
    let searchValue = document.querySelector(".search-fiald");
    searchValue.addEventListener(
      "keypress",
      this.debounse(async (e) => {
        listResults.innerHTML = " ";
        const data = await this.onSearch(e.target.value);
        //add the serachValue to the url..
        history.pushState(null, null, `?query=${searchValue.value}`);
        return dataChange(data);
      }, 1000)
    );
  }

  // https://youtu.be/B1P3GFa7jVc
  debounse(fn, deley) {
    let timeoutID;
    return function (args) {
      if (timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(args);
      }, deley);
    };
  }

  onPageLoad() {
    this.createForm();
    let searchValue = document.querySelector(".search-fiald");
    let parmSymbol = this.getUrlParameter("query");
    if (parmSymbol) searchValue.value = parmSymbol;
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  createForm() {
    let contaentDiv = createElement("div", "content", null, [
      "col-sm-12",
      "d-flex",
      "flex-column",
    ]);
    this.createTopForm(contaentDiv);
    this.createBottomForm(contaentDiv);
    this.createResults();
  }

  //create the bootom part in the form Div1
  createBottomForm(contaentDiv) {
    let serachDiv = createElement("div", "search-bar", null, null);
    appandElements(contaentDiv, serachDiv);
    let formTag = createElement("form", null, "getNasdaq", null);
    appandElements(serachDiv, formTag);
    let inputTag = createElement("input", "search-fiald");
    inputTag.setAttribute("placeholder", "serach");
    inputTag.setAttribute("required", true);
    appandElements(formTag, inputTag);
    let btnSearch = createElement("button", null, "btn-serach", null);
    btnSearch.setAttribute("type", "submit");
    let iTag = createElement("i", "fa", null, ["fa-search"]);
    appandElements(btnSearch, iTag);
    appandElements(formTag, btnSearch);
  }
  //create the top part in the form Div2
  createTopForm(contaentDiv) {
    appandElements(this.form, contaentDiv);
    let compareDiv = createElement("div", "chose-compare", null, [
      "d-flex",
      "flex-wrap",
    ]);
    appandElements(contaentDiv, compareDiv);
    let ulTag = createElement("ul", "compares", null, ["d-flex", "flex-wrap"]);
    appandElements(compareDiv, ulTag);
    let aTag = createElement("a", "group-chosen", null, null);
    aTag.href = "Allpages/comprison.html?symbols=";
    aTag.textContent = "Compare";
    appandElements(compareDiv, aTag);
    let smallTag = createElement("small", "amount", null, null);
    smallTag.textContent = " 0 ";
    appandElements(aTag, smallTag);
    aTag.insertAdjacentText("beforeend", "Companies");
  }

  //Inherits the function from the class searchResult
  createResults() {
    super.createResults();
  }
}
