(function () {
  // ============================================================================================================
  // Adds a "save all tabs to speed dial folder" button to the addressbar
  //    - made by nomadic on the Vivaldi Forums
  // ============================================================================================================
  function saveTabsToSpeeddialBtn() {
    const LOCATE_BTN_IN = ".toolbar.toolbar-addressbar.toolbar-mainbar";
    const DEBUG = false;
    const PADDING_FROM_TOP = "7px";

    function tempAlert(msg, duration, parent) {
      var el = document.createElement("div");
      el.setAttribute(
        "style",
        `position:absolute;top:15px;right:15px;padding:${PADDING_FROM_TOP} 11px;opacity:0;transition:opacity 1000ms ease;z-index:999;color:#3c763d;background-color:#dff0d8;border:1px solid#3c763d;border-radius:var(--radius);`
      );
      el.setAttribute("id", "custom-notification");
      el.innerHTML = msg;
      var toAddTo = document.querySelector(parent);
      toAddTo.appendChild(el);
      setTimeout(function () {
        el.style.opacity = 0.9;
      }, 100);
      setTimeout(
        function () {
          el.style.opacity = 0;
        },
        duration > 1000 ? duration - 1000 : duration / 2
      );
      setTimeout(function () {
        if (el !== null && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, duration);
    }

    // get speed dial folder
    let speeddialFolder;
    // CUSTOM FOLDER NAME HERE
    chrome.bookmarks.search("speed dial", function (bookmarks) {
      for (let bookmark of bookmarks) {
        DEBUG && console.log(bookmark);
        // CUSTOM SELECTORS HERE
        if (bookmark.speeddial === true && bookmark.trash === false) {
          speeddialFolder = bookmark;
          break;
        }
      }
      if (speeddialFolder === undefined) {
        console.log("Rename your Speed Dial Folder to 'Speed Dial' and make sure it isn't in the trash");
        return;
      }
    });

    // create the button
    var saveTabsBtn = document.createElement("div");
    saveTabsBtn.setAttribute("class", "button-toolbar custom-button");
    saveTabsBtn.innerHTML = `
    <button tabindex="-1" title="Save all tabs as Speed Dial Folder" id="vivaldiSaveTabsBtn">
      <span>
        <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.99 12.5c-1.1 0-2.01.9-2.01 2s.9 2.01 2 2.01 2.02-.9 2.02-2-.91-2.01-2.01-2.01zM8.15 8.23v2.7h7.14v-2.7zm-1.3-1.88a.5.5 0 00-.5.5v12.3a.5.5 0 00.5.5h12.3a.5.5 0 00.5-.5V9.42a.5.5 0 00-.16-.35L16.92 6.5a.5.5 0 00-.35-.15zm.5 1h9l2.3 2.28v9.02H7.34z"/>
        </svg>
      </span>
    </button>
    `;
    var toolbar = document.querySelector(LOCATE_BTN_IN);
    toolbar.appendChild(saveTabsBtn);

    // add click action for button
    document.getElementById("vivaldiSaveTabsBtn").addEventListener("click", function () {
      let queryInfo = {
        currentWindow: true,
      };
      chrome.tabs.query(queryInfo, function (tabs) {
        // make the folder on the speed dial
        var dateFormat = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
        var date = new Date();
        let folderTitle = "Tabs: " + date.toLocaleDateString("en-US", dateFormat);
        let folderProperties = {
          parentId: speeddialFolder.id,
          title: folderTitle,
        };
        chrome.bookmarks.create(folderProperties, function (newFolder) {
          // saveeach open tab to the new folder
          let folderId = newFolder.id;
          tabs.forEach(function (tab) {
            let bookmarkProperties = {
              parentId: folderId,
              title: tab.title,
              url: tab.url,
            };
            chrome.bookmarks.create(bookmarkProperties);
          });

          // open the Start Page if not already open
          let isStartPage = document.querySelector(".dials.speeddial");
          if (!isStartPage) {
            chrome.tabs.create({ url: "chrome://vivaldi-webui/startpage" }, function () {
              //! BUG: scroll down didn't work
              tempAlert("Current Tabs Saved", 4000, ".startpage");
            });
          } else {
            window.scrollTo(0, document.querySelector(".startpage-content").scrollHeight);
            tempAlert("Current Tabs Saved", 4000, ".startpage");
          }
        });
      });
    });
  }

  // Loop waiting for the browser to load the UI
  let intervalID = setInterval(function () {
    const browser = document.getElementById("browser");
    if (browser) {
      saveTabsToSpeeddialBtn();
      clearInterval(intervalID);
    }
  }, 300);
})();
