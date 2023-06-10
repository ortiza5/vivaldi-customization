javascript: (function () {
  var movieTitle =
    (window.getSelection && window.getSelection()) ||
    (document.getSelection && document.getSelection()) ||
    (document.selection && document.selection.createRange && document.selection.createRange().text);
  if (movieTitle != "") {
    navigator.clipboard.writeText(movieTitle);
    window.open("https://www.justwatch.com/us/search?q=" + encodeURIComponent(movieTitle));
  } else {
    alert("You need to select a movie title.");
  }
})();

javascript: (function () {
  var movieTitle =
    (window.getSelection && window.getSelection()) ||
    (document.getSelection && document.getSelection()) ||
    (document.selection && document.selection.createRange && document.selection.createRange().text);
  "" != movieTitle
    ? (navigator.clipboard.writeText(movieTitle), window.open("https://www.justwatch.com/us/search?q=" + encodeURIComponent(movieTitle)))
    : alert("You need to select a movie title.");
})();

const movieTitle =
  (window.getSelection && window.getSelection()) ||
  (document.getSelection && document.getSelection()) ||
  (document.selection && document.selection.createRange && document.selection.createRange().text);
if (movieTitle != "") {
  navigator.clipboard.writeText(encodeURIComponent(movieTitle));
  window.open("https://www.imdb.com");
} else {
  alert("You need to highlight a movie title.");
}

navigator.clipboard.readText().then((movieTitle) => {
  const http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const url = "https://www.justwatch.com" + JSON.parse(this.responseText).items[0].full_path;
      window.location.href = url;
    }
  };
  http.open("GET", "https://apis.justwatch.com/content/titles/en_US/popular?body=%7B%22query%22%3A%22" + encodeURIComponent(movieTitle) + "%22%7D%26language%3Den", true);
  http.send();
});

navigator.clipboard.readText().then((movieTitle) => {
  const http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText).d[0];
      let url = "https://www.imdb.com/";
      if (response.id.charAt(0) === "t") {
        url += "title/" + response.id;
        const newTitle = response.l + " (" + response.y + ")";
        navigator.clipboard.writeText(newTitle);
      } else if (response.id.charAt(0) === "n") {
        url += "name/" + response.id;
      } else {
        alert("Invalid search...");
      }
      window.location.href = url;
    }
  };
  http.open("GET", "https://v2.sg.media-imdb.com/suggestion/" + movieTitle.charAt(0).toLowerCase() + "/" + encodeURIComponent(movieTitle) + ".json", true);
  http.send();
});

window.location.href = "https://www.imdb.com";
const http = new XMLHttpRequest();
http.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(url);
  }
};
http.send();

const main = document.getElementById("body");
let width = parseInt(getComputedStyle(main).getPropertyValue("--width"));
if (isNaN(width)) {
  width = 40;
}
main.style.setProperty("--width", width + 10);
const randomColor = Math.floor(Math.random() * 16777215).toString(16);
let rectangle = document.createElement("div");
rectangle.id = "rightSide";
rectangle.style = `
    z-index: 1000;
    position: absolute;
    right: 0;
    bottom: 0;
    width: ${width}px;
    height: 100%;
    background-color: #${randomColor};    
    margin: auto;`;
main.appendChild(rectangle);
setTimeout(() => {
  rectangle.remove();
}, 1000);
