/* ==========================================================================================================
    Normal Mode and General Window Changes
   ========================================================================================================== */

/* Color variables for browser, non-private mode, changed values have: "!important" added to them */
body {
  --colorBg: #191e22 !important;
  --colorFgIntense: #35444e !important;
  --colorAccentBg: #28343c !important;
  --colorAccentBgDark: rgba(0, 0, 0, 0.19) !important;
  /* not needed if radius set to 2px */
  --radiusRounded: 2px !important;
  --radiusRoundedLess: 2px !important;
  --radius: 2px !important;
  --radiusHalf: calc(var(--radius) * 0.5) !important;
  /* Custom */
  --closeBtnColor: red;
  --lightColorAccent: #6db4cd;
  --selectedText: #8de1fff2;
  --newTabHoverColor: rgba(0, 199, 246, 0.28);
  --bookmarkColorFill: rgb(218, 93, 93);
}

/* uncertain, need to review*/
.color-behind-tabs-off.address-top .toolbar-mainbar:after,
.color-behind-tabs-on.address-top .toolbar-mainbar:after {
  background-color: transparent;
}

/* ---------------------------------------------
    Page Navigation Buttons
   --------------------------------------------- */

/* Make homepage button look like Opera Speeddial button */
.toolbar .button-toolbar [title="Go to homepage"] svg path {
  d: path(
    "M6.36 7.02a.46.45 0 00-.46.44v4.2a.46.45 0 00.46.44h5.37a.46.45 0 00.46-.45V7.46a.46.45 0 00-.46-.44zm7.91 0a.46.45 0 00-.46.44v4.2a.46.45 0 00.46.44h5.37a.46.45 0 00.46-.45V7.46a.46.45 0 00-.46-.44zm-7.45.89h4.45v3.3H6.82zm7.91 0h4.45v3.3h-4.45zM6.36 13.9a.46.45 0 00-.46.45v4.19a.46.45 0 00.46.44h5.37a.46.45 0 00.46-.44v-4.2a.46.45 0 00-.46-.44zm7.91 0a.46.45 0 00-.46.45v4.19a.46.45 0 00.46.44h5.37a.46.45 0 00.46-.44v-4.2a.46.45 0 00-.46-.44zm-7.45.9h4.45v3.3H6.82zm7.91 0h4.45v3.3h-4.45z"
  ) !important;
}

/* Slim down reload button svg */
.toolbar .button-toolbar [title="Reload current page"] svg path,
.toolbar .button-toolbar[title="Reload current page"] svg path {
  d: path(
    "M17.93 8.07a6.94 6.94 0 10-4.86 11.86 6.9 6.9 0 006.79-5.54l-1.32-.26a5.55 5.55 0 01-5.47 4.45 5.57 5.57 0 110-11.16c1.55 0 2.91.6 3.92 1.6l-2.03 2.1 4.68.01.01-4.85z"
  ) !important;
}

/* Slim down stop button svg */
.toolbar .button-toolbar [title="Stop"] svg path {
  d: path("M20 7l-1-1-6 6-6-6-1 1 6 6-6 6 1 1 6-6 6 6 1-1-6-6") !important;
}

/* Slim down previous page button svg */
.toolbar .button-toolbar[title^="Go to previous page"] svg path,
.toolbar .button-toolbar [title^="Go to previous page"] svg path {
  d: path("M16.3 6.2L9 13l7.3 6.8.7-.7-6.5-6.1L17 7z") !important;
}

/* Slim down next page button svg */
.toolbar .button-toolbar[title^="Go to next page"] svg path,
.toolbar .button-toolbar [title^="Go to next page"] svg path {
  d: path("M9.7 6.2l-.7.7 6.5 6.1L9 19l.7.8L17 13z") !important;
}

/* ---------------------------------------------
    Address Bar Mods
   --------------------------------------------- */

