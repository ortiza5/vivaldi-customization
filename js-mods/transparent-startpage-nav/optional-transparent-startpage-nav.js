(function () {
  // ============================================================================================================
  // Optional: Adjust Startpage Nav Bar Style on Bookmarks and History Pages
  //    - made by nomadic on the Vivaldi Forums
  // ============================================================================================================
  function adjustNav() {
    // CONFIG: ------------
    const NAV_PADDING = "8px";
    const NAV_BACKGROUND = "var(--colorBg)";
    // --------------------

    function updateStyle(tabId, changeInfo) {
      // if the change wasn't to the URL, ignore it
      if (!changeInfo.url) return;

      // Inject new values on bookmarks and history pages
      if (
        changeInfo.url.startsWith("chrome://vivaldi-webui/startpage?section=bookmarks") ||
        changeInfo.url.startsWith("chrome://vivaldi-webui/startpage?section=history")
      ) {
        let el = document.querySelector(".webpageview.active");
        el.style.setProperty("--startpageNavBackground", NAV_BACKGROUND);
        el.style.setProperty("--startpageNavPaddingOnTop", NAV_PADDING);
        el.style.setProperty("--startpageNavPaddingOnBottom", NAV_PADDING);

        // Remove injected value for speed dial
      } else if (changeInfo.url.startsWith("chrome://vivaldi-webui/startpage")) {
        let el = document.querySelector(".webpageview.active");
        el.style.removeProperty("--startpageNavBackground");
        el.style.removeProperty("--startpageNavPaddingOnTop");
        el.style.removeProperty("--startpageNavPaddingOnBottom");
      }
    }

    // listener for url change
    chrome.tabs.onUpdated.addListener(updateStyle);

    // for initial load
    // TODO: Really not fail safe, figure out better way for initial load
    //! No event from Chrome.Tabs is fired to check on initial load
    setTimeout(function () {
      let isStartPage = document.querySelector(".dials.speeddial");
      if (!isStartPage) {
        let el = document.querySelector(".webpageview.active");
        el.style.setProperty("--startpageNavBackground", NAV_BACKGROUND);
        el.style.setProperty("--startpageNavPaddingOnTop", NAV_PADDING);
        el.style.setProperty("--startpageNavPaddingOnBottom", NAV_PADDING);
      }
    }, 600);
  }

  // Loop waiting for the browser to load the UI
  let intervalID = setInterval(function () {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      adjustNav();
    }
  }, 300);
})();
