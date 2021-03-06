(function () {
  function syrup() {
    // CONFIG: ------------------------------
    const SYRUP_DURATION = 300000; // 5 minutes
    const DOES_SIGN_FLASH = false;

    // END CONFIG ---------------------------

    function addBtn() {
      let panelToolbar = document.getElementById("switch");
      let addPanelBtn = document.querySelector(".addwebpanel-wrapper");
      let oldBtn = document.getElementById("pancake");

      // check if already exists and elements are valid
      if (oldBtn || !(panelToolbar && addPanelBtn)) return;

      // create the button
      var pancakeBtn = document.createElement("button");
      pancakeBtn.title = "Syrup Level";
      pancakeBtn.tabindex = "-1";
      pancakeBtn.draggable = "true";
      pancakeBtn.id = "pancake";
      pancakeBtn.setAttribute("class", "panelbtn webviewbtn");
      pancakeBtn.innerHTML = `
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="auto" viewBox="0 0 16 16" style="width: 21px;" >
            <path id="panel-pancakes"
              d="M5 2.11c-.19 0-.3.07-.38.2-.14.25.03.4.23.52.22.11.34-.15.85-.07.51.07 1.2.38 1.83 1.46l.5-.3C7.3 2.73 6.45 2.28 5.78 2.2c-.34-.06-.59-.1-.78-.08zm3 2.33c-1.56 0-2.98.12-4.02.33-.52.11-.95.23-1.27.37-.16.08-.29.16-.4.26a.59.59 0 00-.21.43c0 .17.1.32.2.43.12.11.25.2.41.26.1.05.22.08.34.12-.1.03-.22.07-.3.11a1.4 1.4 0 00-.43.26.7.7 0 00-.22.44c0 .17.1.32.2.42.12.12.25.2.41.27.1.05.22.08.32.12-.09.03-.2.06-.29.11-.17.07-.3.15-.42.25a.7.7 0 00-.22.44v.02a4.9 4.9 0 00-1.5.84c-.37.32-.6.7-.6 1.12 0 .47.29.89.72 1.22.43.35 1.02.63 1.74.87 1.44.47 3.4.76 5.54.76 2.15 0 4.1-.29 5.54-.76.72-.23 1.3-.53 1.74-.87.44-.34.71-.75.71-1.22 0-.42-.23-.8-.58-1.12a4.89 4.89 0 00-1.5-.84h-.02a.61.61 0 00-.2-.46 1.4 1.4 0 00-.43-.26l-.3-.1c.12-.04.24-.07.33-.12.16-.07.29-.16.4-.27a.63.63 0 00.21-.42.6.6 0 00-.22-.44 1.69 1.69 0 00-.42-.27l-.3-.1c.12-.04.24-.07.33-.12.16-.07.29-.16.4-.26a.59.59 0 00.21-.43.61.61 0 00-.2-.43 1.43 1.43 0 00-.41-.26 5.73 5.73 0 00-1.27-.37A21.83 21.83 0 008 4.44zm0 .58c1.54 0 2.92.12 3.9.31.5.1.9.22 1.15.34.11.06.2.11.24.15.05.03.03.03.03 0l-.03.02a1 1 0 01-.24.16c-.25.12-.65.23-1.15.33-.32.07-.76.11-1.16.15-.23.03-.4.07-.64.08a26.12 26.12 0 01-4.2 0c-.2-.01-.36-.05-.57-.07-.44-.05-.89-.1-1.23-.16A5.37 5.37 0 012.95 6a1 1 0 01-.24-.16c-.05-.03-.03-.03-.03 0l.03-.02a.9.9 0 01.24-.15c.25-.12.65-.23 1.15-.34.98-.2 2.36-.3 3.9-.3zm3.78 1.9c.55.11.98.24 1.24.35.13.06.24.12.27.17.05.03.03.03.03 0 0-.02 0-.02-.03.02a1 1 0 01-.24.15c-.26.11-.65.23-1.15.33-.3.06-.71.1-1.08.15l-.72.08a26.36 26.36 0 01-4.23 0l-.41-.05a17.08 17.08 0 01-1.35-.18 5.35 5.35 0 01-1.15-.33 1 1 0 01-.24-.15c-.03-.04-.03-.03-.02 0l.02-.03A1.07 1.07 0 013 7.27c.26-.11.69-.24 1.25-.34l.36.04a17.67 17.67 0 003.4.25 26.17 26.17 0 003.58-.27zm0 1.62c.55.1.98.24 1.24.35.13.06.24.12.27.16.05.04.03.04.03 0a.29.29 0 000 .01c0-.02 0-.02-.03.02a1 1 0 01-.24.16 5.3 5.3 0 01-1.15.32c-.3.06-.71.1-1.08.15l-.72.08a26.36 26.36 0 01-4.23 0l-.41-.06c-.49-.04-.97-.09-1.35-.17a5.35 5.35 0 01-1.15-.32 1 1 0 01-.24-.16c-.03-.04-.03-.03-.02 0l.02-.03A1.07 1.07 0 013 8.9c.26-.12.69-.23 1.25-.35.16.04.38.05.57.07.36.06.7.12 1.13.14a26.04 26.04 0 004.14 0c.48-.03.88-.1 1.28-.15l.43-.06zm0 1.62c.55.1.98.23 1.24.35.13.05.24.11.27.16.05.03.03.03.03 0l-.03.02a1 1 0 01-.24.16 5.3 5.3 0 01-1.15.33c-.98.2-2.36.3-3.9.3s-2.92-.1-3.9-.3a5.35 5.35 0 01-1.15-.33 1 1 0 01-.24-.16c-.03-.02-.02-.02-.02 0l.02-.02a1.07 1.07 0 01.27-.16c.26-.12.69-.23 1.24-.35.16.04.38.05.58.07.36.06.7.12 1.13.14a26.04 26.04 0 004.14 0c.48-.04.88-.1 1.28-.15z" />
            <path id="panel-syrup"
              d="M2.85 4.96c-1.96.58 0 1.73 1.04 1.96.7 0 .46 3.81 1.38 3.81 1.04 0 .58-3.46 1.97-3.46 1.38 0 1.04 1.15 2.08 1.15 1.15-.23.8-.92 1.5-1.15.8-.23 2.77-.7 3-.92.23-.12 1.16-2.08-6-2.08a14 14 0 00-4.97.69z"
              fill="#c87137" />
            <path id="panel-cherry" d="M8.87 4.43c0 .46-.47 1.04-.93 1.04-.46 0-.8-.58-.8-1.04 0-.47.46-.7.92-.7s.8.24.8.7z"
              fill="red" />
          </svg>
        </span>
        <span class="progress-indicator" style="transform: scaleX(1);" id="syrup-progress"></span>
      `;
      panelToolbar.insertBefore(pancakeBtn, addPanelBtn);

      pancakeBtn.addEventListener("click", toggleMeter);
    }

    function addMeter() {
      let webContainer = document.getElementById("webview-container");
      let oldMeter = document.getElementById("syrup-meter");
      let oldSign = document.getElementById("syrup-sign");

      // check if already exists and elements are valid
      if (oldMeter || oldSign || !webContainer) return;

      // create the sign
      let sign = document.createElement("div");
      sign.id = "syrup-sign";
      sign.style = `
      position: absolute;
      left: 60px;
      height: 20%;
      z-index: 1;
      display: none;
      `;
      sign.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.06 46.27" height="auto" version="1.1">
          <defs>
            <filter id="filter-glow" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="1" flood-color="red" result="flood" id="feFlood1102" />
              <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite1" id="feComposite1104" />
              <feGaussianBlur in="composite1" stdDeviation="1.2" result="blur" id="feGaussianBlur1106" />
              <feOffset dx="0" dy="0" result="offset" id="feOffset1108" />
              <feComposite in="SourceGraphic" in2="offset" operator="over" result="composite2" id="feComposite1110" />
            </filter>
          </defs>
          <path d="M3.41 5.3v21.97h58.22V5.3zm9.27 25.59v14.97h39.7V30.9z" fill="#333" />
          <path
            d="M14 0v4.72H3.4a.59.59 0 00-.58.58v21.97a.59.59 0 00.58.59H19.9v2.63h-7.21a.4.4 0 00-.4.4v14.97a.4.4 0 00.4.4h39.7a.4.4 0 00.4-.4V30.9a.4.4 0 00-.4-.4h-7.23v-2.63h16.48a.59.59 0 00.59-.59V5.3a.59.59 0 00-.59-.58H51.05V0h-1.59v4.72H15.6V0zM4 5.89h57.05v20.8H4zm16.98 21.97h23.1v2.63h-23.1zm-7.9 3.43h38.9v14.17h-38.9z"
            fill="#474747" />
          <path
            d="M6.8 7.52a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41A1.41 1.41 0 006.8 7.52zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.4-1.42 1.41 1.41 0 00-.02 0zm3.68 0a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zM6.8 11.2a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42A1.41 1.41 0 006.8 11.2zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.4-1.41 1.41 1.41 0 00-.02 0zm3.68 0a1.41 1.41 0 00-1.41 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zM6.8 14.87a1.41 1.41 0 00-1.4 1.42A1.41 1.41 0 006.8 17.7a1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.4-1.42 1.41 1.41 0 00-.02 0zm3.68 0a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zM6.8 18.55a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.4-1.41 1.41 1.41 0 00-.02 0zm3.68 0a1.41 1.41 0 00-1.41 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zM6.8 22.22a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.4-1.42 1.41 1.41 0 00-.02 0zm3.68 0a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42z"
            fill="black" />
          <path id="sign-full"
            d="M6.8 7.52a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41A1.41 1.41 0 006.8 7.52zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zM6.79 11.2a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42A1.41 1.41 0 006.8 11.2zm14.7 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.41 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm-44.1 3.67a1.41 1.41 0 00-1.4 1.42A1.41 1.41 0 006.8 17.7a1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm-44.1 3.68a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm14.7 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.41 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm-44.1 3.67a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm14.7 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.41 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42z"
            fill="red" filter="url(#filter-glow)" opacity="0" />
          <path id="sign-low"
            d="M10.47 7.52a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 00.02 0 1.41 1.41 0 00.1 0 1.41 1.41 0 001.3-1.41 1.41 1.41 0 000-.01 1.41 1.41 0 00-1.41-1.4 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm14.7 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm-44.1 3.68a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.42 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.42 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm14.7 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm-44.1 3.67a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.42 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.42 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.4-1.42 1.41 1.41 0 00-.02 0zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm-44.1 3.68a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.42 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm14.7 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.42 1.42 1.41 1.41 0 001.41-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm7.35 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.68 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.41 1.41 1.41 1.41 0 001.41 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.42-1.41zm3.67 0a1.41 1.41 0 00-1.4 1.41 1.41 1.41 0 001.4 1.42 1.41 1.41 0 001.42-1.42 1.41 1.41 0 00-1.41-1.41 1.41 1.41 0 00-.01 0zm-44.1 3.67a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.42 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm3.68 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.41-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0zm3.67 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm7.35 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.41 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.42-1.42zm14.7 0a1.41 1.41 0 00-1.4 1.42 1.41 1.41 0 001.4 1.41 1.41 1.41 0 001.42-1.41 1.41 1.41 0 00-1.41-1.42 1.41 1.41 0 00-.01 0z"
            fill="red" filter="url(#filter-glow)" opacity="0" />
          <g id="refill-button" >
            <path
              d="M17.55 33.09H47.5c1.55 0 2.8 1.32 2.8 2.96v4.65a2.88 2.88 0 01-2.8 2.96H17.55a2.88 2.88 0 01-2.8-2.96v-4.65a2.88 2.88 0 012.8-2.96z"
              fill="red" />
            <path
              d="M17.55 33.09a3.15 3.15 0 00-3.06 3.22v4.66a3.15 3.15 0 003.06 3.22H47.5c1.7 0 3.07-1.45 3.07-3.22V36.3a3.15 3.15 0 00-3.07-3.22zm0 .53H47.5c1.4 0 2.54 1.19 2.54 2.7v4.65c0 1.5-1.14 2.7-2.54 2.7H17.55c-1.4 0-2.54-1.2-2.54-2.7V36.3c0-1.5 1.14-2.7 2.54-2.7zM44.13 35v.67h1.19v-.67h-.6zm1.5.84l-.33.04c-.37.07-.72.07-1.15 0-.2-.03-.3-.04-.33-.03-.04.01 0 .06.15.23.21.24.21.24.11.2a.77.77 0 00-.78.2.72.72 0 00-.22.53c0 .21.08.4.23.55l.06.05-.15.15c-.18.17-.25.28-.27.45-.02.13-.02 2.74 0 2.94.02.2.05.28.14.38.09.08.19.12.38.14h2.5c.2-.03.3-.06.38-.14.1-.1.13-.18.15-.39.02-.2.02-2.82 0-2.94-.03-.18-.08-.26-.38-.55-.55-.56-.86-.97-.88-1.17-.01-.1.03-.17.24-.4.16-.17.19-.22.15-.24zm-24.04.22c-.1 0-.26 0-.48.02a11.44 11.44 0 01-1.76 0c-.18 0-.32.02-.42.04a.63.63 0 00-.3.15.31.31 0 00-.1.23c0 .07.03.13.06.17.04.04.1.09.21.14a.4.4 0 01.22.26 3 3 0 01.05.69c0 1.05 0 1.67-.02 1.84-.01.23-.04.4-.08.5-.03.09-.1.17-.2.24a.78.78 0 00-.19.15.22.22 0 00-.04.14c0 .33.45.5 1.34.5.48 0 .82-.03 1.02-.1.2-.06.3-.18.3-.34 0-.13-.07-.23-.21-.31a.6.6 0 01-.14-.1.26.26 0 01-.06-.11 3.43 3.43 0 01-.02-1.1c.03-.06.09-.09.18-.09a.5.5 0 01.37.15c.08.1.15.26.2.49.1.36.17.62.23.79.07.17.15.3.24.42.2.25.54.37 1 .37.36 0 .64-.05.84-.14a.6.6 0 00.22-.18.38.38 0 00.1-.23.27.27 0 00-.06-.15.22.22 0 00-.11-.1c-.15-.04-.25-.08-.29-.13-.04-.05-.07-.15-.1-.31a2.16 2.16 0 00-.25-.85c-.11-.19-.3-.33-.55-.42-.12-.04-.18-.1-.18-.17 0-.05.04-.1.12-.14.18-.09.33-.23.43-.4.11-.19.16-.4.16-.61 0-.4-.15-.71-.45-.94a2.1 2.1 0 00-1.28-.37zm10.81 0h-.1c-.3.06-.89.08-1.76.08a18.1 18.1 0 01-1.84-.07.65.65 0 00-.38.1c-.1.08-.16.17-.16.27 0 .08.02.14.06.18.04.04.12.08.24.13.12.06.2.15.22.29a18.71 18.71 0 01-.02 2.92c-.02.19-.1.3-.24.36l-.2.1a.32.32 0 00-.11.25.4.4 0 00.29.38c.18.05.53.08 1.02.08a6 6 0 001.32-.11c.22-.05.33-.17.33-.36a.3.3 0 00-.07-.19.25.25 0 00-.16-.1 2.3 2.3 0 01-.23-.04.23.23 0 01-.1-.07c-.08-.1-.12-.35-.12-.77v-.33c0-.11.01-.19.05-.22.04-.04.12-.06.22-.06.16 0 .27.04.35.11.05.05.09.1.1.14.02.06.04.14.05.27.02.19.1.28.25.28.13 0 .24-.06.31-.2.13-.2.2-.53.2-.97 0-.7-.15-1.06-.45-1.06-.17 0-.28.13-.34.4-.02.08-.05.15-.1.19-.05.04-.13.06-.24.06a.72.72 0 01-.32-.05c-.06-.04-.09-.1-.09-.19a3.86 3.86 0 01.12-.87c.04-.08.14-.12.3-.12.43 0 .71.03.86.07.16.04.29.12.4.25.17.2.29.32.33.35.04.04.1.05.2.05s.2-.04.27-.13.1-.2.1-.36c0-.33-.1-.63-.32-.9-.07-.1-.16-.14-.24-.14zm5.24.06a5.53 5.53 0 00-1.23.21 1.7 1.7 0 00-.54.25c-.11.08-.17.19-.17.3 0 .08.02.14.05.2.04.05.11.1.21.16.14.08.22.2.26.38a11.71 11.71 0 010 2.47c-.03.18-.09.3-.18.34a.7.7 0 00-.2.1c-.03.04-.05.08-.05.14 0 .07.03.14.09.21a.5.5 0 00.21.15c.19.07.52.1.98.1.41 0 .7-.02.88-.08.1-.02.17-.07.22-.14a.32.32 0 00.1-.21c0-.07-.02-.11-.06-.15a.51.51 0 00-.17-.1c-.1-.05-.17-.12-.18-.2a9.42 9.42 0 01-.03-.9V38.2a20.21 20.21 0 01.1-1.72c0-.23-.1-.35-.3-.35zm2.7 0a5.53 5.53 0 00-1.23.21 1.7 1.7 0 00-.53.25c-.12.08-.17.19-.17.3 0 .08.01.14.05.2.04.05.1.1.21.16.13.08.22.2.25.38.04.16.05.54.05 1.13 0 .58-.02 1.03-.05 1.34-.03.18-.08.3-.18.34a.7.7 0 00-.2.1c-.03.04-.04.08-.04.14 0 .07.03.14.08.21a.5.5 0 00.22.15c.18.07.51.1.98.1.4 0 .7-.02.88-.08.09-.02.16-.07.22-.14a.32.32 0 00.09-.21c0-.07-.02-.11-.05-.15a.51.51 0 00-.18-.1c-.1-.05-.16-.12-.18-.2a9.42 9.42 0 01-.02-.9V38.2a20.22 20.22 0 01.09-1.72c0-.23-.1-.35-.29-.35zm-5.92 0c-.26 0-.54.06-.84.18-.3.12-.45.28-.45.49 0 .15.07.28.21.36.1.07.24.1.42.1.42 0 .77-.08 1.07-.25.18-.11.28-.26.28-.44a.36.36 0 00-.19-.32.91.91 0 00-.5-.12zm9.44.45c.06 0 .12.02.17.04.11.05.11.07.06.15-.06.1-.18.25-.33.43-.18.2-.16.2-.23.13-.1-.1-.12-.16-.12-.3 0-.11 0-.14.03-.2a.44.44 0 01.42-.25zM21 36.85c.33 0 .5.23.5.7 0 .24-.05.42-.14.53-.1.1-.26.16-.47.16-.08 0-.13-.01-.15-.04-.03-.03-.04-.09-.04-.18V38l.04-.84c0-.11.03-.19.07-.23.03-.05.1-.07.2-.07zm5.18.62a2.04 2.04 0 00-1.6.78 1.84 1.84 0 00.26 2.48c.33.29.76.44 1.27.44.5 0 .94-.15 1.32-.43.22-.17.33-.33.33-.5a.38.38 0 00-.1-.25c-.05-.07-.11-.11-.18-.11-.04 0-.11.03-.2.09-.08.06-.2.12-.34.16a1.3 1.3 0 01-.39.07.86.86 0 01-.55-.2c-.16-.15-.25-.3-.25-.45 0-.07.04-.1.11-.1h1.7c.1 0 .2-.05.26-.15a.7.7 0 00.1-.39 1.56 1.56 0 00-.56-1.06 1.8 1.8 0 00-1.18-.38zm8.76.02a6.66 6.66 0 00-1.58.37c-.2.08-.3.2-.3.34 0 .13.08.23.23.3.12.05.18.12.2.22a7.77 7.77 0 010 1.4.46.46 0 01-.17.26l-.2.18a.25.25 0 00-.04.15c0 .07.03.14.08.2s.12.1.2.13a4 4 0 001.01.1c.79 0 1.18-.15 1.18-.47 0-.05 0-.1-.04-.14a.56.56 0 00-.14-.13.5.5 0 01-.19-.22c-.03-.07-.04-.2-.04-.36v-2.1c0-.15-.07-.23-.2-.23zm9.78.61s.07.1.14.24a1 1 0 00.15.25c.03 0 .05 0 .15-.05l.11-.04-.06.38c-.08.39-.08.42-.01.42.02 0 .07-.05.2-.19l.16-.18.04.08c.02.1.04.12.08.12l.21-.04c.1-.02.19-.04.2-.03a6.14 6.14 0 01-.12.48s.04.04.09.06l.08.04-.31.26c-.35.29-.4.33-.4.35l.02.12.03.1c0 .01-.16 0-.35-.03a3.11 3.11 0 00-.34-.02c-.01 0 .01.56.03.68v.07h-.2l.01-.07c.02-.15.04-.68.03-.68l-.34.02-.35.04.02-.12c.03-.1.03-.1.01-.13a5.2 5.2 0 00-.36-.31l-.33-.28.08-.04a.3.3 0 00.1-.06l-.06-.25a5.49 5.49 0 01-.06-.23l.19.03.21.04c.04 0 .06-.02.08-.12a.28.28 0 01.03-.08l.18.18c.12.14.17.19.2.19.06 0 .06-.03-.02-.42l-.07-.38.12.04c.1.05.12.06.15.05a1 1 0 00.15-.25l.13-.24zm-18.57.02c.12 0 .22.04.3.12.07.08.1.19.1.32 0 .14-.07.21-.23.21h-.36c-.09 0-.15-.01-.19-.04-.03-.03-.05-.08-.05-.15 0-.1.04-.2.11-.3.08-.11.18-.16.32-.16z"
              fill="#fff" />
          </g>
        </svg>
      `;
      webContainer.prepend(sign);

      // create the meter
      let meter = document.createElement("div");
      meter.id = "syrup-meter";
      meter.style = `
      position: absolute;
      left: 0;
      height: 100%;
      z-index: 1;
      display: none;
      `;
      meter.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="auto" viewBox="0 0 15.13 197.66">
          <path d="M12.67 7A5.17 5.17 0 102.35 7v184.46a5.17 5.17 0 1010.32 0z" fill="black" />
          <path d="M2.36 6.3v184.9a5.17 5.17 0 1010.32 0V6.3z" fill="#e27f2a"
            style="transition: ${SYRUP_DURATION / 1000}ms ease;"
            id="syrup-1" />
          <path
            d="M12.15 6.34a4.63 1.12 0 01-4.63 1.11 4.63 1.12 0 01-4.63-1.11 4.63 1.12 0 014.63-1.12 4.63 1.12 0 014.63 1.12z"
            fill="#d1701c"
            style="transition: ${SYRUP_DURATION / 1000}ms ease;" 
            id = "syrup-2" />
          <path
            d="M7.53 1.03a5.7 5.7 0 00-5.68 5.3h-.02l.01.1V191.2a5.7 5.7 0 0011.4 0v-70.16V6.73l-.02-.3.01-.1h-.01a5.71 5.71 0 00-5.69-5.3zm0 1.06c2.46 0 4.45 1.9 4.63 4.3a.75.75 0 01-.17.16c-.19.14-.52.3-.95.45-.87.27-2.12.46-3.5.46-1.4 0-2.65-.19-3.51-.46-.43-.14-.77-.3-.96-.45a.78.78 0 01-.16-.15 4.63 4.63 0 014.62-4.31zm4.64 5.56V44.6c-.01.04-.05.1-.18.19-.19.14-.52.3-.95.44-.87.28-2.12.46-3.5.46-1.4 0-2.65-.18-3.51-.46-.43-.13-.77-.3-.96-.44a.57.57 0 01-.18-.19V7.65c.25.13.52.24.82.34 1.01.32 2.35.5 3.82.5 1.48 0 2.81-.18 3.82-.5.3-.1.58-.21.82-.34zm0 38.24v36.95c-.01.03-.05.09-.18.18-.19.15-.52.31-.95.45-.87.28-2.12.46-3.5.46-1.4 0-2.65-.18-3.51-.46-.43-.14-.77-.3-.96-.45a.57.57 0 01-.18-.18V45.89c.25.13.52.24.82.33 1.01.33 2.35.51 3.82.51 1.48 0 2.81-.18 3.82-.5.3-.1.58-.22.82-.34zm0 38.23v36.95c-.01.04-.05.1-.18.19-.19.14-.52.3-.95.45-.87.27-2.12.46-3.5.46-1.4 0-2.65-.19-3.51-.46-.43-.14-.77-.3-.96-.45a.57.57 0 01-.18-.18V84.13c.25.12.52.23.82.33 1.01.32 2.35.5 3.82.5 1.48 0 2.81-.18 3.82-.5.3-.1.58-.2.82-.34zm0 38.24v36.95c-.01.03-.05.09-.18.19-.19.14-.52.3-.95.44-.87.28-2.12.46-3.5.46-1.4 0-2.65-.18-3.51-.46-.43-.14-.77-.3-.96-.44a.57.57 0 01-.18-.19v-36.95c.25.13.52.24.82.34 1.01.32 2.35.5 3.82.5 1.48 0 2.81-.18 3.82-.5.3-.1.58-.21.82-.34zm0 38.24v30.6a4.64 4.64 0 11-9.28 0v-30.6c.25.12.52.24.82.33 1.01.33 2.35.51 3.82.51 1.48 0 2.81-.18 3.82-.5.3-.1.58-.22.82-.34z"
            fill="#7a3208" />
          <path
            d="M12.17 160.6c-.24.12-.51.23-.82.33-.85.28-1.94.45-3.15.5l3.97 3.96zm-9.28 0v7.66l9.28 9.27v-7.94L3.4 160.8a4.93 4.93 0 01-.5-.21zm0 11.86v7.94l9.28 9.26v-7.94zm0 12.13v6.6c0 .58.11 1.13.3 1.64l2.73 2.72a4.63 4.63 0 005.73-2.21z"
            fill="red" fill-opacity=".6" />
          <path
            d="M12.17 122.36c-.24.13-.51.24-.82.34-1 .32-2.34.5-3.82.5-.4 0-.8-.01-1.2-.04l5.84 5.83zm-9.28 1.56v7.94l9.28 9.26v-7.94zm0 12.13V144l9.28 9.27v-7.94zm0 12.14v7.94l4.28 4.27h.36c1.39 0 2.64-.18 3.5-.46.44-.14.77-.3.96-.44.13-.1.17-.16.18-.2v-1.85z"
            fill="#ff0" fill-opacity=".6" />
          <path
            d="M12.17 7.65c-.24.13-.51.24-.82.34-1 .32-2.34.5-3.82.5-.4 0-.8 0-1.2-.04l5.84 5.83zM2.9 9.21v7.94l6.25 6.23a9.95 9.95 0 001.9-.37c.43-.14.76-.3.95-.45.13-.1.17-.15.18-.19v-3.9zm0 12.14v1.03c.02.03.06.09.18.18.2.14.53.3.96.45.21.07.45.13.72.18z"
            fill="#0f0" fill-opacity=".6" />
          <path
            d="M-.04 0v197.66H15.1V0zm7.57 1.03c3 0 5.47 2.34 5.69 5.3h.01V191.2a5.7 5.7 0 01-11.4 0v-31.92V121.04 82.81 44.57 6.73l.01-.3v-.1h.01a5.7 5.7 0 015.68-5.3z"
            fill="var(--colorBgDark)" />
        </svg>
      `;
      webContainer.prepend(meter);
    }

    function toggleMeter() {
      let pancakeBtn = this;
      let meter = document.getElementById("syrup-meter");
      let sign = document.getElementById("syrup-sign");

      if (pancakeBtn.classList.contains("active")) {
        // change pancake button appearance
        pancakeBtn.setAttribute("class", "panelbtn webviewbtn");
        meter.style.display = "none";
        sign.style.display = "none";
      } else {
        // change pancake button appearance
        pancakeBtn.setAttribute("class", "panelbtn uifocusstop webviewbtn active");
        meter.style.display = "unset";
        sign.style.display = "unset";
      }
    }

    // Never thought I would name a function like this...
    function handleSyrupDrain() {
      let syrup1 = document.getElementById("syrup-1");
      let syrup2 = document.getElementById("syrup-2");
      let panelSyrup = document.getElementById("panel-syrup");
      let progress = document.getElementById("syrup-progress");
      let refillBtn = document.getElementById("refill-button");
      let intervalIDs = { fill: "", drain: "" };
      let syrupTranslateLowestLevel = 191;
      let syrupLevel = 1;

      function drain() {
        syrupLevel = syrupLevel - 0.001;
        showSyrupDisplay(syrupLevel);
        progress.style.transform = `scaleX(${syrupLevel})`;
        // Couldn't move a group, so separate for each part
        syrup1.setAttribute(
          "transform",
          `translate(0,${syrupTranslateLowestLevel - syrupTranslateLowestLevel * syrupLevel})`
        );
        syrup2.setAttribute(
          "transform",
          `translate(0,${syrupTranslateLowestLevel - syrupTranslateLowestLevel * syrupLevel})`
        );
        panelSyrup.setAttribute("opacity", syrupLevel + 0.2); // add 0.2 because opacity visibility decreases too much

        if (syrupLevel <= 0) {
          clearInterval(intervalIDs["drain"]);
        }
      }

      function fill() {
        syrupLevel = syrupLevel + 0.001;
        showSyrupDisplay(syrupLevel);
        progress.style.transform = `scaleX(${syrupLevel})`;
        syrup1.setAttribute(
          "transform",
          `translate(0,${syrupTranslateLowestLevel - syrupTranslateLowestLevel * syrupLevel})`
        );
        syrup2.setAttribute(
          "transform",
          `translate(0,${syrupTranslateLowestLevel - syrupTranslateLowestLevel * syrupLevel})`
        );
        panelSyrup.setAttribute("opacity", syrupLevel + 0.2);

        if (syrupLevel >= 1) {
          clearInterval(intervalIDs["fill"]);
          intervalIDs["drain"] = setInterval(drain, SYRUP_DURATION / 1000);
        }
      }

      intervalIDs["drain"] = setInterval(drain, SYRUP_DURATION / 1000);

      refillBtn.addEventListener("click", () => {
        // stop lowering syrup level
        clearInterval(intervalIDs["drain"]);
        intervalIDs["fill"] = setInterval(fill, 5);
      });
    }

    function showSyrupDisplay(syrupLevel) {
      let full = document.getElementById("sign-full");
      let low = document.getElementById("sign-low");
      // convert to more usable range for mod math
      syrupLevel = syrupLevel.toPrecision(3) * 1000;

      if (syrupLevel > 910) {
        full.setAttribute("opacity", "1");
      } else if (DOES_SIGN_FLASH && syrupLevel >= 850) {
        if (syrupLevel % 8 == 0) full.setAttribute("opacity", "0");
        else full.setAttribute("opacity", "1");
      } else if (DOES_SIGN_FLASH && syrupLevel >= 800) {
        if (syrupLevel % 4 == 0) full.setAttribute("opacity", "0");
        else full.setAttribute("opacity", "1");
      } else if (syrupLevel >= 400) {
        full.setAttribute("opacity", "0");
        low.setAttribute("opacity", "0");
      } else if (DOES_SIGN_FLASH && syrupLevel >= 300) {
        if (syrupLevel % 8 == 0) low.setAttribute("opacity", "1");
        else low.setAttribute("opacity", "0");
      } else if (DOES_SIGN_FLASH && syrupLevel >= 200) {
        if (syrupLevel % 8 == 0) low.setAttribute("opacity", "0");
        else low.setAttribute("opacity", "1");
      } else {
        low.setAttribute("opacity", "1");
      }
    }

    addBtn();
    addMeter();
    handleSyrupDrain();
  }

  let intervalID = setInterval(() => {
    const browser = document.getElementById("browser");
    if (browser) {
      clearInterval(intervalID);
      syrup();
    }
  }, 300);
})();