/* Removes background from https indicator padlock in address bar */
.SiteInfoButton.secure,
.SiteInfoButton.certified {
  background-color: unset;
}

/* Make the address bar blend in with the background */
.toolbar-addressbar .addressfield,
.toolbar-addressbar .searchfield {
  background-color: var(--colorAccentBg);
  border-color: var(--colorAccentBg);
  color: var(--colorAccentFg);
  fill: var(--colorFg);
}

/* Highlight the whole address bar on hover */
.toolbar-addressbar .addressfield:hover,
.private .toolbar-addressbar .searchfield:hover {
  background-color: var(--colorFgIntense);
  border-color: var(--colorFgIntense);
}

/* Give a slight border around address bar to show focus */
.toolbar-addressbar .addressfield:focus-within {
  border-color: var(--lightColorAccent);
  box-shadow: unset;
  /* prevent hover effect */
  background-color: var(--colorAccentBg);
}

/* Color highlighted text in the address bar to match the border */
.UrlBar-UrlField.url.vivaldi-addressfield::selection {
  background-color: var(--selectedText);
  color: var(--colorAccentBg);
}

/* Adjust spacing from padlock */
/* .UrlBar-UrlField.url.vivaldi-addressfield {
  padding-left: 3px !important;
} */

/* Border to the right of the address bar */
.toolbar-addressbar .addressfield::after {
  content: "";
  position: absolute;
  width: 1.5px;
  height: 60%;
  bottom: 20%;
  right: -3px;
  background-color: var(--colorAccentFgFaded);
  overflow: hidden;
  transition: 0.25s;
}

/* Remove border after the address bar on hover and focus */
.toolbar-addressbar .addressfield:hover::after,
.toolbar-addressbar .addressfield:focus-within::after {
  background-color: transparent;
}

/* Border to the left of the address bar */
.toolbar-addressbar .addressfield::before {
  content: "";
  position: absolute;
  width: 1.5px;
  height: 60%;
  bottom: 20%;
  left: -2px;
  background-color: var(--colorAccentFgFaded);
  overflow: hidden;
  transition: 0.25s;
}

/* Remove border before the address bar on hover and focus*/
.toolbar-addressbar .addressfield:hover::before,
.toolbar-addressbar .addressfield:focus-within::before {
  background-color: transparent;
}

/* NO LONGER USED - Color pageload progress bar in address bar */
.addressfield .pageload.progressing,
.addressfield .pageload.progressing .pageload-ticker {
  color: var(--colorAccentFg) !important;
}

/* Color bookmark button like Opera */
.addressfield .toolbar .create-bookmark [title="Edit bookmark"] svg path {
  fill: var(--bookmarkColorFill);
}

/* ---------------------------------------------
    Vivaldi Icon Oprification
   --------------------------------------------- */

/* Shrink */
#titlebar button.vivaldi {
  height: 28px !important;
}

/* Remove icon background */
#titlebar button.vivaldi svg [fill="#ef3939"] {
  fill: none !important;
}

/* Fill the V red */
#titlebar button.vivaldi svg [fill="#fff"] {
  fill: #ef3939 !important;
}

/* Hover matches address bar below */
#titlebar button.vivaldi:hover {
  background-color: var(--colorAccentBg);
}

/* ---------------------------------------------
    Tab Bar Mods
   --------------------------------------------- */

/* Slim down new tab + */
.toolbar .button-toolbar.newtab svg path {
  d: path("M13.45 6.73h-.9v5.82H6.73v.9h5.82v5.82h.9v-5.82h5.82v-.9h-5.82") !important;
  fill-rule: unset !important;
}

/* Disable white background behind favicon on active tab */
.tab-position .tab.active .tab-header .favicon {
  filter: none !important;
}

/* Remove extra space above tabs. Necessitates changes to window action buttons */
#tabs-container.top {
  padding-top: 0px !important;
  height: 28px !important;
}

