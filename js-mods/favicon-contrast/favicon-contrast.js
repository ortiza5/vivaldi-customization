(function () {
  // ============================================================================================================
  // Improves the contrast of favicons in the tab bar
  //    - made by nomadic on the Vivaldi Forums
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
            // These values may need tweaking ==================
            let oldMax = 10;
            let oldMin = -50;
            // ========================================
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
            // These values may need tweaking ==================
            let oldMax = -60;
            let oldMin = 0;
            // ========================================
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

  // Loop waiting for the browser to load the UI
  let intervalID = setInterval(function () {
    const browser = document.getElementById("browser");
    if (browser) {
      improveFaviconContrast();
      clearInterval(intervalID);
    }
  }, 300);
})();
