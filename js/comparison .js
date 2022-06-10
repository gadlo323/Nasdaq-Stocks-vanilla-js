class Comparison {
  static counter = 0;
  constructor(box) {
    this.box = box;
    this.compares = document.querySelector(".compares");
    this.chosen = document.querySelector(".group-chosen");
  }
  async stockHistory(company) {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${company.symbol}?serietype=line`
      );
      if (response.ok) {
        const data = await response.json();
        this.setChart(data.historical, company);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getProfiles(symbols) {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbols[0]},${symbols[1]},${symbols[2]}`
      );
      if (response.ok) {
        const data = await response.json();
        this.creataCards(data.companyProfiles);
      }
    } catch (err) {
      console.log(err);
    }
  }
  comparClick(btn) {
    let amount = document.querySelector(".amount");
    const btnCompare = document.createElement("button");
    btnCompare.innerHTML = btn.id;
    btnCompare.className = "btn btn-primary";
    const li = document.createElement("li");
    const i = document.createElement("i");
    li.classList.add("p-4");
    i.classList.add("fa", "fa-times");
    li.setAttribute("onclick", "closeClick(this);");
    btnCompare.appendChild(i);
    li.appendChild(btnCompare);
    this.compares.appendChild(li);
    amount.innerText = ++Comparison.counter;
    this.chosen.href += `${btn.id},`;
  }

  closeClick(btn) {
    let amount = document.querySelector(".amount");
    let symbol = btn.childNodes[0].innerText;
    this.compares.removeChild(btn);
    amount.innerText = --Comparison.counter;

    this.chosen.href = this.chosen.href.replace(symbol + ",", "");
  }

  creataCards(data) {
    let rowDiv = createElement("div", "row", null, ["box"]);
    data.forEach((item) => {
      appandElements(rowDiv, this.createCard(rowDiv, item));
      this.cheackPrice(item.profile.changesPercentage, item.symbol);
    });
    appandElements(this.box, rowDiv);
  }

  createCard(rowDiv, item) {
    let colDiv = createElement("div", "col-sm-4", null, null);
    appandElements(rowDiv, colDiv);
    let cardDiv = createElement("div", "card", null, null);
    appandElements(colDiv, cardDiv);
    appandElements(cardDiv, this.bodyCard(item));

    let canvsTag = createElement("canvas", null, item.symbol, null);
    canvsTag.setAttribute("width", "400");
    canvsTag.setAttribute("height", "300");
    appandElements(cardDiv, canvsTag);
    this.stockHistory(item);
    return colDiv;
  }

  bodyCard(item) {
    let BodyDiv = createElement("div", "card-body", null, null);
    let topDiv = createElement("div", "top", null, null);
    let imgTag = createElement("img", "card-img-top", null, null);
    imgTag.src = item.profile.image;
    imgTag.alt = item.profile.companyName;
    appandElements(topDiv, imgTag);
    let h5Tag = createElement("h5", "card-title");
    h5Tag.textContent = item.profile.companyName;
    appandElements(BodyDiv, topDiv);
    appandElements(BodyDiv, this.bootmCard(item));
    return BodyDiv;
  }

  bootmCard(item) {
    let bootomDiv = createElement("div", "bootom", null, null);
    let pTag = createElement("p", "card-text");
    let priceTag = createElement("small", "price", 0, ["text-muted"]);
    priceTag.textContent = `${item.profile.price}$`;
    appandElements(pTag, priceTag);

    let PercentageSmall = createElement(
      "small",
      "changesPercentage",
      item.symbol + "1",
      null
    );

    PercentageSmall.textContent = `${item.profile.changesPercentage}$`;
    appandElements(pTag, PercentageSmall);
    appandElements(bootomDiv, pTag);

    let strongTag = createElement("strong", "sector", null, null);
    strongTag.textContent = item.profile.sector;
    appandElements(bootomDiv, strongTag);

    let description = createElement("p", "card-text", null, ["description"]);
    description.textContent = item.profile.description;
    appandElements(bootomDiv, description);

    let webUrl = createElement("a", "wabCompany", null, null);
    webUrl.href = item.profile.website;
    webUrl.setAttribute("target", "_blank");
    webUrl.textContent = "Visit Company Website &#127760;";
    appandElements(bootomDiv, webUrl);
    return bootomDiv;
  }

  cheackPrice(Percent, item) {
    setTimeout(() => {
      const Percentage = document.querySelector(`#${item}1`);
      Percent.includes("+")
        ? Percentage.classList.add("price-green")
        : Percentage.classList.add("price-red");
    }, 1000);
  }
  setChart(data, company) {
    const ctx = document.querySelector(`#${company.symbol}`).getContext("2d");
    const lables = data.map((item) => item.date);
    const points = data.map((item) => item.close);
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: lables,
        datasets: [
          {
            label: "stock Price History",
            data: points,
            backgroundColor: [
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 15,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 15,
                fontColor: "white",
              },
            },
          ],
        },
      },
    });
  }
}