/* Make slimmer close button x for tabs */
.close svg path {
  d: path(
    "M13.67 4.96l-.63-.63L9 8.37 4.96 4.33l-.63.63L8.37 9l-4.04 4.04.63.63L9 9.63l4.04 4.04.63-.63L9.63 9"
  ) !important;
}

/* Make tab close button more visible */
.close {
  border-radius: 1px;
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  /* Pretty sure not needed... */
  /* width: 18px;
  height: 18px; */
}

/* Make tab close button x red on hover */
.close:hover svg path,
.close:active svg path {
  fill: var(--closeBtnColor);
}

/* Make tab close button visible on tabs when the tabs are sufficiently big */
/* Make sure close button is visible on active tab when tabs are shrunk */
.tab-position .tab .close,
.tab-position .tab.active.tab-small .close {
  display: block;
}

/* Hide close button on non-active tabs when tabs are shrunk */
.tab-position .tab.tab-small .close {
  display: none;
}

/* Make new tab button blend less with active tab */
.toolbar .button-toolbar.newtab:hover {
  background-color: var(--newTabHoverColor);
}

/* Really not sure... */
/* TODO: Figure out */
#vivaldi-tooltip .tab-solo {
  display: none;
}

/* Make speeddial tab favicon look like Opera */
.tab-position .tab[title="Start Page"] .tab-header .favicon img {
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABMSURBVFhH7ZQxCgAgDANTH+hj/WBd4uaggxThbgk4HTQxMjNUSHOWgQACCJz8A8O56M7b9y2c4IsOPIUVUEJWwAooISvgBAggUCwgTSL8HixilnmfAAAAAElFTkSuQmCC);
}

/* Shrink recently closed tab button */
/* TODO: Make a new icon, not necessarily copying Opera */
.toolbar-tabbar > .button-toolbar > button {
  min-height: 28px;
}

/* ---------------------------------------------
    Window Actions Button Mods
   --------------------------------------------- */

/* Remove space above menu, minamize, maximize, and close buttons */
#titlebar button {
  padding-top: 0 !important;
}

/* Change red hover color of browser close button */
#browser.win.win10 #header #titlebar .window-buttongroup button.window-close:hover {
  background-color: var(--closeBtnColor);
}

/* Shrink height of all the window action buttons */
.window-buttongroup button.window-minimize,
.window-buttongroup button.window-maximize,
.window-buttongroup button.window-close {
  height: 28px !important;
}

/* ---------------------------------------------
    Bookmark Bar Mods
   --------------------------------------------- */

/* Highlight bookmarks when they are hovered */
.color-behind-tabs-off .bookmark-bar button.highlighted,
.color-behind-tabs-on .bookmark-bar button.highlighted {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Remove line between toolbar and bookmark bar */
.address-top .toolbar-mainbar:after {
  background-color: transparent;
  content: unset;
  display: none;
}

/* Make bookmark bar the same color as the toolbar and remove bottom border from bookmark bar */
.bookmark-bar {
  background-color: var(--colorAccentBg);
  border: 0;
  height: 22px;
  margin-top: -3px;
  margin-bottom: 3px;
}

/* Before pseudo element prevented shrinking height */
.bookmark-bar button:before {
  height: 22px !important;
}

/* Make bookmark bar links have the same background as the bar */
.color-behind-tabs-off .bookmark-bar button,
.color-behind-tabs-on .bookmark-bar button {
  background-color: var(--colorAccentBg);
}

/* For bookmarks bar margin */
#main {
  background-color: var(--colorAccentBg);
}

/* ---------------------------------------------
    Extension Bar
   --------------------------------------------- */

/* Adjust height of extensions and remove left spacing */
.toolbar-addressbar .toolbar-extensions {
  padding: 3px 3px 3px 0;
  height: 34px;
}

