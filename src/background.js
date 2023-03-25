/**
 * 这段代码旨在监听当前选项卡的 URL 是否已更改，如果是，则刷新选项卡以显示新页面。
 * 
 * 这段代码的功能如下：
 *
 * 定义了一个变量 currentUrl 并将其初始化为空字符串。
 * 调用 chrome.tabs.query() 方法来获取当前激活的选项卡，然后将其 URL 存储在 currentUrl 变量中。
 * 注册了一个 chrome.runtime.onInstalled 事件监听器，在浏览器安装插件时被调用。
 * 在 chrome.tabs.onUpdated 事件发生时做出响应，该事件在选项卡更新完成后被触发。
 * 使用 chrome.tabs.query() 方法获取当前激活的选项卡，并比较其 URL 是否与之前存储的 URL 不同。
如果不同，则将新 URL 存储在 currentUrl 变量中，并刷新选项卡以显示新页面。
 */

console.log('background running...')

let currentUrl = ""
chrome.tabs.query({ active: true }, function (tabs) {
  currentUrl = tabs[0].url;
})

chrome.runtime.onInstalled.addListener(function () {

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (changeInfo.status === 'complete') {
      chrome.tabs.query({ active: true }, function (tabs) {
        var url = tabs[0].url;

        if (url !== currentUrl) {
          currentUrl = url
          chrome.tabs.reload(tabId)
        }

        return url;
      });

    }
  })
});