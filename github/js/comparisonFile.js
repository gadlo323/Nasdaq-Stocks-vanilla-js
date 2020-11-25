const box = document.querySelector(".container-fluid");

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let symbols = getUrlParameter("symbols");
let arrSymbols = symbols.split(",").slice(0, -1);

const compare = new Comparison(box);
compare.getProfiles(arrSymbols);