/* border to right of extensions bar */
.toolbar-addressbar .toolbar-extensions::before {
  content: "";
  position: absolute;
  width: 1.5px;
  height: 42.36%;
  bottom: 28.82%;
  right: 0px;
  background-color: var(--colorAccentFgFaded);
  z-index: 5;
  overflow: hidden;
}

/* Shrink extensions buttons */
.toolbar-extensions .button-toolbar button {
  min-width: 28px !important;
  height: 28px;
}

/* ---------------------------------------------
    uBlock Orgin Mods - probably going to remove in favor of styling Vivaldi Content Blocker
   --------------------------------------------- */
/* Change : Ad block on image */
.toolbar-extensions .button-toolbar button[title^="uBlock Origin"] img {
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADzsAAA87AUV+OSYAAATHSURBVFhHxZdpbFRVFMfPOW+WpkzKYm1K6bCUNhAaU0QMEVEwqX4gIZiYmqiJ4IoQq4mo0aSxjBsRYjAuiTVaPpiYlOoXNfpFo8IH0aiJNsXQFkohRahQu02n7cy7x/97PMYu09epTNJf8mbuvHvuOf+7nXuHVZXmElcAM3s/x6HKNUSy5jyFQ3GdZ1Oy1ISs9ZTkjcJaqaLL0DRCSmG0/gtOOkjkWIDouzGhkxTgvsoSGr2XyKAuYy/d2JMF1BxRq/pWCveMJq43EiznlG5SkrtguRZ2+dDsWWYG/uL4/B1OvxbLOp4y1DE8opfzL3AidgenPDOXCQLwzQcuaWR4gFYwmypUbEKw22FWxiwhr03WqJokqZzGAPykzD/Dxy8jSmdeL+MexHNHZIKA2jYTXkT2ZgnKw6i5CfVRJg47hteEE4DoIoK0oHQ8EuT9e5dK4mqVOAWHRfM5yMI34u3dCFyek+AOTu+Yi1G6Ex3fPWBP9JsWkN+rLCKhnAXOCBfmycRFlBYwV+RUABYeZlV7UPgVTxeeCas+EzkTgAXlrKlzZPgjbN0XjNJhrP6zjirPJCO5EYDQ2Mh/s0pTMMSNBWwdg+OTakwcI+KbamclYDpXhnTIMH1uwvxBeZQ7e3k0arNuEaYlWNS+MXwroX4UMT8U5q1YwYeJzaBXlQYjnMJO+0HVOngCwVtPJ5ZYHHrEIt4GwQvdbeiDrwC0bEfQr8L9F4/azM9gozYhoJtEroKc1mbGrOeojDvWnNLrmAIPKJn7IX4x9rV/3gb+I6BUitktHZpfHIwtp/7Fl+Vp5K5mzG3SNTB6wQ5YNbHVOHzaNWKJQRKTh9DrKFLvjMEd/EeAeYGQPmuxVr95TvN2redhTchjRuVTMqYbub46tlxO1LZpyArYWyB2D9pU4MkquIOvgCvIUrLtQ3HbbK+/ZAr2VVKypFx2iG1teKlCWutVA8VB2ojtV4ewVV6jrMlCAGApRY55hwbNo6+1DZd800ymbpV013dqXuiUbrZts5+Eb/asZ0V2AgDmtFCM1tmBUO3aW7TyldbhZUGhbSk2BxB8g2c2a7IW4AARC/G1OzVmYiYvvM+27Zcx3euu1P4/JglA1vRPXI6IAqyw7UzmQSSZ1d7rrHBy9WTSAmQBNhXTIEymJJspOKscm9z7lTUQ0NWXcnr5H2knBcU8hqzSAgG/OdnNe51DzAAyakPJCh3xXrikBTxOlAqMWX+g2IxTrB1qfU+x2QBfceSMRkzfJ08xOjqOtACMqlZUcK/F8iUOgY/RrBMtr1kEXAzB+fvOk+ribieOV+Uy5Vp+BKdK6xmKijE70XonqqIwmPV8O8D3P/DdQEFutEu5M8Y+1/Lx1EBEVZcWIcHcB727cCqthJHlVWcF/HZhUb8HV010ls5P/k/gMK0Al3qVd/fgrhq3tyILvggRN2AgZhbhOqQW3A/eioSsLwZLqBc9zziV/gI8GlSDFzqT69TIq5i+2yBi2lsz5juJ/fkjiXUoHNFvny/kIfieNrFkJcAFo/HGkzpvdNA8gdHYC/ui8Y3gw6EPLz5jst62V/Kfk+c7E2iTpYBxHOwwRQkxO3DpvEdUV6F76LV8z2oaU/2BozEc2Z7pjKQFzB1E/wImbUHcrGYyeQAAAABJRU5ErkJggg==);
}

