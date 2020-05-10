(function () {
  function tempAlert(msg, duration, parent) {
    var el = document.createElement("div");
    el.setAttribute(
      "style",
      "position:absolute;top:15px;right:15px;padding:7px 11px;opacity:0;transition:opacity 1000ms ease;z-index:999;color:#3c763d;background-color:#dff0d8;border:1px solid#3c763d;border-radius:var(--radius);"
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

  // ============================================================================================================
  // Adds borders between tabs while not adding them next to the active tab, to copy Opera
  // ============================================================================================================
  function tabBorders() {
    let tabStrip = document.querySelector(".tab-strip");

    function addBorders() {
      var tabs = tabStrip.querySelectorAll(":scope > span > .tab-position");
      var isActiveTab;
      var isAfterActive;
      tabs.forEach((tab) => {
        tab.classList.remove("after-active");
        tab.classList.remove("before-active");
        isActiveTab = tab.querySelector(".tab").classList.contains("active");
        if (isAfterActive) {
          tab.classList.add("after-active");
        } else {
          if (!isActiveTab) {
            tab.classList.add("before-active");
          } else {
            isAfterActive = true;
          }
        }
      });
    }

    // Listner for active tab change
    chrome.tabs.onActivated.addListener(addBorders);

    // Listner for active tab drag event
    const observer = new MutationObserver(addBorders);
    const config = {
      childList: true,
      subtree: true,
    };
    observer.observe(tabStrip, config);

    // Listner for window resize
    window.onresize = addBorders;
  }

  // ============================================================================================================
  // Adds custom buttons to the right of the entensions bar
  // ============================================================================================================
  function addCustomButtons() {
    var container = document.createElement("div");
    container.setAttribute("class", "custom-btn-container toolbar toolbar-mainbar");
    var toolbar = document.querySelector(".toolbar.toolbar-addressbar.toolbar-mainbar");
    toolbar.appendChild(container);

    saveTabsToSpeeddialBtn();
    addSettingsBtn();
  }

  // ============================================================================================================
  // Adds bookmark all tabs button to the right side of the toolbar
  // ============================================================================================================
  function saveTabsToSpeeddialBtn() {
    const LOCATE_BTN_IN = ".custom-btn-container";
    // const LOCATE_BTN_IN = ".toolbar.toolbar-addressbar.toolbar-mainbar";

    // get speed dial folder
    let speeddialFolder;
    chrome.bookmarks.search("speed dial", function (bookmarks) {
      for (let bookmark of bookmarks) {
        if (bookmark.speeddial === true && bookmark.trash === false && bookmark.partner === "") {
          speeddialFolder = bookmark;
          break;
        }
      }

      // bookmarks.forEach(function(bookmark) {
      //   if (bookmark.speeddial === true && bookmark.trash === false && bookmark.partner === "") {
      //     speeddialFolder = bookmark;
      //   }
      // });
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

  // ============================================================================================================
  // Adds settings button to the right side of the toolbar
  // ============================================================================================================
  function addSettingsBtn() {
    const LOCATE_BTN_IN = ".custom-btn-container";
    // const LOCATE_BTN_IN = ".toolbar.toolbar-addressbar.toolbar-mainbar";

    var settingsBtn = document.createElement("div");
    settingsBtn.setAttribute("class", "button-toolbar custom-button");
    settingsBtn.innerHTML = `
    <button tabindex="-1" title="Go to Settings" id="vivaldiSettingsBtn">
      <span>
        <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.13 14.86a.5.5 0 00-.03 0 .5.5 0 00-.44.53v1.24H6.63a.51.51 0 000 1.02h3.03v1.27a.5.5 0 101 0v-1.27h8.71a.51.51 0 000-1.02h-8.72v-1.24a.5.5 0 00-.52-.53zm5.8-4.14a.5.5 0 00-.03 0 .5.5 0 00-.44.53v1.24H6.63a.51.51 0 000 1.02h8.83v1.27a.5.5 0 10.99 0v-1.27h2.92a.51.51 0 000-1.02h-2.92v-1.24a.5.5 0 00-.52-.53zm-5.8-4.14a.5.5 0 00-.47.53v1.24H6.63a.51.51 0 000 1.02h3.03v1.27a.5.5 0 101 0V9.37h8.71a.51.51 0 000-1.02h-8.72V7.11a.5.5 0 00-.5-.53z"></path>
        </svg>
      </span>
    </button>
    `;

    var toolbar = document.querySelector(LOCATE_BTN_IN);

    toolbar.appendChild(settingsBtn);

    document.getElementById("vivaldiSettingsBtn").addEventListener("click", function () {
      let isStartPage = document.querySelector(".dials.speeddial");
      var newURL = "vivaldi://settings/";
      if (isStartPage) {
        // window.location.href = newURL;
        chrome.tabs.query({ currentWindow: true }, function (tab) {
          chrome.tabs.update(tab.id, { url: newURL });
        });
      } else {
        chrome.tabs.create({ url: newURL });
      }
    });
  }

  // ============================================================================================================
  // Lightens Favicons if they are too dark
  // ============================================================================================================
  function improveFaviconContrast() {
    // Print statements for debugging
    let DEBUG = false;

    // gets the average brightness of an image
    function getImageBrightness(imageSrc, callback) {
      let img = document.createElement("img");
      img.src = imageSrc;
      img.style.display = "none";
      document.body.appendChild(img);

      let colorSum = 0;
      let alphaPixels = 0;

      img.onload = function () {
        // create canvas to hold the image for analysis
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        let r, g, b, a, avg;

        // image data holds 4 color attributes (r,g,b, and a) in order in an array for each pixel
        // go through each pixel and get the perceived brightness and add them up
        for (var x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x + 1];
          b = data[x + 2];
          a = data[x + 3];

          // correction factors for each color's perceived brightness
          avg = Math.floor((r * 299 + g * 587 + b * 114) / 1000);

          // ignore any transparent pixels
          if (a === 0) {
            alphaPixels++;
            avg = 0;
          } else {
            avg = Math.floor(((a / 255) * (r * 299 + g * 587 + b * 114)) / 1000);
          }
          colorSum += avg;
        }

        // average brightness of image correcting for any transparent pixels
        let brightness = Math.floor(colorSum / (this.width * this.height - alphaPixels));
        callback(brightness);
      };
    }

    // given an image and the color it is displayed infront of, find the contrast
    function getImageToColorContrast(imageSrc, color, callback) {
      let contrast, r, g, b, a;

      // get the components of the background color
      [r, g, b, a] = color
        .replace(/^(rgb|rgba)\(/, "")
        .replace(/\)(.*)/, "")
        .replace(/\s/g, "")
        .split(",");

      // adjust based on alpha value
      let factor = a ? parseInt(a) / 255 : 1;
      let colorBrightness = Math.floor((factor * (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114)) / 1000);

      getImageBrightness(imageSrc, function (imageBrightness) {
        // very simplistic contrast, seems to work well enough
        contrast = imageBrightness - colorBrightness;
        callback(contrast, colorBrightness, imageBrightness);
      });
    }

    // improve contast of favicon and tab background color
    function improveContrast(tabId, changeInfo) {
      let imageSrc = changeInfo.favIconUrl;

      if (imageSrc !== undefined) {
        let tab = document.querySelector(`#browser .tab-position #tab-${tabId}`);
        let elementInBackground, property;

        // switching to dev console was throwing error because tab doesn't exist
        if (!tab) return;

        // figure out which element needs to be checked for background color
        if (tab.classList.contains("active")) {
          elementInBackground = "#browser .tab-position .tab.active";
          property = "background-color";
        } else {
          elementInBackground = "#browser";
          property = "background";
        }

        let backgroundColor = window
          .getComputedStyle(document.querySelector(elementInBackground))
          .getPropertyValue(property);

        getImageToColorContrast(imageSrc, backgroundColor, function (contrast, colorBrightness, imageBrightness) {
          DEBUG && console.log("----------");
          DEBUG && console.log(tabId + ": " + imageSrc);
          DEBUG && console.log("ColorBrightness: " + colorBrightness);
          DEBUG && console.log("FaviconBrightness: " + imageBrightness);
          DEBUG && console.log("Contrast: " + contrast);
          let brightnessAmount;
          let inverted = "";
          if (colorBrightness < 128) {
            // For Dark background colors
            let oldMax = 10;
            let oldMin = -50;
            let newMax = 1;
            let newMin = 31;
            // scale the contrast value onto a new range for filter values that work better
            brightnessAmount = ((contrast - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
            // constrain the filter values to stay within the bounds
            brightnessAmount =
              brightnessAmount > newMin ? newMin : brightnessAmount < newMax ? newMax : brightnessAmount;
            // invert the color if it is too dark for a brightness filter to work
            if (imageBrightness < 10) {
              inverted = "invert(1) ";
              brightnessAmount = 1;
            }
          } else {
            // for light background colors
            let oldMax = -60;
            let oldMin = 0;
            let newMax = 1;
            let newMin = 0;
            // scale the contrast value onto a new range for filter values that work better
            brightnessAmount = ((contrast - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
            // constrain the filter values to stay within the bounds
            brightnessAmount =
              brightnessAmount > newMax ? newMax : brightnessAmount < newMin ? newMin : brightnessAmount;
            // invert the color if it is too light for a brightness filter to work
            if (imageBrightness > 245) {
              inverted = "invert(1) ";
              brightnessAmount = 1;
            }
          }

          // add the filters to the favicon
          tab
            .querySelector("img")
            .setAttribute("style", `filter: brightness(${brightnessAmount}) ${inverted}!important`);

          DEBUG && console.log("Filter: " + brightnessAmount);
          DEBUG && console.log("Inverted: " + (inverted === "" ? "False" : "True"));
        });
      }
    }

    // loop through all tabs of the current window to update the filters on the favicons
    function updateContrastOnAllTabs() {
      DEBUG && console.log("===========================================");
      DEBUG && console.log("updating all tab favicons...");
      let queryInfo = {
        currentWindow: true,
      };
      chrome.tabs.query(queryInfo, function (tabs) {
        tabs.forEach(function (tab) {
          let wrapper = {
            favIconUrl: tab.favIconUrl,
          };
          improveContrast(tab.id, wrapper);
        });
      });
    }

    // when a tab updates the favicon, re-evaluate the contrast
    chrome.tabs.onUpdated.addListener(improveContrast);

    // if your Vivaldi theme has the setting "Accent Color from Active Page" selected,
    // this will update all the tabs when the tab bar background color changes
    var observer = new MutationObserver(updateContrastOnAllTabs);
    var body = document.getElementById("browser").parentElement.parentElement;
    observer.observe(body, { attributes: true, attributeFilter: ["style"] });

    updateContrastOnAllTabs();
  }

  // ============================================================================================================
  // Gives Zoom Interface in the Address Bar
  //    - made by nomad on the Vivaldi Forums
  // ============================================================================================================
  function zoomControl() {
    // CONFIGURATION: ---------------------------------------------------------------
    //  - in Vivaldi's settings you can set the default page zoom, this
    //    will follow that if RESET_ZOOM_LEVEL is set to 100
    const RESET_ZOOM_LEVEL = 100; // 100 %  -> the zoom that hitting the reset button will default to
    const ZOOM_INCREMENT_AMOUNT = 10; // 10 %  -> the amount the zoom is either raised or lowered
    // MODES----------------
    // Mode 0: only clicking button opens and closes the panel
    // Mode 1: clicking the button opens the panel and the panel auto closes if not hovered over
    //    Option for mode 1:
    //        FADE_OUT_TIME  ->  the number of seconds the panel goes without hover before closing
    // Mode 2: just hovering over the button will open the panel and the panel auto closes if not hovered over
    //    Options for mode 2:
    //        FADE_OUT_TIME  ->  the number of seconds the panel goes without hover before closing
    //        IS_AUTO_OPENED_ON_ADDRESSBAR  ->  instead of only the button being hovered, the whole address bar is used
    const MODE = 1;
    // ---------------------
    // Option for modes 1 and 2:
    const FADE_OUT_TIME = 3; // 3 seconds  -> can be set to any positive half second increment (ex. 0, 0.5, 1, 1.5 ...)
    // Option for mode 2:
    const IS_AUTO_OPENED_ON_ADDRESSBAR = false;
    // ------------------------------------------------------------------------------

    // Creates the zoom button and panel initially, and then updates the icon depending on the zoom level
    function updateZoomIcon(zoomInfo) {
      let newZoom = zoomInfo.newZoomFactor;
      let zoomIconPath;

      // create the button if it isn't already there
      let alreadyExists = document.querySelector(".zoomIcon-c");
      if (!alreadyExists) {
        let zoomBtn = document.createElement("div");
        zoomBtn.setAttribute("class", "button-toolbar zoom-hover-target");
        zoomBtn.innerHTML = `
          <div class="zoom-parent">
            <div class="zoom-panel">
              <div class="page-zoom-controls-c">
                <div class="button-toolbar-c reset-zoom-c" title="Reset Zoom">
                  <button tabindex="-1" class="button-textonly-c" id="zoom-reset-c">
                    <span class="button-title">Reset</span>
                  </button>
                </div>
                <div class="button-toolbar-c" title="Zoom Out">
                  <button tabindex="-1" id="zoom-out-c">
                    <span>
                      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H5C4.44772 7 4 7.44772 4 8Z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <span class="zoom-percent-c"></span>
                <div class="button-toolbar-c" title="Zoom In">
                  <button tabindex="-1" id="zoom-in-c">
                    <span>
                      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 7V5C7 4.44772 7.44772 4 8 4C8.55228 4 9 4.44772 9 5V7H11C11.5523 7 12 7.44772 12 8C12 8.55228 11.5523 9 11 9H9V11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11V9H5C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7H7Z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button tabindex="-1" title="Adjust Zoom" id="zoom-panel-btn">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" class="zoomIcon-c">
              </svg>
            </span>
          </button>
        `;

        // inserts the button to the left of the bookmark icon
        let addressBar = document.querySelector(".addressfield > .toolbar");
        let bookmarkBtn = addressBar.querySelector(".create-bookmark");
        addressBar.insertBefore(zoomBtn, bookmarkBtn);

        // listener for the magnifying glass button to expand or collapse the control panel
        document.getElementById("zoom-panel-btn").addEventListener("click", function () {
          let nav = document.getElementsByClassName("zoom-panel")[0];
          let elementToTheLeft = nav.parentElement.parentElement.previousElementSibling;
          elementToTheLeft.style.transition = "0.5s";
          navToggle(nav, elementToTheLeft);
        });

        // listener for the zoom in button in the zoom control panel
        document.getElementById("zoom-in-c").addEventListener("click", incrementPercent);

        // listener for the zoom out button in the zoom control panel
        document.getElementById("zoom-out-c").addEventListener("click", decrementPercent);

        // listener for the zoom reset button in the zoom control panel
        document.getElementById("zoom-reset-c").addEventListener("click", resetZoom);

        // starts esentially a hover listener that modes 1 and 2 need
        if (MODE === 1 || MODE === 2) {
          zoomPanelHoverTracker();
        }
      }

      // set the icon based on the new zoom level
      if (newZoom < RESET_ZOOM_LEVEL / 100) {
        // zoomed in
        zoomIconPath = `
          <path d="M5.83 9.65a.5.5 0 00-.29.13L1.32 14c-.46.47.23 1.17.7.7l4.22-4.22a.5.5 0 00-.42-.83zm3.6-8.5a5.41 5.41 0 00-5.4 5.4 5.4 5.4 0 105.4-5.4zm0 .99a4.4 4.4 0 11-4.41 4.41 4.4 4.4 0 014.42-4.42zM7.16 6.06c-.66 0-.66.98 0 .98h4.57c.65 0 .65-.98 0-.98z"/>
        `;
      } else if (newZoom > RESET_ZOOM_LEVEL / 100) {
        // zoomed out
        zoomIconPath = `
          <path d="M5.83 9.65a.5.5 0 00-.3.13L1.31 14c-.46.47.23 1.17.7.7l4.22-4.22a.5.5 0 00-.4-.84zm3.6-8.5a5.41 5.41 0 00-5.4 5.4 5.4 5.4 0 0010.81 0 5.4 5.4 0 00-5.4-5.4zm0 .98a4.4 4.4 0 014.42 4.41 4.41 4.41 0 11-4.41-4.4zm-.06 1.63a.5.5 0 00-.43.5v1.79h-1.8c-.65 0-.65.98 0 .98h1.8v1.81c0 .66.99.66.99 0v-1.8h1.79c.65 0 .65-.99 0-1h-1.8V4.27a.5.5 0 00-.55-.5z"/>
        `;
      } else {
        // default zoom icon
        zoomIconPath = `
          <path d="M5.87 9.71c-.11.01-.2.06-.29.14l-4.37 4.37c-.46.45.23 1.14.7.68l4.36-4.37a.48.48 0 00-.41-.82zm3.55-8.36A5.33 5.33 0 004.1 6.67a5.32 5.32 0 105.32-5.32zm0 .97a4.33 4.33 0 11-4.34 4.34 4.33 4.33 0 014.34-4.35z"/>
        `;
      }

      // insert the new icon
      let zoomSVG = document.querySelector(".zoomIcon-c");
      zoomSVG.innerHTML = zoomIconPath;

      // make the percent in the controls match the current zoom level
      updatePercent(newZoom);
    }

    // Makes the zoom controls slide out
    function openNav(nav, elToLeft) {
      nav.classList.add("expanded-nav-c");
      elToLeft.classList.add("expanded-left-c");
    }

    // Hides the zoom controls
    function closeNav(nav, elToLeft) {
      nav.classList.remove("expanded-nav-c");
      elToLeft.classList.remove("expanded-left-c");
    }

    // Toggles the zoom controls open or closed depending on the current state
    function navToggle(nav, elToLeft) {
      if (nav.offsetWidth === 0) {
        return openNav(nav, elToLeft);
      } else {
        return closeNav(nav, elToLeft);
      }
    }

    // Puts the zoom level percentage in the zoom controls panel
    function updatePercent(zoomLevel) {
      let zoomPercent = Math.round(zoomLevel * 100);
      let percentageSpan = document.querySelector(".zoom-percent-c");
      percentageSpan.innerHTML = zoomPercent + " %";
    }

    // Zooms in the page by the specified increment
    function incrementPercent() {
      chrome.tabs.getZoom(function (zoomLevel) {
        let newZoomLevel = zoomLevel + ZOOM_INCREMENT_AMOUNT / 100;

        // Max zoom that Vivaldi allows is 500 %
        if (newZoomLevel <= 5) {
          chrome.tabs.setZoom(newZoomLevel, updatePercent(newZoomLevel));
        }
      });
    }

    // Zooms out the page by the specified increment
    function decrementPercent() {
      chrome.tabs.getZoom(function (zoomLevel) {
        let newZoomLevel = zoomLevel - ZOOM_INCREMENT_AMOUNT / 100;

        // Min zoom that Vivaldi allows is 20 %
        if (newZoomLevel >= 0.2) {
          chrome.tabs.setZoom(newZoomLevel, updatePercent(newZoomLevel));
        }
      });
    }

    // Sets the zoom back to the default zoom level
    //  - in Vivaldi's settings you can set the default page zoom, this
    //    will follow that if RESET_ZOOM_LEVEL is set to "100"
    function resetZoom() {
      let zoomLevel = RESET_ZOOM_LEVEL / 100;
      chrome.tabs.setZoom(zoomLevel, updatePercent(zoomLevel));
    }

    // For modes 1 and 2:
    // Tracks if you are hovering over the zoom controls
    function zoomPanelHoverTracker() {
      let zoomPanel = document.getElementsByClassName("zoom-panel")[0];
      let elementToTheLeft = zoomPanel.parentElement.parentElement.previousElementSibling;
      let isHovered = false;
      let intervalID = null;
      let count = 0;

      // selects which element must be hovered to trigger action
      let hoverElement;
      if (MODE === 2 && IS_AUTO_OPENED_ON_ADDRESSBAR) {
        let addressBar = document.querySelector(".toolbar-addressbar.toolbar-mainbar");
        hoverElement = addressBar;
      } else {
        let zoomBtnAndPanel = document.querySelector(".zoom-hover-target");
        hoverElement = zoomBtnAndPanel;
      }

      // when the element is hovered, reset the interval counter and opens the controls if needed
      hoverElement.onmouseover = function () {
        count = 0;
        isHovered = true;
        if (MODE !== 1) {
          openNav(zoomPanel, elementToTheLeft);
        }
      };

      // when the element loses hover, closes the controls if enough time has passed
      hoverElement.onmouseout = function () {
        // removes any previous counters (needed for if hover is lost and regained multiple times)
        if (intervalID) {
          clearInterval(intervalID);
        }
        isHovered = false;
        // start a counter to see how long it has been since the element was last hovered
        intervalID = setInterval(function () {
          // only increment the counter as long as hover isn't regained
          if (isHovered === false) {
            count++;
          }
          // once the correct amount of time has ellapsed, close the controls panel
          if (count >= FADE_OUT_TIME * 2) {
            closeNav(zoomPanel, elementToTheLeft);
            clearInterval(intervalID);
          }
        }, 500);
      };
    }

    // updates zoom percentage on tab change
    function tabChangeUpdateZoomWrapper() {
      chrome.tabs.getZoom(function (zoomLevel) {
        let zoomInfo = {
          newZoomFactor: zoomLevel,
        };
        updateZoomIcon(zoomInfo);
      });
    }

    // zoom change listner
    chrome.tabs.onZoomChange.addListener(updateZoomIcon);

    // Listner for active tab change
    chrome.tabs.onActivated.addListener(tabChangeUpdateZoomWrapper);
  }

  // ============================================================================================================
  // Open a set of tabs on browser startup
  //    - made by nomadic on the Vivaldi Forums
  // ============================================================================================================
  function openTabsOnStartup() {
    // CONFIG: ------------

    // Enter the URLs you want to open, Format: ["www.url1.com", "www.url2.com", "www.etc.com"]
    const URLS = ["chrome://vivaldi-webui/startpage?section=Speed-dials"];

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
      tabBorders();
      addCustomButtons();
      // saveTabsToSpeeddialBtn();
      // addSettingsBtn();
      improveFaviconContrast();
      zoomControl();
      openTabsOnStartup();
    }
  }, 300);
})();
