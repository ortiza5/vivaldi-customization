(function () {
  // ============================================================================================================
  // Quote on Speeddial
  // URL:         https://forum.vivaldi.net/
  // Description: Adds a quote of the day above the speed dials on the startpage
  // Author(s):   @nomadic
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function quotesToSpeeddial() {
    // Config ------------
    // -------------------

    function fetchQuote() {
      fetch("https://quotes.rest/qod?language=en")
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    function addQuoteToPage(tabId, changeInfo) {
      // if the change wasn't to the URL, ignore it
      if (!changeInfo.url) return;

      // inject quote if it is the startpage
      if (changeInfo.url.startsWith("chrome://vivaldi-webui/startpage?section=Speed-dials")) {
      }
    }

    // listener for url change
    chrome.tabs.onUpdated.addListener(addQuoteToPage);
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      quotesToSpeeddial();
    }
  }, 300);
})();