/* Change : Ad block off image */
.toolbar-extensions .button-toolbar button[title="uBlock Origin (off)"] img {
  content: url(data:image/png;base64,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);
}

/* ---------------------------------------------
    Status Bar
   --------------------------------------------- */

/* When using the setting "Status Info Overlay", moves the status info all the way to the corner */
#webview-container ~ .StatusInfo {
  bottom: 0;
  left: 0 !important;
}

/* ==========================================================================================================
    Popup Dialog Mods - NOT FINISHED AND MESSY
   ========================================================================================================== */
/* TODO: Rewrite popup dialog mods */

.create-bookmark > .button-popup {
  width: 250px !important;
  --popupLeftOffset: -21px !important;
  --popupWidth: 250px !important;
  border: 1.1px solid #3c4851;
  border-radius: 6px;
}

.button-popup-wrapper {
  border-radius: 6px !important;
}

.create-bookmark > .button-popup .thumbnail-image img {
  width: 235px;
  /* max-height: 150px; */
  border-radius: 6px;
  margin: 20px auto 10px auto;
  /* margin-top: 30px; */
}

.addbookmark-cardwrapper {
  background-color: #161b1f;
}

.thumbnail-image {
  background-color: unset;
}

/* .bookmark-folder-picker::after {
  content: "";
  border: solid #ccc;
  border-width: 0 2px 2px 0;
  padding: 2px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: absolute;
  right: 9px;
  bottom: 5px;
  z-index: 1;
  pointer-events: none;
} */

.addbookmark-cardwrapper .dialog-content {
  min-height: unset !important;
}

/* diable description fields for bookmark*/
/* .addbookmark-cardwrapper .dialog-content .cb-form-row:nth-last-child(1), */
/* .addbookmark-cardwrapper .dialog-content .cb-form-row:nth-last-child(2) {
  display: none;
} */

.addbookmark-cardwrapper .dialog-content {
  display: flex;
  flex-direction: column;
}

.addbookmark-cardwrapper .dialog-content .cb-form-row:nth-child(1) {
  order: 1;
}

.addbookmark-cardwrapper .dialog-content .cb-form-row:nth-child(2) {
  order: 2;
}

.addbookmark-cardwrapper .dialog-content .cb-form-row:nth-child(3) {
  order: 4;
}

.addbookmark-cardwrapper .dialog-content .cb-form-row:nth-child(4) {
  display: none;
}

.addbookmark-cardwrapper .dialog-content .cb-form-row:nth-child(5) {
  order: 3;
}

/* .addbookmark-cardwrapper .dialog-content .cb-form-row.cardview {
  padding-top: 0 !important;
} */

.button-popup footer {
  border-bottom-left-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  border-top: unset !important;
  padding-top: 0 !important;
  padding-bottom: 10px !important;
}

.dialog-add-bookmark .dialog-footer input {
  border: 1px solid #3c4851 !important;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  background-color: #28343c !important;
  padding: 2px 18px;
  display: inline-block;
  font-size: 13px;
  line-height: unset;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: unset;
}

