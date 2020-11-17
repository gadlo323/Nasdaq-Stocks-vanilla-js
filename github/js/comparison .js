class Comparison {
  static counter = 0;
  constructor() {
    this.compares = document.querySelector(".compares");
    this.chosen = document.querySelector(".group-chosen");
    this.amount = document.querySelector(".amount");
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
}
