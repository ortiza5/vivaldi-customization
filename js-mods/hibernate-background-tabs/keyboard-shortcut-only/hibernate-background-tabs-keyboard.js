(function () {
  // ============================================================================================================
  // Hibernate Background Tabs Keyboard Shortcut Mod
  // URL:         https://forum.vivaldi.net/topic/60172/hibernate-background-tabs-keyboard-shortcut-hotkey
  // Description: Adds a user defined keyboard shortcut that will hibernate all tabs except the active one
  // Author(s):   @nomadic   [ based on a mod by @LonM "Custom Keyboard Shortcuts Mod" ]
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function hibernateBackgroundTabsHotkey() {
    // Config ------------

    // Keyboard shortcut combo to hibernate all background tabs
    // written in the form "Ctrl+Shift+Alt+KEY"
    const HIBERNATE_KEY_COMBO = "Alt+H";
    const SKIP_SELECTED_TABS = true;
    const SKIP_ACTIVE_TAB_STACK_TABS = false;

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

    function areStringsEqualIgnoringCase(string1, string2) {
      return string1.localeCompare(string2, undefined, { sensitivity: "base" }) === 0;
    }

    function handleKeyboardShortcut(combo) {
      if (areStringsEqualIgnoringCase(HIBERNATE_KEY_COMBO, combo)) {
        hibernateBackgroundTabs();
      }
    }

    vivaldi.tabsPrivate.onKeyboardShortcut.addListener(handleKeyboardShortcut);
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      hibernateBackgroundTabsHotkey();
    }
  }, 300);
})();