.dialog-add-bookmark .dialog-footer input:hover {
  background-color: #3c4851 !important;
}

.dialog-add-bookmark .dialog-footer .primary {
  background-color: #00b2e3 !important;
}

.dialog-add-bookmark .dialog-footer .primary:hover {
  background-color: #009eca !important;
}

.dialog-content .cardview .bookmark-folder-picker input[type="text"] {
  background-color: #28343c;
}

/* doesn't work */
/* .dialog-content .cardview .bookmark-folder-picker input[type="text"]:hover {
  background-color: #384752;
} */

.cb-form-row select.bookmark-folders {
  cursor: pointer;
}

/* ==========================================================================================================
    Private Mode
   ========================================================================================================== */

/* Color variables for browser, private mode, changed values have: "!important" added to them */
.private {
  --colorBg: #161b1f !important;
  --colorFgIntense: #913d65 !important;
  --colorAccentBg: #6b2d4a !important;
  /* Custom */
  --lightColorAccent: #d45893;
  --selectedText: #f569acfa;
  --newTabHoverColor: rgba(246, 0, 91, 0.28);
}

/* Make the address bar blend in with the background */
.private .toolbar-addressbar .addressfield,
.private .toolbar-addressbar .searchfield {
  background-color: var(--colorAccentBg);
  border-color: var(--colorAccentBg);
  color: var(--colorAccentFg) !important;
  fill: var(--colorFg);
}

/* Highlight the whole address bar on hover */
.private .toolbar-addressbar .addressfield:hover,
.private .toolbar-addressbar .searchfield:hover {
  background-color: var(--colorFgIntense);
  border-color: var(--colorFgIntense);
}

/* Give a slight border around address bar to show focus */
.private .toolbar-addressbar .addressfield:focus-within {
  background-color: var(--colorAccentBg);
  border-color: var(--lightColorAccent);
  box-shadow: unset;
}

/* Remove background from private mode indicator */
.addressfield .private-window-indicator {
  background-color: unset;
  padding-left: 5px;
}

/* Make private mode indicator look like chrome incognito */
.addressfield .private-window-indicator svg path {
  d: path(
    "M11.66 1.83l-4.74.58-2.3-.58-1.53 3.51h10.1zm0 6.9c-1.19 0-2.16.77-2.51 1.81-.7-.2-1.32-.2-1.95-.07a2.68 2.68 0 00-5.16.98 2.65 2.65 0 105.3 0v-.28a2.77 2.77 0 011.67.14v.2a2.65 2.65 0 105.3 0 2.72 2.72 0 00-2.65-2.78zm-5.02 2.72A1.95 1.95 0 114.7 9.5a1.92 1.92 0 011.95 1.95c0-.07 0-.07 0 0zm5.02 1.95c-1.12 0-1.95-.9-1.95-1.95a2 2 0 011.95-1.95 2 2 0 011.95 1.95 2 2 0 01-1.95 1.95zM8.03 6.5c-2.78 0-5.5.47-8.01 1.46h15.96c-2.5-1-5.16-1.46-7.95-1.46z"
  );
  fill: var(--colorAccentFg);
}

/* .private .addressfield .pageload.progressing,
.private .addressfield .pageload.progressing .pageload-ticker {
  color: var(--colorAccentFg) !important;
} */

/* Color highlighted text in the address bar to match the border */
.private .UrlBar-UrlField.url.vivaldi-addressfield::selection {
  background-color: var(--selectedText);
  color: var(--colorAccentBg);
}

/* Make new tab button blend less with active tab */
.private .toolbar .button-toolbar.newtab:hover {
  background-color: var(--newTabHoverColor);
}

/* ==========================================================================================================
    Speed Dial
   ========================================================================================================== */

/* Remove speed dial backgrounds */
.startpage .dial .thumbnail-image {
  background-color: transparent;
}

/* Give slight shadow to speed dials */
.thumbnail-image {
  box-shadow: rgba(0, 0, 0, 0.2) !important;
}

