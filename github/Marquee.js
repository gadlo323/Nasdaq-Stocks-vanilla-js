class Marquee {
  constructor(element) {
    this.element = element;
  }

  async load() {
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
        this.element.appendChild(this.createElement(item.symbol, item.price));
    }
  }
}
