class Marquee {
  constructor(element, footer) {
    this.element = element;
    this.footer = footer;
  }

  async load() {
    this.createMarquee();
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`
      );
      if (response.ok) {
        const data = await response.json();
        this.setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  createElement(symbol, price) {
    const li = document.createElement("li");
    li.innerHTML = `${symbol}<span>${price.toFixed(2)}$</span>`;
    return li;
  }

  setData(data) {
    for (let item of data) {
      if (item.price)
        document
          .querySelector(".stock-price")
          .appendChild(this.createElement(item.symbol, item.price));
    }
  }

  createMarquee() {
    this.element.innerHTML += ` <div class="news col-sm-12">
    <ul class="stock-price">

    </ul>
</div>`;
    this.createFooter();
  }
  createFooter() {
    this.footer.innerHTML += ` <footer class="col-sm-12 footer">
    <div class="col-sm-6">
        <h2>Isayas Gadlo &copy; 2020</h2>
    </div>
    <div class="col-sm-6">
        <ul class="links d-flex justify-content-between">
            <li> <span>Search Nasdaq Stocks</span> </li>
            <li><a href="#"><i class="fa fa-github "></i></a></li>
            <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
        </ul>
    </div>
</footer>`;
  }
}
