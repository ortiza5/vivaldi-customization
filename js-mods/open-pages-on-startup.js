(function () {
  // ============================================================================================================
  // Open a set of tabs on browser startup
  //    - made by nomadic on the Vivaldi Forums
  // ============================================================================================================
  function openTabsOnStartup() {
    // CONFIG: ------------

    // Enter the URLs you want to open, Format: ["www.url1.com", "www.url2.com", "www.etc.com"]
    const URLS = [
      "https://forum.vivaldi.net/",
      "https://github.com/",
      "chrome://vivaldi-webui/startpage?section=Speed-dials",
    ];

    // Set to false if you want all new normal(not devtool/popup) windows to open the set of tabs
    const IS_ONLY_OPENED_ON_INITIAL_WINDOW = true;

    // --------------------

    function openTabs() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        // Replace a previously open speed dial with one of the urls
        let currentTabUrl = tab[0].url;
        if (tab[0].pendingUrl) currentTabUrl = tab[0].pendingUrl;

        if (currentTabUrl.startsWith("chrome://vivaldi-webui/startpage?section=Speed-dials")) {
          // put first url in speed dial
          chrome.tabs.update(tab[0].id, { url: URLS[0] });
          // put the rest in new tabs
          URLS.slice(1).forEach((tabUrl) => {
            chrome.tabs.create({ url: tabUrl });
          });
        } else {
          // otherwise just open all the urls in new tabs
          URLS.forEach((tabUrl) => {
            chrome.tabs.create({ url: tabUrl });
          });
        }
      });
    }

    if (IS_ONLY_OPENED_ON_INITIAL_WINDOW) {
      // Check to see how many windows are open
      chrome.windows.getAll(function (windows) {
        if (windows.length <= 1) {
          openTabs();
        }
      });
    } else {
      openTabs();
    }
  }

  // Loop waiting for the browser to load the UI
  let intervalID = setInterval(function () {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      openTabsOnStartup();
    }
  }, 300);
})();
