class CompanyInfo {
  constructor(container, symbol) {
    this.container = container;
    this.symbol = symbol;
  }
  //search in the api by symbol
  async load() {
    const title = document.querySelector("title");
    title.innerHTML += title;
    this.createPage();
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
    const imgTop = document.querySelector(".card-img-top");
    const cardTitle = document.querySelector(".card-title");
    const price = document.querySelector(".price");
    const Percentage = document.querySelector(".changesPercentage");
    const description = document.querySelector(".description");
    const ceo = document.querySelector(".ceo");
    const wabCompany = document.querySelector(".wabCompany");
    const sector = document.querySelector(".sector");

    imgTop.setAttribute("src", obj.profile.image);
    cardTitle.innerHTML = `${obj.profile.companyName}(${obj.symbol})`;
    this.cheackPrice(obj.profile.changesPercentage);
    price.innerHTML = `Stock price :${obj.profile.price.toFixed(2)}$`;
    Percentage.innerHTML = obj.profile.changesPercentage;
    description.innerHTML = obj.profile.description;
    sector.innerHTML = obj.profile.sector;
    ceo.innerHTML =
      obj.profile.ceo !== "None"
        ? " C.E.O " + obj.profile.ceo
        : "C.E.O " + "UNKNOWN";
    wabCompany.href = obj.profile.website;
    this.stockHistory();
  }

  cheackPrice(Percent) {
    const Percentage = document.querySelector(".changesPercentage");
    Percent.includes("+")
      ? Percentage.classList.add("price-green")
      : Percentage.classList.add("price-red");
  }

  setChart(data) {
    const ctx = document.querySelector("#myChart").getContext("2d");
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
    this.Spinner();
  }

  //on or off spinar
  Spinner() {
    let spinner = document.querySelector(".spinner-border");
    spinner.classList.toggle("active");
  }

  createPage() {
    this.container.innerHTML += `<div class="card">
    <div class="card-body">
        <div class="top">
            <img src="..." class="card-img-top" alt="...">
            <h5 class="card-title"></h5>
            <h4 class="ceo"></h4>
        </div>
        <p class="card-text"><small class="text-muted price"></small><small class="changesPercentage"></small>
        </p>
        <strong class="sector"></strong>
        <p class="card-text description"></p>
        <a class=wabCompany href="" target="_blank">Visit Company Website &#127760;</a>
    </div>
    <div class="d-flex justify-content-center">
        <div class="spinner-border active" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <canvas id="myChart" width="400" height="300"></canvas>
</div>`;
  }
}
