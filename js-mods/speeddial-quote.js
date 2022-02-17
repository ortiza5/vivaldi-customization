(function () {
  // ============================================================================================================
  // Quote on Speeddial
  // URL:         https://forum.vivaldi.net/
  // Description: Adds a quote of the day above the speed dials on the startpage
  // Author(s):   @nomadic
  // CopyRight:   No Copyright Reserved
  // ============================================================================================================
  function quotesToSpeeddial() {
    // Config ------------
    // -------------------

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

    async function addQuoteToPage(tabId, changeInfo) {
      // if the change wasn't to the URL, ignore it
      if (!changeInfo.url) return;

      // inject quote if it is the startpage
      if (changeInfo.url.startsWith("chrome://vivaldi-webui/startpage?section=Speed-dials")) {
        let quotes = await getQuotesFromStorage();

        // left 10 quotes as a buffer for possible API issues
        if (quotes.length < 10) {
          quotes = await fetchNewQuotes();
        }

        const quote = quotes.shift();
        console.log(quote);

        // update storage to remove quote already used
        chrome.storage.local.set({ speeddialQuotes: quotes });
      }
    }

    // listener for url change
    chrome.tabs.onUpdated.addListener(addQuoteToPage);
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      quotesToSpeeddial();
    }
  }, 300);
})();
