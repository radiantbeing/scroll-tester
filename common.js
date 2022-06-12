(async function () {
  const res = await fetch("lorem.json");
  const result = await res.json();

  const body = QS("#loremBody");
  const loadingBar = QS("#loadingBar");
  const loadingInfo = QS("#loadingInfo");

  QS("#paragraphsNum").addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
      QS("#runBtn").click();
    }
  });

  QS("#runBtn").addEventListener("click", async (event) => {
    body.innerHTML = "";

    const paragraphsNum = QS("#paragraphsNum");
    const quantity = parseInt(paragraphsNum.value);

    if (isNaN(quantity)) {
      alert("Please enter an integer value");
      paragraphsNum.value = null;
      paragraphsNum.focus();
      return;
    }

    QS(".loading-wrapper").style.display = "block";

    const data = { text: result, quantity: quantity, body: body, loadBar: loadingBar, loadInfo: loadingInfo };

    for (let i = 0; i < quantity; i++) {
      await appendParagraph(data, i);
    }
  });
})();

function QS(selector) {
  return document.querySelector(selector);
}

async function appendParagraph(data, index) {
  setTimeout(() => {
    renewLoadBar(data.loadBar, data.loadInfo, index, data.quantity);

    const rand = Math.floor(Math.random() * 10);
    const paragraphText = index + 1 + " " + data.text[rand] + " " + data.text[rand] + " " + data.text[rand];
    const newPara = document.createElement("p");
    newPara.innerText = "\t" + paragraphText;

    data.body.appendChild(newPara);
  }, 0);

  function renewLoadBar(loadBar, loadInfo, index, quantity) {
    loadBar.style.width = `${(index / quantity) * 100}%`;
    loadInfo.textContent = `Generated paragraphs: ${index + 1}/${quantity}`;
  }
}
