(function () {
  // ============================================================================================================
  // Gives Zoom Interface in the Extensions Toolbar
  //    - made by nomadic on the Vivaldi Forums
  // ============================================================================================================
  function zoomControlStatic() {
    // CONFIGURATION: ---------------------------------------------------------------
    //  - in Vivaldi's settings you can set the default page zoom, this
    //    will follow that if RESET_ZOOM_LEVEL is set to 100
    const RESET_ZOOM_LEVEL = 100; // 100 %  -> the zoom that hitting the reset button will default to
    const ZOOM_INCREMENT_AMOUNT = 10; // 10 %  -> the amount the zoom is either raised or lowered
    // ------------------------------------------------------------------------------

    // Creates the zoom controls initially, and then updates the percent depending on the zoom level
    function updatePercent(zoomInfo) {
      let newZoom = zoomInfo.newZoomFactor;

      // create the controls if they aren't already there
      let alreadyExists = document.querySelector(".page-zoom-controls-s");
      if (!alreadyExists) {
        let zoomControls = document.createElement("div");
        zoomControls.setAttribute("class", "button-toolbar");
        zoomControls.innerHTML = `
            <div class="page-zoom-controls-s">
                <div class="button-toolbar-s" title="Zoom Out">
                <button tabindex="-1" id="zoom-out-s">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H5C4.44772 7 4 7.44772 4 8Z"></path>
                    </svg>
                </button>
                </div>
                <div class="button-toolbar-s reset-zoom-s" title="Reset Zoom">
                    <button tabindex="-1" class="button-textonly-s" id="zoom-reset-s">
                        <span class="button-title" id="zoom-percent-s"></span>
                    </button>
                </div>
                <div class="button-toolbar-s" title="Zoom In">
                <button tabindex="-1" id="zoom-in-s">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 7V5C7 4.44772 7.44772 4 8 4C8.55228 4 9 4.44772 9 5V7H11C11.5523 7 12 7.44772 12 8C12 8.55228 11.5523 9 11 9H9V11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11V9H5C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7H7Z"></path>
                    </svg>
                </button>
                </div>
            </div>
          `;

        // inserts the controls to the beginning of the extensions area
        let extensionsArea = document.querySelector(".toolbar-extensions");
        extensionsArea.prepend(zoomControls);

        // listener for the zoom in button in the zoom control panel
        document.getElementById("zoom-in-s").addEventListener("click", incrementPercent);

        // listener for the zoom out button in the zoom control panel
        document.getElementById("zoom-out-s").addEventListener("click", decrementPercent);

        // listener for the zoom reset button in the zoom control panel
        document.getElementById("zoom-reset-s").addEventListener("click", resetZoom);
      }

      // Puts the zoom level percentage in the zoom controls
      let zoomPercent = Math.round(newZoom * 100);
      let percentageSpan = document.getElementById("zoom-percent-s");
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

    // CHANGE: Added in Update #1 (see original post for details)
    // updates zoom percentage on tab change
    function tabChangeUpdateZoomWrapper() {
      chrome.tabs.getZoom(function (zoomLevel) {
        let zoomInfo = {
          newZoomFactor: zoomLevel,
        };
        updatePercent(zoomInfo);
      });
    }

    // zoom change listener
    chrome.tabs.onZoomChange.addListener(updatePercent);

    // CHANGE: Added in Update #1 (see original post for details)
    // Listener for active tab change
    chrome.tabs.onActivated.addListener(tabChangeUpdateZoomWrapper);

    // CHANGE: Added in Alternative Version Update #1
    // Re-add the zoom controls after exiting fullscreen
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
              tabChangeUpdateZoomWrapper();
            }
          }
        }
      });
    });

    browserObserver.observe(browser, { attributes: true });
  }

  // Loop waiting for the browser to load the UI
  let intervalID = setInterval(function () {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      zoomControlStatic();
    }
  }, 300);
})();
