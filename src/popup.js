/**
 * 这段代码是一个Chrome插件的popup.html中的JavaScript部分。
 * 它读取chrome.storage.local中的名为"checkboxes"的数据，将其中的链接以列表的形式显示在popup.html页面中的
 *
 * 元素中。当用户点击"download"按钮时，代码会将选定的链接以CSV格式下载到本地。
 * 当用户点击"clear"按钮时，代码将清空之前选定的所有链接，并从popup.html页面中删除它们的列表。
 */

chrome.storage.local.get("checkboxes", ({ checkboxes }) => {
  const links = document.getElementById("links");
  if (checkboxes) {
    checkboxes.forEach(({ href, text }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = href;
      a.textContent = text;
      li.appendChild(a);
      links.appendChild(li);
    });
  }
});

document.getElementById("download").addEventListener("click", () => {
  chrome.storage.local.get("checkboxes", ({ checkboxes }) => {
    const data = checkboxes.map(({ href, text }) => `${text},${href}`).join("\n");
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url,
      filename: "selected_links.csv",
      saveAs: true
    });
  });
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ checkboxes: [] });
  const links = document.getElementById("links");
  links.innerHTML = "";
});  