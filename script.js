const tableData = "PeriodicTableJSON.json";
let elements;
let main;
window.addEventListener("load", (event) => {
  main = document.getElementById("elementContainer");
  fetch(tableData, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      elements = response.elements;
      //   elements.map((e) => {
      //     const card = createElementCard(e);
      //     main.appendChild(card);
      //     // console.log(e.name, e.symbol, e.number);
      //   });
    });
});

function handleChange() {
  const div = document.getElementById("strDisplay");
  const input = document.getElementById("checkStr");
  main.innerHTML = "";
  let txt = input.value;

  const symbols = [];
  for (let i = 0; i < txt.length; i++) {
    const letter = txt.charAt(i);
    const match = /[a-zA-Z]/.test(letter);
    if (letter !== letter.toUpperCase() || match === false) {
      continue;
    }

    const nextLetter = i === txt.length - 1 ? "" : txt.charAt(i + 1);

    let element; //= elements.find((e) => e.symbol === letter);
    if (nextLetter === nextLetter.toLowerCase() && nextLetter !== "") {
      element = elements.find((e) => e.symbol === letter + nextLetter);
    }

    if (element === undefined) {
      element = elements.find((e) => e.symbol === letter);
    }

    if (element === undefined) {
      continue;
    }

    symbols.push(element);
  }
  let sum = 0;
  for (let i = 0; i < symbols.length; i++) {
    const e = symbols[i];
    const s = e.symbol;
    sum += e.number;
    txt = txt.replaceAll(s, `<span class="highlighted">${s}</span>`);
    const card = createElementCard(e);
    main.appendChild(card);
  }
  const total = document.getElementById("total");
  total.innerHTML = sum;
  const remain = document.getElementById("remaining");
  const remainder = 200 - sum;
  remain.innerHTML = remainder;

  const suggest = document.getElementById("suggest");
  const elemSuggest = elements.find((e) => e.number === Math.abs(remainder));
  suggest.innerHTML = remainder > 0 ? "add " + elemSuggest.symbol : "none";
  div.innerHTML = txt;
}

function createElementCard(e) {
  const elemContainer = document.createElement("div");
  elemContainer.classList.add("element");
  elemContainer.id = e.symbol;

  const num = document.createElement("div");
  num.classList.add("number");
  num.id = e.symbol + "num";
  num.innerHTML = e.number;
  elemContainer.appendChild(num);

  const sym = document.createElement("div");
  sym.classList.add("symbol");
  sym.id = e.symbol + "sym";
  sym.innerHTML = e.symbol;
  elemContainer.appendChild(sym);

  const eName = document.createElement("div");
  eName.classList.add("name");
  eName.id = e.symbol + "sym";
  eName.innerHTML = e.name;
  elemContainer.appendChild(eName);

  const tt = document.createElement("div");
  tt.classList.add("tooltiptext");
  tt.innerHTML = e.summary;
  tt.innerHTML += `<img src="${e.image.url}" alt="${e.image.title}">`;
  elemContainer.append(tt);

  return elemContainer;
}
