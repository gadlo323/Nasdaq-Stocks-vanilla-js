const result = document.querySelector(".list-group");
const searchVal = document.querySelector(".search-fiald");
const form = document.querySelector("#getNasdaq");
const spinar = document.querySelector(".spinner-border");
const newsPrice = document.querySelector(".stock-price");

//serach company profile bt user click on option result
let company = async (parmSymbol) => {
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${parmSymbol}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
let news = async () => {
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`
    );
    if (response.ok) {
      const data = await response.json();
      setNews(data);
    }
  } catch (err) {
    console.log(err);
  }
};
news();
//serach company bt user input
let serach = async (quary) => {
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${quary}&limit=10&exchange=NASDAQ`
    );
    if (response.ok) {
      const data = await response.json();
      setResult(data);
    } else {
      const meassage = await response.text();
      console.log(meassage);
    }
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener("submit", (e) => {
  result.innerHTML = "";
  Spinar();
  serach(searchVal.value);
  e.preventDefault();
});

//show list to user
async function setResult(arr) {
  let newarr = [];
  if (arr.length > 0) {
    for (let item of arr) {
      const compData = await company(item.symbol);
      if (Object.keys(compData).length != 0) {
        newarr.push(setElment(compData));
      }
    }
    newarr.forEach((item) => {
      result.appendChild(item);
    });
  } else {
    result.innerHTML += `
    <li class="list-group-item-action">
    No results found &#129335; !
    </li>`;
  }
  Spinar();
}

//on or off spinar
function Spinar() {
  spinar.classList.toggle("active");
}

//set the price color by the percent
function cheackPrice(Percent, element) {
  if (Percent) {
    Percent.includes("+")
      ? element.classList.add("price-green")
      : element.classList.add("price-red");
  } else {
    element.style.display = "none";
  }
}
//create elemenr li forEach result option
function setElment(compData) {
  const li = document.createElement("li");
  const aTag = document.createElement("a");
  const compImage = document.createElement("img");
  const spanTag = document.createElement("span");

  compImage.src = compData.profile.image;
  compImage.alt = `${compData.profile.companyName} Logo`;
  cheackPrice(compData.profile.changesPercentage, spanTag);
  spanTag.innerHTML = `${compData.profile.changesPercentage}`;
  aTag.innerHTML = `${compData.profile.companyName} <strong class="symbol">${compData.symbol}</strong>`;
  aTag.setAttribute("href", `./company.html?symbol=${compData.symbol}`);
  li.appendChild(compImage);
  li.appendChild(aTag);
  li.appendChild(spanTag);
  li.classList.add("list-group-item-action");
  // result.appendChild(li);
  return li;
}

function setNews(data) {
  data.forEach((item, index) => {
    if (item.price) {
      const li = document.createElement("li");
      li.innerHTML = `${item.symbol}<span>${item.price.toFixed(2)}$</span>`;
      newsPrice.appendChild(li);
    }
  });
}
