/**
 * 这段代码的功能是：
 * 首先创建一个空数组 checkboxes，然后通过调用 chrome.storage.local.get() 方法
 * 来获取 Local Storage 中保存的 checkbox 信息，并将其 push 进 checkboxes 数组中。
 * 
 * 接着实现了一个 addCheckbox() 函数，该函数会为每个链接都创建一个 checkbox，
 * 当点击 checkbox 后则更新 checkboxes 数组，并将其重新保存到 Local Storage 中。
 * 
 * 再调用 addCheckboxes() 函数把所有链接转化为 checkbox。
 * 
 * 随后检索之前保存在 Local Storage 中的 checkbox 数据并更新相应的 checkbox。
 */

const checkboxes = [];

chrome.storage.local.get("checkboxes", (items) => {
  items = items.checkboxes
  if (items) {
    items.forEach((item) => {
      checkboxes.push(item)
    });
  }
});

function addCheckbox(link) {
  // 判断父元素的 class 是否为 "c-title t t tts-title"
  if (link.parentElement.classList.contains('c-title') && link.parentElement.classList.contains('t') && link.parentElement.classList.contains('tts-title')) {

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = link.href;
    checkbox.style = "width:20px;height:20px"
    checkbox.onclick = function () {
      if (checkbox.checked) {
        checkboxes.push({ href: link.href, text: link.text });
      } else {
        const index = checkboxes.findIndex(c => c.href === link.href);
        if (index !== -1) {
          checkboxes.splice(index, 1);
        }
      }
      chrome.storage.local.set({ checkboxes });
    };

    const label = document.createElement("label");
    label.appendChild(checkbox);
    // label.appendChild(document.createTextNode(link.text));
    link.parentNode.insertBefore(label, link);
  }
}

function addCheckboxes() {
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    addCheckbox(links[i]);
  }
}

addCheckboxes()

chrome.storage.local.get("checkboxes", ({ checkboxes }) => {
  if (checkboxes) {
    checkboxes.forEach(({ href }) => {
      console.log(href)
      const checkbox = document.querySelector(`input[value="${href}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }
});