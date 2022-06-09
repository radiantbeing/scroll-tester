(async function () {
  const body = QS("#loremBody");
  const quantity = 1000;
  // Create DOM element
  for (let i = 0; i < quantity; i++) {
    QS("#loadingBar").style.width = `${(i / quantity) * 100}%`;
    QS("#loadingInfo").textContent = `Generated paragraph: ${i + 1}/${quantity}`;
    if (i == 0) {
      body.innerHTML += "<p>" + i + "\t" + (await createParagraph(true)) + "</p>";
      continue;
    }
    body.innerHTML += "<p>" + i + "\t" + (await createParagraph(false)) + "</p>";
  }
})();

function QS(selector) {
  return document.querySelector(selector);
}

async function createParagraph(isFirst) {
  let lorems = "";
  for (let i = 0; i < 3; i++) {
    lorems += (await getLoremText(isFirst)) + " ";
  }
  return lorems;
}

async function getLoremText(isFirst) {
  const res = await fetch("lorem.json");
  const data = await res.json();

  const rand = Math.round(Math.random() * 8) + 1;

  if (isFirst == true) {
    return data[0];
  } else {
    return data[rand];
  }
}
