(async function () {
  const res = await fetch("lorem.json");
  const result = await res.json();

  const quantity = 1000;
  const body = QS("#loremBody");
  const loadingBar = QS("#loadingBar");
  const loadingInfo = QS("#loadingInfo");

  const data = { text: result, quantity: quantity, body: body, loadBar: loadingBar, loadInfo: loadingInfo };

  for (let i = 0; i < quantity; i++) {
    await appendParagraph(data, i);
  }
})();

function QS(selector) {
  return document.querySelector(selector);
}

function createEl(name) {
  return document.createElement(name);
}

async function appendParagraph(data, index) {
  setTimeout(() => {
    data.loadBar.style.width = `${(index / data.quantity) * 100}%`;
    data.loadInfo.textContent = `Generated paragraph: ${index + 1}/${data.quantity}`;

    const rand = Math.round(Math.random() * 8) + 1;
    const paragraphText = data.text[rand] + " " + data.text[rand] + " " + data.text[rand];
    const newPara = createEl("p");
    newPara.innerText = "\t" + paragraphText;

    data.body.appendChild(newPara);
  }, 0);
}
