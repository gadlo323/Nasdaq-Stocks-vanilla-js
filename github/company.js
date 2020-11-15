const title = document.querySelector("title");
const imgtop = document.querySelector(".card-img-top");
const cardTitle = document.querySelector(".card-title");
const price = document.querySelector(".price");
const Percentage = document.querySelector(".changesPercentage");
const description = document.querySelector(".description");
const ceo = document.querySelector(".ceo");
const wabCompany = document.querySelector(".wabCompany");
const sector = document.querySelector(".sector");
const SpinnerTag = document.querySelector(".spinner-border");
const ctx = document.querySelector("#myChart").getContext("2d");

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
let company = async () => {
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${parmSymbol}`
    );
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  } catch (err) {
    console.log(err);
  }
};
let stockHistory = async () => {
  Spinner();
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${parmSymbol}?serietype=line`
    );
    if (response.ok) {
      const data = await response.json();
      setChart(data.historical);
    }
  } catch (err) {
    console.log(err);
  }
};

let parmSymbol = getUrlParameter("symbol");
title.innerHTML += parmSymbol;
company();

function setData(obj) {
  imgtop.setAttribute("src", obj.profile.image);
  cardTitle.innerHTML = `${obj.profile.companyName}(${obj.symbol})`;
  cheackPrice(obj.profile.changesPercentage);
  price.innerHTML = `Stock price :${obj.profile.price.toFixed(2)}$`;
  Percentage.innerHTML = obj.profile.changesPercentage;
  description.innerHTML = obj.profile.description;
  sector.innerHTML = obj.profile.sector;
  ceo.innerHTML =
    obj.profile.ceo !== "None"
      ? " C.E.O " + obj.profile.ceo
      : "C.E.O " + "UNKNOWN";
  wabCompany.href = obj.profile.website;
  stockHistory();
}

function cheackPrice(Percent) {
  Percent.includes("+")
    ? Percentage.classList.add("price-green")
    : Percentage.classList.add("price-red");
}

function setChart(data) {
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
          backgroundColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
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
  Spinner();
}

//on or off spinar
function Spinner() {
  SpinnerTag.classList.toggle("active");
}
