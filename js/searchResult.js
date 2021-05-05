class SearchResult {
  constructor(results) {
    this.results = results;
  }

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
    let resultList = document.querySelector(".list-group");
    this.Spinner();
    let newarr = [];
    if (arr.length > 0) {
      for (let item of arr) {
        const compData = await this.company(item.symbol);
        if (compData != null) {
          if (Object.keys(compData).length > 0) {
            newarr.push(this.setElment(compData));
          }
        }
      }
      newarr.forEach((item) => {
        resultList.appendChild(item);
      });
    } else {
      resultList.innerHTML += `
      <li class="list-group-item-action">
      No results found &#129335; !
      </li>`;
    }
    this.Spinner();
  }

  //create elemens li forEach result option
  setElment(compData) {
    let searchValue = document.querySelector(".search-fiald");
    const li = document.createElement("li");
    const aTag = document.createElement("a");
    const compImage = document.createElement("img");
    const spanTag = document.createElement("span");
    const btnCompare = document.createElement("button");

    return this.DataToElemeant(
      searchValue,
      li,
      aTag,
      compImage,
      spanTag,
      btnCompare,
      compData
    );
  }
  //set the data inside the html Elements
  DataToElemeant(
    searchValue,
    li,
    aTag,
    compImage,
    spanTag,
    btnCompare,
    compData
  ) {
    compImage.src = compData.profile.image;
    compImage.alt = `${compData.profile.companyName} Logo`;
    this.cheackPrice(compData.profile.changesPercentage, spanTag);
    spanTag.innerHTML = `${compData.profile.changesPercentage}`;
    aTag.innerHTML = `${compData.profile.companyName} <strong>${compData.symbol}</strong>`;
    aTag.innerHTML = aTag.innerHTML.replace(
      searchValue.value.toUpperCase(),
      `<span class="background">${searchValue.value.toUpperCase()}</span>`
    );
    btnCompare.setAttribute("id", compData.symbol);
    btnCompare.setAttribute("type", "button");
    btnCompare.setAttribute("onclick", "btnPresa(this);");
    btnCompare.className = "btn btn-primary";
    btnCompare.innerHTML = "Compare";
    aTag.setAttribute(
      "href",
      `./Allpages/company.html?symbol=${compData.symbol}`
    );
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
    let spinner = document.querySelector(".spinner-border");

    spinner.classList.toggle("active");
  }
  createResults() {
    this.results.innerHTML += ` <div class="col-sm-6 result">
    <div class="d-flex justify-content-center">
        <div class="spinner-border active" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div class="result-list">
        <ul class="list-group list-group-flush">

        </ul>
    </div>
</div>
<div class="right-side col-sm-6 d-flex flex-column align-items-center">
    <div class="text d-flex flex-column align-items-center">
        <h1>Search Nasdaq Stocks</h1>
        <em>"Rule No.1: Never lose money. Rule No.2: Never forget rule No.1"</em>
        <small>Warren Buffett</small>
    </div>
    <img class="img-side" src="img//imageedit_1_3150470391.png" alt="">
</div>`;
  }
}
