(function () {
  // ============================================================================================================
  // Bookmarks button in front of the address field
  // URL:         https://forum.vivaldi.net/
  // Description: Adds a bookmark button in front of the address field that opens a dropdown menu of all bookamrks
  // Author(s):   @nomadic
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function bookmarkButton() {
    // Config ------------

    // -------------------

    function handleBookmarkMenuEvents(event) {
      switch (event.command) {
        case "addactivetab":
          break;
        case "addbookmark":
          break;
        case "addfolder":
          break;
        case "addseparator":
          break;
        case "edit":
          break;
        case "cut":
          break;
        case "copy":
          break;
        case "paste":
          break;
        case "delete":
          break;
        default:
          break;
      }
      removeBookmarkListeners();
    }

    async function handleBoormarkOpenEvents(event) {
      let isOpenedInBackgroundTab = event.background;
      const bookmarkListFromID = await chrome.bookmarks.get(event.id);
      const bookmark = bookmarkListFromID[0];

      switch (event.disposition) {
        // Depends on the setting for whether the bookmark is opened in a new tab or not
        case "setting":
          let shouldOpenInNewTab = await vivaldi.prefs.get("vivaldi.bookmarks.open_in_new_tab");
          const crtlKeyState = event.state.ctrl;
          const middleMouseState = event.state.center;

          // adjust whether opened in the background depending on ctrl key or middle mouse press
          isOpenedInBackgroundTab = isOpenedInBackgroundTab || crtlKeyState || middleMouseState;

          // adjust whether opened in new tab depending on ctrl key or middle mouse press
          shouldOpenInNewTab = shouldOpenInNewTab || crtlKeyState || middleMouseState;

          if (shouldOpenInNewTab) {
            chrome.tabs.create({ active: !isOpenedInBackgroundTab, url: bookmark.url });
          } else {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              const currentTab = tabs[0];
              chrome.tabs.update(currentTab.id, { url: bookmark.url });
            });
          }
          break;

        case "new-tab":
          chrome.tabs.create({ active: !isOpenedInBackgroundTab, url: bookmark.url });
          break;

        case "current":
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            chrome.tabs.update(currentTab.id, { url: bookmark.url });
          });
          break;

        case "new-window":
          chrome.windows.create({ url: bookmark.url });
          break;

        case "new-private-window":
          chrome.windows.create({ incognito: true, url: bookmark.url });
          break;

        default:
          break;
      }
      removeBookmarkListeners();
    }

    function removeBookmarkListeners() {
      vivaldi.menubarMenu.onBookmarkAction.removeListener(handleBookmarkMenuEvents);
      vivaldi.menubarMenu.onOpenBookmark.removeListener(handleBoormarkOpenEvents);
    }

    async function openBookmarkDropdown(event) {
      // clear any existing listeners
      removeBookmarkListeners();

      vivaldi.menubarMenu.onBookmarkAction.addListener(handleBookmarkMenuEvents);
      vivaldi.menubarMenu.onOpenBookmark.addListener(handleBoormarkOpenEvents);

      const windowID = await vivaldi.windowPrivate.getCurrentId();
      const rect = event.target.getBoundingClientRect();

      vivaldi.bookmarkContextMenu.show({
        windowId: windowID,
        id: "1",
        siblings: [
          {
            folderGroup: true,
            id: "1",
            offset: 0,
            rect: {
              x: parseInt(rect.left),
              y: parseInt(rect.top),
              width: parseInt(rect.width),
              height: parseInt(rect.height),
            },
          },
        ],
        sortField: undefined,
        sortOrder: undefined,
        edge: "off",
        icons: [
          "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",
        ],
      });
    }

    function addBookmarkButton() {
      const navButtonGroup = document.querySelector(".UrlBar > .toolbar-mainbar.toolbar-droptarget");
      const oldButton = document.getElementById("customBookmarkBtn");

      // check if already exists and elements are valid
      if (oldButton || !navButtonGroup) return;

      const customBookmarkBtn = document.createElement("div");
      customBookmarkBtn.id = "customBookmarkBtn";
      customBookmarkBtn.classList.add("button-toolbar");
      customBookmarkBtn.innerHTML = `
        <button draggable="true" tabindex="-1" title="Toggle tab bar" type="button" class="ToolbarButton-Button">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
              <path d="M12.49 16.54a1 1 0 011.03 0l3.48 2.1V6.41a.26.26 0 000-.02H9.02a.29.29 0 00-.02 0v12.23zM9 19.8l-1 .6v-14c0-1 1-1 1-1h8c1 0 1 1 1 1v14l-1-.6-4-2.4zm8.05-13.4zM9 6.35z"/>
            </svg>
          <span>
        </button>
      `;

      navButtonGroup.insertAdjacentElement("beforeend", customBookmarkBtn);

      customBookmarkBtn.addEventListener("click", openBookmarkDropdown);
    }

    // mutation Observer for Address Bar Changes
    let main = document.getElementById("main");
    // get the initial state of the addressbar as either urlbar or mailbar
    let oldIsMailBarActive = main.firstChild.classList.contains("toolbar-mailbar");
    let addressBarObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // only re-add on new nodes added. The list addedNodes will only have a
        // length attribute when it contains added nodes
        if (mutation.addedNodes.length) {
          // get the new state of the addressbar
          let isMailBarActive = mutation.addedNodes[0].classList.contains("toolbar-mailbar");

          // if it is different from the previous state, we need to act on it
          if (oldIsMailBarActive !== isMailBarActive) {
            // update the old value for comparisons on future mutations
            oldIsMailBarActive = isMailBarActive;
            // if the addressbar isn't the mailbar, we can re-add the button
            if (!isMailBarActive) {
              // Run all changes that are only in the url bar and not the mail bar
              addBookmarkButton();
            }
          }
        }
      });
    });
    addressBarObserver.observe(main, { childList: true });

    addBookmarkButton();
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      bookmarkButton();
    }
  }, 300);
})();
