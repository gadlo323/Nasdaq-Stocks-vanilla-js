class SearchForm {
  constructor(form) {
    this.form = form;
    this.searchVal = document.querySelector(".search-fiald");
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
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = await this.onSearch(this.searchVal.value);
      return companies(data);
    });
  }
}
