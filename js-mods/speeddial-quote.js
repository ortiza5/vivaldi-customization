(function () {
  // ============================================================================================================
  // Quote on Startpage
  // URL:         https://forum.vivaldi.net/
  // Description: Adds an inspirational quote from zenquotes.io above the speed dials on the startpage
  // Author(s):   @nomadic
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function quotesToSpeeddial() {
    // Config ------------

    // These options affect how often quotes are refreshed
    // Options:
    //   - "daily":    You will only get one quote per day. After midnight, a new quote should load
    //   - "interval": You get a new quote every n hours, where n is set with NEW_QUOTE_INTERVAL
    //   - "every":    Every time you open a startpage tab or switch back to one, there will be a new quote
    const NEW_QUOTE_FREQUENCY = "daily";
    const NEW_QUOTE_INTERVAL = 1;

    // Variables exposed for easy styling of how the quote looks, but you can also just edit the style.innerHTML
    //   if you want to do more in depth restyling.
    const QUOTE_WIDTH = "max(50%, 500px)";
    const QUOTE_BACKGROUND = "var(--colorBgAlphaBlur)";
    const QUOTE_BACKGROUND_BLUR = "var(--backgroundBlur)";
    const QUOTE_FORGROUND_COLOR = "var(--colorFg);";
    const QUOTE_FONT = "400 1.5rem 'Segoe UI', system-ui, sans-serif;";
    const QUOTE_AUTHOR_FONT = "400 13px 'Segoe UI', system-ui, sans-serif;";
    // -------------------

    function injectStyle() {
      const style = document.createElement("style");
      style.id = "quoteStyle";
      style.innerHTML = `
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        #quoteContainer {
          background: ${QUOTE_BACKGROUND};
          color: ${QUOTE_FORGROUND_COLOR};
          width: ${QUOTE_WIDTH};
          margin: auto;
          padding: 9px 9px 6px 9px;
          margin-top: 36px;
          backdrop-filter: ${QUOTE_BACKGROUND_BLUR};
          border-radius: var(--radius);
          animation: 0.4s ease-in fadein;
        }

        #quoteText {
          font: ${QUOTE_FONT};
          margin: auto;
          width: 90%;
          padding: 10px 10px 0 10px;
          text-align: center;
        }

        #quoteAuthor {
          font: ${QUOTE_AUTHOR_FONT};
          text-align: right;
          margin-top: auto;
        }

        .quoteBottomRow {
          display: flex;
          justify-content: space-between;
        }

        .quoteBottomRow > p {
          margin-top: auto;
          font-size: 11px;
          color: gray;
          opacity: 0.9;
        }
        .quoteBottomRow > p > a {
          color: unset;
        }

        #refreshQuote {
          height: 20px;
          background-color: unset;
          border: unset;
          transition: transform 0.5s;
        }
        #refreshQuote:active {
          transform: rotate(360deg);
        }

        .quoteBottomRight {
          display: flex;
        }
      `;

      document.getElementsByTagName("head")[0].appendChild(style);
    }

    // gets all quotes from storage and fails more nicely with an empty array
    async function getQuotesFromStorage() {
      return new Promise((resolve) => {
        chrome.storage.local.get(["speeddialQuotes"], function (result) {
          if (result["speeddialQuotes"] === undefined) {
            resolve([]);
          } else {
            resolve(result["speeddialQuotes"]);
          }
        });
      });
    }

    // gets a set of 50 new quotes from zenquotes.io and adds them to the end of the collection
    async function fetchNewQuotes() {
      return new Promise((resolve) => {
        fetch("https://zenquotes.io/api/quotes/")
          .then((response) => response.json())
          .then(async (quotes) => {
            let newQuotes = [];
            for (const quote of quotes) {
              const formatedQuote = { q: quote.q, a: quote.a };
              newQuotes.push(formatedQuote);
            }

            const oldQuotes = await getQuotesFromStorage();
            const allQuotes = oldQuotes.concat(newQuotes);

            chrome.storage.local.set({ speeddialQuotes: allQuotes });

            if (allQuotes.length >= 1) {
              resolve(allQuotes);
            } else {
              resolve([{ q: "APIs are great, but sometimes they break.", q: "nomadic" }]);
            }
          });
      });
    }

    // inputs the actual quote while determining if it should be new or the same as before
    async function insertQuoteText(wasManuallyrefreshed) {
      const quoteText = document.getElementById("quoteText");
      const quoteAuthor = document.getElementById("quoteAuthor");

      if (!quoteText || !quoteAuthor) return;

      // getting the quote text
      let quotes = await getQuotesFromStorage();
      // left 10 quotes as a buffer for possible API issues
      if (quotes.length < 10) {
        quotes = await fetchNewQuotes();
      }

      chrome.storage.local.get("speeddialQuotesLastUpdated", (result) => {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const currentTime = new Date();
        let oldTime;
        if (Object.keys(result).length === 0) {
          oldTime = new Date();
          chrome.storage.local.set({ speeddialQuotesLastUpdated: Date.now() });
        } else {
          oldTime = new Date(result.speeddialQuotesLastUpdated);
        }

        let useNewQuoteNextTime = false;

        switch (NEW_QUOTE_FREQUENCY) {
          default:
          case "daily":
            const currentDaysOnly = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
            const oldDaysOnly = new Date(oldTime.getFullYear(), oldTime.getMonth(), oldTime.getDate());
            const daysBetween = (currentDaysOnly.getTime() - oldDaysOnly.getTime()) / millisecondsPerDay;

            if (daysBetween >= 1) useNewQuoteNextTime = true;
            break;

          case "interval":
            const millisecondsBetween = currentTime.getTime() - oldTime.getTime();
            const hoursBetween = (millisecondsBetween / millisecondsPerDay) * 24;

            if (hoursBetween >= NEW_QUOTE_INTERVAL) useNewQuoteNextTime = true;
            break;

          case "every":
            useNewQuoteNextTime = true;
            break;
        }

        // BUG-FIX: update condition wouldn't update the shown quote until next render
        const quote = wasManuallyrefreshed || useNewQuoteNextTime ? quotes[1] : quotes[0];
        quotes.shift();

        // update storage to remove quote already used
        if (useNewQuoteNextTime || wasManuallyrefreshed) {
          chrome.storage.local.set({ speeddialQuotes: quotes, speeddialQuotesLastUpdated: Date.now() });
        }

        quoteText.innerHTML = '"' + quote.q + '"';
        quoteAuthor.innerHTML = "- " + quote.a;
      });
    }

    // adds all the html necessary to view the quote
    async function addQuoteStructureToPage() {
      const startpage = document.querySelector(".startpage");
      const oldQuote = document.getElementById("quoteContainer");

      // BUG-FIX: quote was showing up on bookmarks, history, and notes pages
      const managerPage = document.querySelector(".webpageview.active .sdwrapper .manager");
      if (managerPage) {
        if (oldQuote) oldQuote.remove();
      }

      // check if already exists and elements are valid
      if (oldQuote || !startpage) return;

      const startpageNav = document.querySelector(".startpage .startpage-navigation");
      let refrenceElement, position;

      if (startpageNav) {
        refrenceElement = startpageNav;
        position = "afterend";
      } else {
        refrenceElement = startpage;
        position = "afterbegin";
      }

      const quoteContainer = document.createElement("div");
      quoteContainer.id = "quoteContainer";
      quoteContainer.innerHTML = `
        <div class="quote">
          <blockquote id="quoteText"></blockquote>
          <div class="quoteBottomRow">
            <p>provided by <a href="https://zenquotes.io/" target="_blank" id="attributionLink">ZenQuotes API</a></p>
            <div class="quoteBottomRight">
              <p id="quoteAuthor"></p>
              <button id="refreshQuote">
                <svg viewBox="0 0 26 26" height="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6.20711C20 5.76166 19.4614 5.53857 19.1464 5.85355L17.2797 7.72031C16.9669 7.46165 16.632 7.22741 16.2774 7.02069C14.7393 6.12402 12.9324 5.80372 11.1799 6.1171C9.4273 6.43048 7.84336 7.35709 6.71134 8.73121C5.57932 10.1053 4.97303 11.8373 5.00092 13.6175C5.02881 15.3976 5.68905 17.1098 6.86356 18.4478C8.03807 19.7858 9.65025 20.6623 11.4118 20.9206C13.1733 21.179 14.9693 20.8022 16.4785 19.8578C17.5598 19.1812 18.4434 18.2447 19.0553 17.1439C19.0803 17.099 19.1048 17.0538 19.1288 17.0084C19.1844 16.9033 19.2376 16.7968 19.2883 16.689C19.5213 16.193 19.2261 15.6315 18.7038 15.466C18.2666 15.3274 17.81 15.5117 17.5224 15.8594C17.4823 15.9079 17.4455 15.9596 17.4125 16.014C17.3994 16.0356 17.3869 16.0576 17.375 16.0801C16.9237 16.9329 16.2535 17.6577 15.4259 18.1757C14.3159 18.8702 12.9951 19.1473 11.6997 18.9573C10.4042 18.7673 9.21861 18.1227 8.35485 17.1387C7.49109 16.1547 7.00554 14.8955 6.98503 13.5864C6.96452 12.2772 7.41039 11.0035 8.24291 9.99293C9.07542 8.98238 10.2403 8.30093 11.5291 8.07047C12.818 7.84001 14.1468 8.07556 15.278 8.73499C15.4839 8.85508 15.6809 8.9878 15.868 9.13202L13.8536 11.1464C13.5386 11.4614 13.7617 12 14.2071 12H20V6.20711Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      refrenceElement.insertAdjacentElement(position, quoteContainer);
      insertQuoteText();

      document.getElementById("attributionLink").addEventListener("click", () => {
        chrome.tabs.create({ url: "https://zenquotes.io/" });
      });
      document.getElementById("refreshQuote").addEventListener("click", insertQuoteText);
    }

    injectStyle();

    // only reliable way to detect new tabs including new windows with a single startpage tab
    vivaldi.tabsPrivate.onTabUpdated.addListener(addQuoteStructureToPage);

    // catches all redrawings of the startpage including theme changes and switching back to a tab
    const appendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function () {
      if (arguments[0].tagName === "DIV") {
        setTimeout(
          function () {
            if (this.classList.contains("startpage")) {
              addQuoteStructureToPage();
            }
          }.bind(this, arguments[0])
        );
      }
      return appendChild.apply(this, arguments);
    };
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      quotesToSpeeddial();
    }
  }, 100);
})();
