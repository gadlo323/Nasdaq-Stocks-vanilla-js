class Marquee {
  constructor(element, footer) {
    this.element = element;
    this.footer = document.getElementById("footer");
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
          .getElementById("stock")
          .appendChild(this.createElement(item.symbol, item.price));
    }
  }

  createMarquee() {
    let divMarquee = createElement("div", "news", null, ["col-sm-12"]);
    let ulTag = createElement("ul", "stock-price", "stock", null);
    appandElements(divMarquee, ulTag);
    appandElements(this.element, divMarquee);
    this.createFooter();
  }
  createFooter() {
    let divFooter = createElement("footer", "col-sm-12", null, ["footer"]);
    appandElements(divFooter, this.leftFoot());
    appandElements(divFooter, this.rightFoot());
    appandElements(this.footer, divFooter);
  }

  leftFoot() {
    let divCol6 = createElement("div", "col-sm-6", null, null);
    let h2Tag = createElement("h2", null, null, null);
    h2Tag.textContent = "Isayas Gadlo &copy; 2020";
    appandElements(divCol6, h2Tag);
    return divCol6;
  }

  rightFoot(liItems) {
    let divBottom = createElement("div", "col-sm-6", null, null);
    let ulTag = createElement("ul", "links", null, [
      "d-flex",
      "justify-content-between",
    ]);
    appandElements(divBottom, this.createLi(ulTag));
    return divBottom;
  }

  createLi(ulTag) {
    let liTag1 = createElement("li", null, null, null);
    let spanTag = createElement("span", null, null, null);
    appandElements(liTag1, spanTag);
    appandElements(ulTag, liTag1);

    let liTag2 = createElement("li", null, null, null);
    let aTag = createElement("a", null, null, null);
    aTag.href = "https://github.com/gadlo323";
    let iTag = createElement("i", "fa", null, ["fa-github"]);
    appandElements(liTag2, aTag);
    appandElements(liTag2, iTag);
    appandElements(ulTag, liTag2);

    let liTag3 = createElement("li", null, null, null);
    let aTag3 = createElement("a", null, null, null);
    aTag3.href = "https://github.com/gadlo323";
    let iTag3 = createElement("i", "fa", null, ["fa-github"]);
    appandElements(liTag3, aTag3);
    appandElements(liTag3, iTag3);
    appandElements(ulTag, liTag3);
    return ulTag;
  }
}
