function QS(selector) {
  return document.querySelector(selector);
}

const body = QS("#loremBody");

async function appendParagraph(data, index) {
  setTimeout(() => {
    renewLoadBar(data.loadBar, data.loadInfo, index, data.quantity);

    const rand = Math.floor(Math.random() * 10);
    const paragraphText =
      index +
      1 +
      " " +
      data.text[rand] +
      " " +
      data.text[rand] +
      " " +
      data.text[rand];
    const newPara = document.createElement("p");
    newPara.innerText = "\t" + paragraphText;

    data.body.appendChild(newPara);
  }, 0);
}

function renewLoadBar(loadBar, loadInfo, index, quantity) {
  console.log(index, quantity);
  loadBar.style.width = `${((index + 1) / quantity) * 100}%`;
  console.log(loadBar.style.width);
  loadInfo.textContent = `Generated paragraphs: ${index + 1}/${quantity}`;
}

// Enter 입력으로 RUN 가능하게 설정
const loadingBar = QS("#loadingBar");
const loadingInfo = QS("#loadingInfo");

QS("#paragraphsNum").addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    QS("#runBtn").click();
  }
});

// RUN 버튼 클릭시 이벤트 리스너
QS("#runBtn").addEventListener("click", async (event) => {
  body.innerHTML = "";

  const paragraphsNum = QS("#paragraphsNum"); // 문단 개수 입력 양식
  const quantity = parseInt(paragraphsNum.value);

  if (isNaN(quantity)) {
    alert("Please enter an integer value");
    paragraphsNum.value = null;
    paragraphsNum.focus();
    return;
  }

  QS("#loadingWrapper").style.display = "block";

  const result = await fetchLorem();

  const data = {
    text: result,
    quantity: quantity,
    body: body,
    loadBar: loadingBar,
    loadInfo: loadingInfo,
  };

  for (let i = 0; i < quantity; i++) {
    await appendParagraph(data, i);
  }
});

async function fetchLorem() {
  const res = await fetch("lorem.json");
  const result = await res.json();
  return result;
}
