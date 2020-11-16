class SearchResult {
  constructor(results) {
    this.results = results;
    this.spinar = document.querySelector(".spinner-border");
    this.searchVal = document.querySelector(".search-fiald");
  }
  //serach company profile bt user click on option result
  async company(parmSymbol) {
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
  }
  //show list to user
  async setResult(arr) {
    this.results.innerHTML = "";
    this.Spinner();
    let newarr = [];
    if (arr.length > 0) {
      for (let item of arr) {
        const compData = await this.company(item.symbol);

        if (Object.keys(compData).length > 0 && compData != "undefined") {
          newarr.push(this.setElment(compData));
        }
      }
      newarr.forEach((item) => {
        this.results.appendChild(item);
      });
    } else {
      this.results.innerHTML += `
      <li class="list-group-item-action">
      No results found &#129335; !
      </li>`;
    }
    this.Spinner();
  }

  //create elemenr li forEach result option
  setElment(compData) {
    const li = document.createElement("li");
    const aTag = document.createElement("a");
    const compImage = document.createElement("img");
    const spanTag = document.createElement("span");
    const btnCompare = document.createElement("button");

    compImage.src = compData.profile.image;
    compImage.alt = `${compData.profile.companyName} Logo`;
    this.cheackPrice(compData.profile.changesPercentage, spanTag);
    spanTag.innerHTML = `${compData.profile.changesPercentage}`;
    aTag.innerHTML = `${compData.profile.companyName} <strong>${compData.symbol}</strong>`;
    aTag.innerHTML = aTag.innerHTML.replace(
      this.searchVal.value,
      `<span class="background">${this.searchVal.value}</span>`
    );
    btnCompare.setAttribute("id", compData.symbol);
    btnCompare.setAttribute("type", "button");
    btnCompare.setAttribute("onclick", "btnPresa(this);");
    btnCompare.className = "btn btn-primary";
    btnCompare.innerHTML = "Compare";
    aTag.setAttribute("href", `./company.html?symbol=${compData.symbol}`);
    li.appendChild(compImage);
    li.appendChild(aTag);
    li.appendChild(spanTag);
    li.appendChild(btnCompare);
    li.classList.add("list-group-item-action");
    // result.appendChild(li);
    return li;
  }

  //set the price color by the percent
  cheackPrice(Percent, element) {
    if (Percent) {
      Percent.includes("+")
        ? element.classList.add("price-green")
        : element.classList.add("price-red");
    } else {
      element.style.display = "none";
    }
  }

  //on or off spinar
  Spinner() {
    this.spinar.classList.toggle("active");
  }
}
