(function () {
  // ============================================================================================================
  // Add a Context Menu Entry Test
  // ============================================================================================================
  function addContextMenuItems() {
    // CONFIG: ------------

    // The text that will be displayed in the context menu as the root folder
    const CONTEXT_MENU_ROOT_TITLE = "Bookmarks";

    // The name of the folder that contains all the bookmarks to be fetched
    const BOOKMARK_FOLDER_NAME = "Context Menu Bookmarks";

    // Should bookmark links be opened in the active tab or a new tab
    const IS_OPENED_IN_NEW_TAB = true;

    // --------------------

    // bookmark folder example: shows on all web pages
    //     puts all items in a bookmark folder called "Context Menu Bookmarks" in a context menu entry called "Bookmarks"
    let bookmarkUrlLookup, contextMenuIDs;

    function populateContextMenu() {
      // clear any past IDs and URLs
      bookmarkUrlLookup = {};
      contextMenuIDs = [];

      // get the designated bookmark folder
      chrome.bookmarks.search(BOOKMARK_FOLDER_NAME, function (bookmarks) {
        let rootBookmarkFolder = bookmarks[0];
        // create the folder context menu entry
        chrome.contextMenus.create({
          id: rootBookmarkFolder.id,
          title: CONTEXT_MENU_ROOT_TITLE,
          contexts: ["all"],
        });
        contextMenuIDs.push(rootBookmarkFolder.id);
        addBookmarksInFolder(rootBookmarkFolder);
      });

      // populate the contex menu sub items with the the bookmarks found in the folder
      function addBookmarksInFolder(folder) {
        // get the folder's child bookmarks/folders if they exist, "folder.children" didn't work

        chrome.bookmarks.getChildren(folder.id, function (childBookmarks) {
          // for all the bookmarks/folders in the root folder given
          for (let bookmark of childBookmarks) {
            let isFolder = true;
            // bookmarks have URLs and folders don't
            if (bookmark.url) {
              isFolder = false;
            }

            let idBase = bookmark.id;
            let menuID = isFolder ? idBase : "bookmark-" + idBase;
            let title = bookmark.title;

            // add the item to the context submenu of the root folder given
            chrome.contextMenus.create({
              id: menuID,
              title: isFolder ? "🖿  " + title : title,
              parentId: folder.id,
              contexts: ["all"],
            });
            contextMenuIDs.push(menuID);

            if (isFolder) {
              // run the function again on any folders
              addBookmarksInFolder(bookmark);
            } else {
              // record the url of the bookmark so it can be called in the listener
              bookmarkUrlLookup[menuID] = bookmark.url;
            }
          }
        });
      }
    }

    // remove all context menu items and then load new ones
    // tried to update and remove individual items as necessary, but it got too complex
    // just removing everything and adding them back doesn't appear to have any performance issue
    //! Not using "chrome.contextMenus.removeAll" to be safer for other mods that might use the context menu
    function refreshConextMenuItems() {
      let toRemove = contextMenuIDs.pop();

      // keep removing items until the last context menu id is reached...
      if (contextMenuIDs.length !== 0) {
        chrome.contextMenus.remove(toRemove);
        refreshConextMenuItems();
      } else {
        // ...then remove the last item an load the new items
        chrome.contextMenus.remove(toRemove, populateContextMenu);
      }
    }

    // put the bookmarks into the context menu
    populateContextMenu();

    // listener for clicks on context menu items
    chrome.contextMenus.onClicked.addListener(function (info) {
      // Match id used in context menu item creation
      if (info.menuItemId.startsWith("bookmark-")) {
        // find the correct url for the context menu item
        let url = bookmarkUrlLookup[info.menuItemId];

        if (IS_OPENED_IN_NEW_TAB) {
          // create a new tab with the url
          //-- active window is default
          chrome.tabs.create({ url: url });
        } else {
          // get the current active tab and set it to the new url of the bookmark
          chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.update(tab[0].id, { url: url });
          });
        }
      }
    });

    // listeners for bookmark changes, this means the context menu items need to be refreshed
    //* onRemoved and onChildrenReordered never called, removing counted as onMoved to trash
    chrome.bookmarks.onCreated.addListener(refreshConextMenuItems);
    chrome.bookmarks.onChanged.addListener(refreshConextMenuItems);
    chrome.bookmarks.onMoved.addListener(refreshConextMenuItems);
  }

  // Loop waiting for the browser to load the UI
  let intervalID = setInterval(function () {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      addContextMenuItems();
    }
  }, 300);
})();

(() => {
  console.log("hello");
  return false;
})();
