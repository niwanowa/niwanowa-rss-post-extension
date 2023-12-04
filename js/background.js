/* コンテキストメニューを作成 */
const parent = chrome.contextMenus.create({
    id: "share",
    title: "ページを共有",
    contexts: ["all"],
});

chrome.contextMenus.create({
    parentId: parent,
    id: "title",
    title: "ページタイトルとURLを送信",
    contexts: ["all"],
});
chrome.contextMenus.create({
    parentId: parent,
    id: "URL",
    title: "URLを送信",
    contexts: ["all"],
});


/* コンテキストメニューがクリックされた時の処理 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "title":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: title,
            });
            break;

        case "URL":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: URL,
            });
            break;
    }
});
function title() {
    // タイトルとURLを取得
    const url = "https://nqdaldn14g.execute-api.ap-northeast-1.amazonaws.com/Prod/";
    const link = location.href;
    const title = document.title;

    // POSTリクエストを送信
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ link, title }),
    })
    .then(response => response.json())
    .then(data => console.log("POST successful:", data))
    .catch(error => console.error("Error:", error));
}

function URL() {
    const element = document.createElement("textarea");
    element.value = location.href;
    document.body.append(element);
    element.select();

    //指定されたURLへPOSTリクエストを送信する


    element.remove();
}
