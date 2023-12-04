// options.js

document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("save");
    const postUrlInput = document.getElementById("postUrl");
  
    // 保存ボタンのクリックイベント
    saveButton.addEventListener("click", function() {
      // 入力されたURLを取得して保存
      const postUrl = postUrlInput.value;
      chrome.storage.sync.set({ postUrl }, function() {
        console.log("POST URL saved:", postUrl);
      });
    });
  
    // 保存されたURLを取得して表示
    chrome.storage.sync.get(["postUrl"], function(result) {
      const savedPostUrl = result.postUrl;
      postUrlInput.value = savedPostUrl || "";
    });
  });
  