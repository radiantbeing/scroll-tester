const runButton = document.querySelector("#runBtn");
const paragraphsNumberForm = document.querySelector("#paragraphsNum");
const loadingWrapper = document.querySelector("#loadingWrapper");
const loadingBar = document.querySelector("#loadingBar");
const loadingInfo = document.querySelector("#loadingInfo");
const paragraphsBody = document.querySelector("#loremBody");

let currentInterval;

function createElement(string) {
  const temp = document.createElement("template");
  temp.innerHTML = string;
  return temp.content;
}

async function fetchLorem() {
  const res = await fetch("lorem.json");
  const paragraph = await res.json();
  return paragraph;
}

function getRandomInt(min, max) {
  // 최댓값은 제외, 최솟값은 포함
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

runButton.addEventListener("click", function runHandler() {
  const paragraphs = {
    number: parseInt(paragraphsNumberForm.value),
    body: paragraphsBody,
  };

  if (isNaN(paragraphs.number)) {
    alert("Enter only integer value.");
    paragraphsNumberForm.value = null;
    return;
  }
  console.log("[Current Interval]", currentInterval);
  clearInterval(currentInterval);

  loadingWrapper.style.display = "block";

  paragraphs.body.innerHTML = "";

  fetchLorem().then((lorems) => {
    const keys = Object.keys(lorems);

    let i = 0;
    currentInterval = setInterval(() => {
      if (i >= paragraphs.number - 1) clearInterval(currentInterval);

      const randInt = getRandomInt(0, keys.length);

      // innerHTML보다 appendChild가 속도가 더 빠름
      const string = /* html */ `<p>${i + 1} ${lorems[randInt]}</p>`;
      const paragraphDOM = createElement(string);
      paragraphs.body.appendChild(paragraphDOM);

      loadingBar.style.width = `${((i + 1) / paragraphs.number) * 100}%`;
      loadingInfo.textContent = `Generated paragraphs: ${i + 1}/${
        paragraphs.number
      }`;

      i++;
    }, 0);
  });
});

paragraphsNumberForm.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    runButton.click();
  }
});

// 생성 속도가 더 빠른 알고리즘

// 아래 함수를 for문으로 돌리면 속도가 대폭 향상되지만 중지가 불가능for문이 setInterval보다 빠른가?

// for 문에 flag를 두어 for 반복 종료가 가능하다.

// async function appendParagraph(data, index) {
//   setTimeout(() => {
//     renewLoadBar(data.loadBar, data.loadInfo, index, data.quantity);

//     const rand = Math.floor(Math.random() * 10);
//     const paragraphText =
//       index +
//       1 +
//       " " +
//       data.text[rand] +
//       " " +
//       data.text[rand] +
//       " " +
//       data.text[rand];
//     const newPara = document.createElement("p");
//     newPara.innerText = "\t" + paragraphText;

//     data.body.appendChild(newPara);
//   }, 0);
// }
