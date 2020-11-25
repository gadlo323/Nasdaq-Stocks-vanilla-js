const appandElements = (father, son) => {
  father.appendChild(son);
};

const createElement = (elementType, classname, id, classesToAdd) => {
  const element = document.createElement(elementType);
  if (id) element.setAttribute("id", id);
  element.className = classname;
  if (classesToAdd) element.classList.add(...classesToAdd);
  return element;
};

let btnPresa = async (btn) => {
  const compare = new Comparison();
  compare.comparClick(btn);
};

let closeClick = (compBtn) => {
  const compare = new Comparison();
  compare.closeClick(compBtn);
};
