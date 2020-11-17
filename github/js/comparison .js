class Comparison {
  static counter = 0;
  constructor(box) {
    this.box = box;
    this.compares = document.querySelector(".compares");
    this.chosen = document.querySelector(".group-chosen");
    this.amount = document.querySelector(".amount");
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
    console.log(symbols);
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
    this.amount.innerText = ++Comparison.counter;
    this.chosen.href += `${btn.id},`;
  }

  closeClick(btn) {
    //console.log(btn)
    let symbol = btn.childNodes[0].innerText;
    this.compares.removeChild(btn);
    this.amount.innerHTML = --Comparison.counter;

    this.chosen.href = this.chosen.href.replace(symbol + ",", "");
  }

  creataCards(data) {
    data.forEach((item) => {
      console.log(item);
      this.createDiv(item);
      this.cheackPrice(item.profile.changesPercentage, item.symbol);
    });
  }

  createDiv(item) {
    box.innerHTML += `<div class="col-sm-4">
    <div class="card">
        <div class="card-body">
            <div class="top">
                <img src="${item.profile.image}" class="card-img-top" alt="${item.profile.companyName}">
                <h5 class="card-title">${item.profile.companyName}</h5>
            </div>
            <p class="card-text"><small class="text-muted price">${item.profile.price}$</small><small
                  id="${item.symbol}1" class="changesPercentage">${item.profile.changesPercentage}</small>
            </p>
            <strong class="sector">${item.profile.sector}</strong>
            <p class="card-text description">${item.profile.description}</p>
            <a class=wabCompany href="${item.profile.website}" target="_blank">Vist Company Wabsite &#127760;</a>
        </div>
       
        <canvas id="${item.symbol}" width="400" height="300"></canvas>
    </div>
</div>`;
    this.stockHistory(item);
  }
  cheackPrice(Percent, item) {
    const Percentage = document.querySelector(`#${item}1`);
    Percent.includes("+")
      ? Percentage.classList.add("price-green")
      : Percentage.classList.add("price-red");
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
