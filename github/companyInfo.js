class CompanyInfo {
  constructor(symbol) {
    this.title = document.querySelector("title");
    this.symbol = symbol;
    this.imgTop = document.querySelector(".card-img-top");
    this.cardTitle = document.querySelector(".card-title");
    this.price = document.querySelector(".price");
    this.Percentage = document.querySelector(".changesPercentage");
    this.description = document.querySelector(".description");
    this.ceo = document.querySelector(".ceo");
    this.wabCompany = document.querySelector(".wabCompany");
    this.sector = document.querySelector(".sector");
    this.SpinnerTag = document.querySelector(".spinner-border");
    this.ctx = document.querySelector("#myChart").getContext("2d");
  }
  //search in the api by symbol
  async load() {
    try {
      this.title.innerHTML += this.symbol;
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`
      );
      if (response.ok) {
        const data = await response.json();
        this.setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  //search in the api stockHistory by symbol
  async stockHistory() {
    this.Spinner();
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}?serietype=line`
      );
      if (response.ok) {
        const data = await response.json();
        this.setChart(data.historical);
      }
    } catch (err) {
      console.log(err);
    }
  }
  setData(obj) {
    this.imgTop.setAttribute("src", obj.profile.image);
    this.cardTitle.innerHTML = `${obj.profile.companyName}(${obj.symbol})`;
    this.cheackPrice(obj.profile.changesPercentage);
    this.price.innerHTML = `Stock price :${obj.profile.price.toFixed(2)}$`;
    this.Percentage.innerHTML = obj.profile.changesPercentage;
    this.description.innerHTML = obj.profile.description;
    this.sector.innerHTML = obj.profile.sector;
    this.ceo.innerHTML =
      obj.profile.ceo !== "None"
        ? " C.E.O " + obj.profile.ceo
        : "C.E.O " + "UNKNOWN";
    this.wabCompany.href = obj.profile.website;
    this.stockHistory();
  }

  cheackPrice(Percent) {
    Percent.includes("+")
      ? this.Percentage.classList.add("price-green")
      : this.Percentage.classList.add("price-red");
  }

  setChart(data) {
    const lables = data.map((item) => item.date);
    const points = data.map((item) => item.close);
    const myChart = new Chart(this.ctx, {
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
    this.Spinner();
  }

  //on or off spinar
  Spinner() {
    this.SpinnerTag.classList.toggle("active");
  }
}
