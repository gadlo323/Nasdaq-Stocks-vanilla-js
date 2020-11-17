class SearchForm extends SearchResult {
  constructor(form, results) {
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
    this.form.innerHTML += `  <div class="col-sm-12 d-flex flex-column content">
    <div class="chose-compare d-flex flex-wrap">
        <ul class="compares d-flex flex-wrap">
        </ul>
        <a href="Allpages/comprison.html?symbols=" class="group-chosen">Compare<small
                class="amount">0</small>Companies
        </a>
    </div>
    <div class="search-bar">
        <form id="getNasdaq">
            <input class="search-fiald" type="search" placeholder="serach" required>
            <button type="submit" id="btn-serach"><i class="fa fa-search"></i></button>
        </form>
    </div>
</div>`;
    this.createResults();
  }

  //Inherits the function from the class searchResult
  createResults() {
    super.createResults();
  }
}
