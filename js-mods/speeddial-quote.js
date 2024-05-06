(function () {
  // ============================================================================================================
  // Quote on Startpage
  // URL:         https://forum.vivaldi.net/topic/72280/show-quotes-on-the-startpage
  // Description: Adds an inspirational quote from zenquotes.io above the speed dials on the startpage
  // Author(s):   @nomadic
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function quotesToSpeeddial() {
    // Config ------------

    // Select which API you want to pull quotes from. The list of options is in the API_PROVIDERS variable at the
    //   bottom of this configuration section.
    // Some of the APIs require a unique key to function. Leave the API_KEY variable set to "" unless you know
    //   the API requires it. If it is missing and it is required, the mod will display instructions on how to
    //   obtain the required key.
    const API_CHOICE = "ZenQuotes API";
    const API_KEY = "";

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

    // List of available API providers to pull quotes from
    const API_PROVIDERS = {
      "ZenQuotes API": {
        description: "Collection of inspirational quotes from infuential figures throughout history.",
        homePageUrl: "https://zenquotes.io/",
        requestUrl: "https://zenquotes.io/api/quotes/",
        cached: true,
        quotesSelector: (response) => {
          return response;
        },
        quoteTextSelector: (quote) => {
          return quote.q;
        },
        quoteAuthorSelector: (quote) => {
          return quote.a;
        },
      },
      "BSD/Linux fortune(6) cookies": {
        description: "A mix of sayings like those found on fortune cookies, quotations from famous people, jokes, or poetry taken from the BSD/Linux program Fortune.",
        homePageUrl: "https://www.fortune.ninja/info/bsd_linux.html",
        requestUrl: `https://www.fortune.ninja/fortune/bsd_linux.json?apikey=${API_KEY}`,
        apiKeyInstructions:
          "Necessary API key missing from configuration. Input your email in the 'const API_KEY = \"\";' of the Config. section at the top of the mod to use as the API key.",
        cached: false,
        quotesSelector: (response) => {
          return response.raw;
        },
        quoteTextSelector: (quote) => {
          return quote.split("-- ")[0];
        },
        quoteAuthorSelector: (quote) => {
          const author = quote.split("-- ")[1];
          return author ? author : "";
        },
      },
      "Recite API": {
        description: "Quotes taken from well known/less known novels written by amazing authors.",
        homePageUrl: "https://github.com/Sumansourabh14/recite",
        requestUrl: "https://recite.onrender.com/random/quote",
        cached: false,
        quotesSelector: (response) => {
          return response.data;
        },
        quoteTextSelector: (data) => {
          return data.quote;
        },
        quoteAuthorSelector: (data) => {
          return `"${data.book}" by ${data.author}`;
        },
      },
      "Wordnik API": {
        description: "Get a new word and definition every day.",
        homePageUrl: "https://developer.wordnik.com/",
        requestUrl: `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`,
        apiKeyInstructions:
          "Necessary API key missing from configuration. Go to developer.wordnik.com, create an account, request a free API key, and enter it in the 'const API_KEY = \"\";' of the Config. API key requests take about a week.",
        cached: false,
        quotesSelector: (response) => {
          return response;
        },
        quoteTextSelector: (wordData) => {
          const word = wordData.word;
          const definitions = wordData.definitions;

          let formatedText = `
          <div class="word-wrapper">
            <h2 class="word-word">${word}</h2>`;
          for (def of definitions) {
            formatedText += `<span class="word-partOfSpeech">(${def.partOfSpeech}) </span>${def.text}<br>`;
          }
          formatedText += `<a href="https://www.wordnik.com/words/${word}" class="word-link" title="https://www.wordnik.com/words/${word}" target="_blank">Learn more</a>
          </div>`;

          return formatedText;
        },
        quoteAuthorSelector: () => {
          return "";
        },
      },
      // "API Name Here": {
      //   description: "",
      //   homePageUrl: "",
      //   requestUrl: "",
      //   apiKeyInstructions: "",
      //   cached: false,
      //   quotesSelector: (APIresponse) => {
      //     return;
      //   },
      //   quoteTextSelector: (quoteData) => {
      //     return;
      //   },
      //   quoteAuthorSelector: (quoteData) => {
      //     return;
      //   },
      // },
    };
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
          max-height: 145px;
          overflow-y: auto;
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
          font-size: 0.7rem;
          color: gray;
          opacity: 0.9;
        }
        .quoteBottomRow > p > a {
          color: unset;
        }

        #copyQuote,
        #refreshQuote {
          height: 20px;
          background-color: unset;
          border: unset;
          transition: transform 0.5s;
          padding: unset;
          padding-left: 6px;
          transition: fill 0.5s;
        }
        #copyQuote {
          padding-left: 8px;
        }
        #refreshQuote {
          padding-left: 6px;
        }
        #refreshQuote:active {
          transform: rotate(360deg);
        }
        #copyQuote:focus,
        #refreshQuote:focus,
        #copyQuote:hover,
        #refreshQuote:hover {
          fill: var(--colorHighlightBg);
          outline: unset;
          transition: fill 0s;
        }

        .quoteBottomRight {
          display: flex;
        }

        #quoteContainer {
          user-select: text;
        }
        .quoteBottomRow > p {
          user-select: none;
        }

        .successFill {
          fill: var(--colorSuccessBg) !important;
        }

        .word-wrapper {
          text-align: left;
        }
        .word-word {
          color: var(--colorHighlightBg);
          margin-bottom: 0.3rem;
        }
        .word-partOfSpeech {
          opacity: 0.8;
          font-size: 1.1rem;
        }
        .word-link {
          opacity: 0.8;
          color: unset !important;
          font-size: 0.9rem;
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

    // gets quotes from the API provider and adds it to the end of the collection
    async function fetchNewQuotes() {
      return new Promise((resolve) => {
        // Make sure API key is set if necessary and display instructions for obtaining one if it isn't set
        if ("apiKeyInstructions" in API_PROVIDERS[API_CHOICE] && ((typeof API_KEY === "string" && API_KEY.length === 0) || typeof API_KEY !== "string")) {
          resolve([{ q: API_PROVIDERS[API_CHOICE].apiKeyInstructions, a: "" }]);
        } else {
          fetch(API_PROVIDERS[API_CHOICE].requestUrl)
            .then((response) => response.json())
            .then(async (response) => {
              let newQuotes = [];

              // extract quotes from response
              let quotes = API_PROVIDERS[API_CHOICE].quotesSelector(response);
              // Make non-cached API responses itterable
              if (!API_PROVIDERS[API_CHOICE].cached) {
                quotes = [quotes];
              }

              // extract quote info
              for (const quote of quotes) {
                const formatedQuote = {
                  q: API_PROVIDERS[API_CHOICE].quoteTextSelector(quote),
                  a: API_PROVIDERS[API_CHOICE].quoteAuthorSelector(quote),
                };
                newQuotes.push(formatedQuote);
              }

              const oldQuotes = await getQuotesFromStorage();
              const allQuotes = oldQuotes.concat(newQuotes);

              chrome.storage.local.set({ speeddialQuotes: allQuotes });

              if (allQuotes.length >= 1) {
                resolve(allQuotes);
              } else {
                resolve([{ q: "APIs are great, but sometimes they break.", a: "nomadic" }]);
              }
            });
        }
      });
    }

    // inputs the actual quote while determining if it should be new or the same as before
    async function insertQuoteText(wasManuallyrefreshed) {
      const quoteText = document.getElementById("quoteText");
      const quoteAuthor = document.getElementById("quoteAuthor");
      const refreshQuote = document.getElementById("refreshQuote");

      if (!quoteText || !quoteAuthor) return;

      // Remove all quotes from cache if Ctrl is pressed while refreshing
      if (wasManuallyrefreshed && wasManuallyrefreshed.ctrlKey) {
        await clearQuoteCache();
      }

      // getting the quote text
      let quotes = await getQuotesFromStorage();
      // left 10 quotes as a buffer for possible API issues
      let cacheBuffer = 10;
      if (!API_PROVIDERS[API_CHOICE].cached) cacheBuffer = 0;
      if (quotes.length <= cacheBuffer) {
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
        let quote = wasManuallyrefreshed || useNewQuoteNextTime ? quotes[1] : quotes[0];
        quotes.shift();

        // update storage to remove quote already used
        if (useNewQuoteNextTime || wasManuallyrefreshed) {
          chrome.storage.local.set({ speeddialQuotes: quotes, speeddialQuotesLastUpdated: Date.now() });
        }

        // fun
        const secret = [
          "\x67\x65\x74\x4D\x6F\x6E\x74\x68",
          "\x67\x65\x74\x44\x61\x74\x65",
          "\x54\x6F\x20\x63\x6F\x6E\x74\x69\x6E\x75\x65\x20\x72\x65\x63\x65\x69\x76\x69\x6E\x67\x20\x71\x75\x6F\x74\x65\x73\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x70\x61\x79\x20\x61\x20\x6F\x6E\x65\x20\x74\x69\x6D\x65\x20\x66\x65\x65\x20\x6F\x66\x20\x24\x32\x30\x20\x55\x53\x44\x2E\x2E\x2E\x3C\x62\x72\x3E\x3C\x62\x72\x3E\x4A\x75\x73\x74\x20\x6B\x69\x64\x64\x69\x6E\x67\x3B\x20\x48\x61\x70\x70\x79\x20\x41\x70\x72\x69\x6C\x20\x46\x6F\x6F\x6C\x73\x27\x20\x44\x61\x79\x21\x3C\x62\x72\x3E\x28\x72\x65\x66\x72\x65\x73\x68\x20\x66\x6F\x72\x20\x61\x20\x72\x65\x61\x6C\x20\x71\x75\x6F\x74\x65\x29",
          "\x6E\x6F\x6D\x61\x64\x69\x63",
        ];
        3 !== currentTime[secret[0]]() || 1 !== currentTime[secret[1]]() || shown || ((quote = { q: secret[2], a: secret[3] }), (shown = !0));

        // retry if error occurs
        if (!quote) {
          insertQuoteText();
          return;
        }

        quoteText.innerHTML = quote.q;
        // Only display author if provided
        if (typeof quote.a === "string" && quote.a.length !== 0) {
          quoteAuthor.innerHTML = "- " + quote.a;
        } else {
          quoteAuthor.innerHTML = "";
        }
      });

      setTimeout(function () {
        refreshQuote.blur();
      }, 700);
    }

    // adds all the html necessary to view the quote
    async function addQuoteStructureToPage() {
      const startpage = document.querySelector(".webpageview.active .startpage");
      const oldQuote = document.getElementById("quoteContainer");

      // BUG-FIX: quote was showing up on bookmarks, history, and notes pages
      const managerPage = document.querySelector(".webpageview.active .sdwrapper .manager");
      if (managerPage) {
        if (oldQuote) oldQuote.remove();
        return;
      }

      // check if already exists and elements are valid
      if (oldQuote || !startpage) return;

      const startpageNav = document.querySelector(".webpageview.active .startpage .startpage-navigation");
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
            <p>provided by <a href="" title="${API_PROVIDERS[API_CHOICE].description}" target="_blank" id="attributionLink">${API_CHOICE}</a></p>
            <div class="quoteBottomRight">
              <p id="quoteAuthor"></p>
              <button id="copyQuote" title="Copy quote">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" height="20px">
                  <path fill-rule="evenodd" d="M10 5.51c-.82 0-1.5.68-1.5 1.5v.46h-.33c-.82 0-1.5.68-1.5 1.5v10.02c0 .82.68 1.5 1.5 1.5h7.7c.82 0 1.5-.68 1.5-1.5v-.33h.46c.82 0 1.5-.68 1.5-1.5V7.01c0-.82-.68-1.5-1.5-1.5zm0 1.43h7.83c.05 0 .07.02.07.07v10.15c0 .05-.02.07-.07.07h-.46V11.3c0-.45-.18-.87-.5-1.18l-2.3-2.17a1.8 1.8 0 0 0-1.21-.48H9.93v-.46c0-.05.01-.07.06-.07zM8.16 8.9h5.37v1.5c0 .4.32.72.71.72h1.7V19c0 .05-.02.07-.07.07h-7.7c-.05 0-.07-.02-.07-.07V8.97c0-.05.02-.07.07-.07zm1.7 1.92c-.5 0-.9.32-.9.71 0 .4.4.72.9.72h2.4c.5 0 .9-.32.9-.72 0-.4-.4-.71-.9-.71zm0 2.82c-.5 0-.9.32-.9.72 0 .4.4.71.9.71h4.3c.5 0 .9-.32.9-.71 0-.4-.4-.72-.9-.72zm0 2.83c-.5 0-.9.32-.9.71 0 .4.4.72.9.72h4.3c.5 0 .9-.32.9-.72 0-.4-.4-.71-.9-.71z"/>
                </svg>
              </button>
              <button id="refreshQuote" title="Load new quote (Ctrl + Click to clear cache)">
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
        chrome.tabs.create({ url: API_PROVIDERS[API_CHOICE].homePageUrl });
      });
      document.getElementById("copyQuote").addEventListener("click", copyTextFromElement);
      document.getElementById("refreshQuote").addEventListener("click", insertQuoteText);
    }

    // based off of  https://stackoverflow.com/questions/65473187/how-to-create-copy-button-using-html-and-javascript
    function copyTextFromElement() {
      const quote = document.getElementById("quoteContainer");
      const copyButton = document.getElementById("copyQuote");

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(quote);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
      window.getSelection().removeAllRanges();
      // show the action was successful
      copyButton.classList.add("successFill");
      setTimeout(function () {
        copyButton.classList.remove("successFill");
        copyButton.blur();
      }, 700);
    }

    async function clearQuoteCache() {
      chrome.storage.local.set({ speeddialQuotes: [{ q: "Cleared quotes from cache.", a: "" }], speeddialQuotesLastUpdated: Date.now() });
    }

    // Removes old quotes if an API change is made
    function checkApiChoice() {
      chrome.storage.local.get("speeddialQuotesApiChoice", (result) => {
        const storedApiChoice = result.speeddialQuotesApiChoice;
        if (Object.keys(result).length !== 0 && API_CHOICE !== storedApiChoice) {
          clearQuoteCache();
        }
        chrome.storage.local.set({ speeddialQuotesApiChoice: API_CHOICE });
      });
    }

    injectStyle();
    checkApiChoice();

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

    let shown = false;
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      quotesToSpeeddial();
    }
  }, 100);
})();
