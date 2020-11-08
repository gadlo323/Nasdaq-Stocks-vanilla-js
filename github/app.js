const result = document.querySelector(".list-group");
const searchVal = document.querySelector(".search-fiald");
const form = document.querySelector("#getNasdaq");
const spinar = document.querySelector(".spinner-border");

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

function setResult(arr) {
  if (arr.length > 0) {
    arr.forEach((item) => {
      const li = document.createElement("li");
      const aTag = document.createElement("a");
      aTag.innerHTML = `${item.name}(${item.symbol})`;
      aTag.setAttribute(
        "href",
        `/js-project-2-gadlo323/github/company.html?symbol=${item.symbol}`
      );
      li.appendChild(aTag);
      li.classList.add("list-group-item-action");
      result.appendChild(li);
    });
  }
  Spinar();
}

//on or off spinar
function Spinar() {
  spinar.classList.toggle("active");
}