/* Reduce height of speed dials */
.startpage .draggable.dial {
  height: 108px !important;
}

/* Speed dial title style */
.startpage .dials .dial .button-title {
  background-color: unset;
  color: white;
  text-shadow: 0 0 2px #000, 0 0 3px #000, 0 0 5px #000;
  opacity: 1;
}

/* Focus indicator for speed dial titles */
.startpage .dials .dial .button-title:hover,
.startpage .dials .dial .button-title:active,
.dials .dial:focus-within .editable-title-container .button-title {
  background-color: var(--colorBgIntense);
}

/* Focus indicator for speed dials */
.dials .dial:focus-within > .thumbnail-image:after {
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}

/* button.button-startpage.up svg {
  top: 2px;
} */

/* Remove speed dial folder flap */
.dials .dial.folder .folder-flap {
  display: none;
}

/* Set speed dial folder style */
.dials .dial.folder .preview {
  padding: 5% 5%;
  background-color: var(--colorAccentBg);
}

/* == Startpage Navigation Mod == */
/* Config variables for Startpage Navigation Mod */
:root {
  --startpageNavBtnPrimary: #ccc;
  --startpageNavBtnSecondary: #000;
  --startpageNavBtnRounding: 14px;
  --startpageNavBtnHeight: 23px;
  --startpageNavBtnMargin: 10px;
  --startpageNavBackground: unset;
  --startpageNavPaddingOnTop: 25px;
  --startpageNavPaddingOnBottom: 25px;
  --startpageNavTextShadow: 0 0 2px var(--startpageNavBtnSecondary), 0 0 3px var(--startpageNavBtnSecondary),
    0 0 5px var(--startpageNavBtnSecondary);
  --startpageNavIconShadow: drop-shadow(0 0 4px var(--startpageNavBtnSecondary));
}

/* Remove Startpage Nav Bar background color and shadow from bottom */
.startpage .startpage-navigation {
  background-color: unset;
  background: var(--startpageNavBackground);
  box-shadow: unset;
  padding-top: var(--startpageNavPaddingOnTop);
  /* *BUG-FIX: to show dial shadow in top row */
  padding-bottom: calc(var(--startpageNavPaddingOnBottom) - 2px);
  min-height: unset;
}

/* Remove background from folder nav */
.startpage .startpage-folder-navigation button {
  background-color: unset;
}

/* Format buttons for Startpage Nav Bar */
.startpage .startpage-navigation .button-startpage,
.startpage .startpage-folder-navigation .button-startpage {
  height: var(--startpageNavBtnHeight);
  min-height: unset;
  border-radius: var(--startpageNavBtnRounding) !important;
  border-bottom-width: unset;
  border: 1.2px solid var(--startpageNavBtnPrimary);
  color: var(--startpageNavBtnPrimary);
  padding: 2.5px 9px 4px 9px;
  margin: 0 var(--startpageNavBtnMargin) !important;
  text-shadow: var(--startpageNavTextShadow);
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  transition: 0.1s;
  font-size: 11px;
  font-weight: 500;
}

/* On hover or active class fill in background for Startpage Nav Bar buttons*/
.startpage .startpage-navigation .button-startpage.active,
.startpage .startpage-navigation .button-startpage:hover,
.startpage .startpage-folder-navigation .button-startpage:hover {
  color: var(--startpageNavBtnSecondary);
  background-color: var(--startpageNavBtnPrimary);
  text-shadow: 0 0 0.5px var(--startpageNavBtnSecondary);
}

/* Format icons for Startpage Nav Bar buttons */
.startpage .startpage-navigation .button-startpage svg,
.startpage .startpage-folder-navigation .button-startpage svg {
  fill: var(--startpageNavBtnPrimary);
  filter: var(--startpageNavIconShadow);
  margin-bottom: -3.1px;
  margin-left: 0.1px;
  height: 14px;
}

