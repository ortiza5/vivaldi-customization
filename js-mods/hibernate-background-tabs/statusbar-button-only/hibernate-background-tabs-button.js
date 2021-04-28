(function () {
  // ============================================================================================================
  // Hibernate Background Tabs Status Bar Button Mod
  // URL:         https://forum.vivaldi.net/post/396130
  // Description: Adds a status bar button that will hibernate all tabs except the active one
  // Author(s):   @nomadic
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function hibernateBackgroundTabsButton() {
    // Config ------------

    // 0 is farthest left on the status bar's right grouping of buttons
    // keep adding 1 to the variable to move it over to the right.
    const HIBERNATE_BTN_POSITION = 1;

    const SKIP_SELECTED_TABS = true;
    const SKIP_ACTIVE_TAB_STACK_TABS = true;

    // -------------------
    // for finding tab stack id in tab data
    const regex = /(?<="group":")[a-z0-9]+(?=")/i;

    function hibernateBackgroundTabs() {
      vivaldi.windowPrivate.getCurrentId((currentWindowId) => {
        chrome.tabs.query({ active: true, windowId: currentWindowId }, (activeTab) => {
          activeTab = activeTab[0];
          let activeTabStackID = (regex.exec(activeTab.extData) || [false])[0];
          chrome.tabs.query({ windowType: "normal" }, (tabs) => {
            tabs.forEach((tab) => {
              if (tab.discarded) return; // already discarded, so can skip it
              if (tab.windowId === currentWindowId && tab.active) return; // skip active tab
              if (SKIP_SELECTED_TABS && tab.highlighted) return; // skip selected tabs if configured to do so
              // skip tabs in the same tab stack as the active tab if configured to do so
              if (SKIP_ACTIVE_TAB_STACK_TABS && activeTabStackID) {
                let stackID = (regex.exec(tab.extData) || [""])[0];
                if (stackID === activeTabStackID) return;
              }
              chrome.tabs.discard(tab.id);
            });
          });
        });
      });
    }

    // shamelessly modified from @luetage's "Random Theme Button Mod" because I am lazy
    function addHibernateButton() {
      // Check if button already exists before adding
      if (!document.getElementById("hibernate")) {
        let div = document.createElement("div");
        div.id = "hibernate";
        div.classList.add("button-toolbar");
        div.innerHTML =
          '<button draggable="true" tabindex="-1" title="Hibernate Background Tabs" type="button"><span><svg width="12" height="12" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M24.46.65c.1 0 .2.1.18.22l-.04.08-.06.2-.3.74-1.51 3.77-.34.85-.1.28-.04.06v.05h.16l.32-.05 2.17-.36c.15 0 .27-.04.35-.06h.26l.06.14c.11.55.2 1.12.27 1.7l-.02.02a1.36 1.36 0 01-.4.13l-3.48.6-3.6.59-.23.04h-.08a.24.24 0 01-.14-.06.16.16 0 01-.02-.08v-.16l.28-.71L19.4 5.5l.6-1.46.19-.45.04-.12v-.06h-.02V3.4h-.12c-.79.12-1.58.24-2.39.4l-.33.06h-.26l-.08-.12c-.1-.46-.2-.9-.25-1.36l-.04-.2v-.08l.02-.06a.4.4 0 01.06-.06l.15-.06.54-.11 3.11-.54 2.69-.43.83-.14.23-.04zm-7.61 4.06c.12-.01.21.06.25.2V5l-.04.22c0 .2-.06.5-.11.9l-.64 4.5-.15.99-.04.32v.11h.02v.04h.06l.07-.06.36-.13 1.1-.48 1.15-.5.37-.15.1-.04h.16c.04 0 .06.04.12.1.27.6.51 1.16.75 1.76 0 0 0 .04-.04.06a1.52 1.52 0 01-.4.23l-6.43 2.8-.88.38c-.1.04-.2.06-.24.1l-.08.02h-.02c-.06.02-.14 0-.16-.04a.16.16 0 01-.06-.08l.61-4.74c.1-.67.2-1.28.24-1.73l.08-.52.02-.13v-.1l-.02.04v-.04h-.02l-.02.02c-.02 0-.06 0-.1.04l-.31.14-2.17.9-.34.16-.12.04h-.16c-.03 0-.07-.04-.11-.1l-.4-.79-.33-.8-.02-.07v-.1l.06-.07.13-.1.56-.28a211.5 211.5 0 016.86-2.96l.26-.08.06-.04h.02zm-.71 7.32l-.02.02h.02zm-5.35 0c.14 0 .26.14.26.32l-.02.12-.08.25-2.57 8.15v.1l-.02.02v.04h.08l.14-.02.45-.12 3.63-.87h.2c.04.04.08.08.12.18l.6 2.25-.03.08-.06.06a1.93 1.93 0 01-.55.23c-.65.2-2.01.54-4.8 1.23l-4.92 1.2-.34.08H2.8l-.04.02a.34.34 0 01-.2-.08.2.2 0 01-.05-.12v-.24l.31-1.02 2.1-6.6.19-.66.06-.18v-.1H5.1l-.12.04-.43.1-1.42.36-1.44.35-.48.1-.13.02H.85l-.12-.16c-.2-.63-.35-1.24-.51-1.87 0-.12-.04-.2-.06-.28v-.2a.55.55 0 01.1-.1l.2-.1.74-.19a295.7 295.7 0 018-2.01l1.14-.28.31-.06.1-.02h.02z"/></svg><span></button>';
        // positon the button based on the config
        let elBefore = document.querySelector(".StatusInfo").nextSibling;
        for (let i = 0; i < HIBERNATE_BTN_POSITION; i++) {
          elBefore = elBefore.nextSibling;
        }
        document.querySelector(".toolbar-statusbar").insertBefore(div, elBefore);
        document.querySelector("#hibernate button svg").style = "width: 14px; height: 14px;";
        document.getElementById("hibernate").addEventListener("click", hibernateBackgroundTabs);
      }
    }

    // CHANGE #1: Re-add the button after exiting fullscreen
    let browser = document.getElementById("browser");
    let oldState = browser.classList.contains("fullscreen") || browser.classList.contains("minimal-ui");
    let browserObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName == "class") {
          let isFullscreen =
            mutation.target.classList.contains("fullscreen") || mutation.target.classList.contains("minimal-ui");
          if (oldState !== isFullscreen) {
            oldState = isFullscreen;
            if (!isFullscreen) {
              addHibernateButton();
            }
          }
          // CHANGE #2: Re-add the button after toggling status bar
        } else if (Array.from(mutation.addedNodes).find((element) => element.classList.contains("toolbar-statusbar"))) {
          addHibernateButton();
        }
      });
    });

    browserObserver.observe(browser, { attributes: true, childList: true });

    addHibernateButton();
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      hibernateBackgroundTabsButton();
    }
  }, 300);
})();
