let id;
let title;

function update(tab) {
  let data;

  if (tab) 
  {
    console.log(tab)

    // A default url just in case below code doesn't work
    var url = new URL(tab.url);

    if (tab.url.includes("crowdin")) {
      if (tab.url.includes("profile") || 
        (tab.url.includes("settings") && !tab.url.includes("project"))){
          data = {
            status: tab.status,
            action: "set",
            url: tab.url,
            details: url.hostname || tab.url,
            smallText: tab.url,
            largeText: tab.title
          };
        }
      else {
        data = {
          status: tab.status,
          action: "set",
          url: tab.url,
          details: url.hostname || tab.url,
          smallText: tab.url,
          largeText: tab.title
        };
      }
    }
    else
    {
      data = {
        action: "clear"
      };
    }
  }
  else {
    data = {
      action: "clear"
    };
  }

  $.post({
    traditional: true,
    url: 'http://localhost:3000/',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function (response) { console.log(response); }
  });
}

setInterval(() => {
  chrome.windows.getLastFocused({ populate: true }, function (window) {
    for (let t in window.tabs) {
      if (window.tabs[t].highlighted) {
        if (window.tabs[t].id !== id || window.tabs[t].title !== title) {
          console.log(window.tabs[t]);
          update(window.tabs[t]);
          id = window.tabs[t].id;
          title = window.tabs[t].title
        }
      }
    }
  });
}, 1000);