/* On hover or active class remove shadow and change icon color for Startpage Nav Bar buttons*/
.startpage .startpage-navigation .button-startpage.active svg,
.startpage .startpage-navigation .button-startpage:hover svg,
.startpage .startpage-folder-navigation .button-startpage:hover svg {
  fill: var(--startpageNavBtnSecondary);
  filter: unset;
}

/* Fix for speed dial folder position */
button.button-startpage.up svg {
  position: unset;
}

/* Remove border between speed dial folders and internal pages for Startpage Nav Bar  */
.startpage .startpage-navigation .startpage-navigation-group:last-of-type {
  border: unset;
}

/* Remove color gradient after Startpage Nav Bar buttons */
button.button-startpage:after {
  content: unset;
}

/* Make new speed dial folder add button smaller */
.startpage .startpage-navigation .button-startpage.add-set {
  padding-left: 1px;
  padding-right: 1px;
}

/* Fill the new speed dial add button icon correctly */
button.button-startpage.add-set svg path {
  fill: var(--startpageNavBtnPrimary);
}
button.button-startpage.add-set:hover svg path {
  fill: var(--startpageNavBtnSecondary);
}

/* Remove gap from the top of the speed dial items */
.speeddial {
  margin-top: 0;
  /* *BUG-FIX: to show dial shadow in top row */
  padding-top: 2px;
}

/* Fix search enabled spacing */
.sdwrapper .iconmenu-container.searchfield {
  margin: 0px auto 25px;
}

/* ==========================================================================================================
    Custom Buttons JS Mod
   ========================================================================================================== */

.button-toolbar.custom-button button {
  min-width: 28px !important;
  height: 28px;
}

.custom-btn-container {
  padding: 3px 0 3px 4px;
}

/* ==========================================================================================================
    Opera Style Tab Borders JS Mod
   ========================================================================================================== */

/* Remove slight space between tabs, made pseudo elements offcenter */
.tabs-top .tab-position .tab,
.tabs-bottom .tab-position .tab {
  margin-right: 0;
}

.before-active::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 50%;
  bottom: 25%;
  left: -0.5px;
  background-color: var(--colorAccentFgFaded);
  opacity: 0.5;
  overflow: hidden;
  /* transition: 0.15s; */
}

.after-active::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 50%;
  bottom: 25%;
  right: -0.5px;
  background-color: var(--colorAccentFgFaded);
  opacity: 0.5;
  overflow: hidden;
  /* transition: 0.15s; */
}

/* ==========================================================================================================
    Slid out Zoom Panel JS Mod
   ========================================================================================================== */
.zoom-parent {
  display: inline-block;
  position: relative;
}

.zoom-panel {
  width: 0;
  height: 22px;
  position: absolute;
  z-index: 1;
  bottom: -11.5px;
  right: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.07) 0%,
    rgba(255, 255, 255, 0.07) 96%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0;
}

.page-zoom-controls-c {
  display: inline-block;
  height: 22px;
}

.reset-zoom-c {
  display: inline-block;
}

.button-toolbar-c > button {
  height: 22px;
  border-radius: var(--radiusHalf);
  border: unset !important;
  padding-top: unset !important;
  padding-bottom: unset !important;
  color: inherit;
  align-items: center;
  justify-content: center;
}

.button-toolbar-c > button:hover {
  background-color: #46535c;
}

.button-toolbar-c {
  display: inline-block;
}

.button-textonly-c {
  width: 100% !important;
  padding-right: 6px !important;
  padding-left: 6px !important;
}

.zoom-percent-c {
  align-self: center;
  text-align: center;
  width: 40px;
  display: inline-block;
}

.expanded-nav-c {
  width: 140px !important;
  opacity: 1;
}

.expanded-left-c {
  margin-right: 140px !important;
}

.zoom-hover-target {
  transition: 0.5s;
}
