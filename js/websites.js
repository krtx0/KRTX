let data = [];
let index = parseInt(localStorage.getItem("portfolioIndex")) || 0;

const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

let mode = isMobile() ? "mobile" : "desktop";

const loader = document.getElementById("loaderOverlay");
const frame = document.getElementById("showcaseFrame");
const title = document.getElementById("showcaseTitle");
const viewer = document.getElementById("viewer");

fetch("assets/websites.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });

function render() {

  const item = data[index];

  // SHOW loader
  loader.classList.remove("opacity-0");

  frame.src = item.url;
  title.textContent = item.title;

  localStorage.setItem("portfolioIndex", index);

  viewer.scrollTo({ top: 0 });
}


document.getElementById("nextBtn").onclick = () => {
  index = (index + 1) % data.length;
localStorage.setItem("portfolioIndex", index);
render();

};

frame.addEventListener("load", () => {
  loader.classList.add("opacity-0");
  setTimeout(() => {
  }, 300);
});

document.getElementById("prevBtn").onclick = () => {
  index = (index - 1 + data.length) % data.length;
localStorage.setItem("portfolioIndex", index);
render();

};

window.addEventListener("resize", () => {
  const newMode = isMobile() ? "mobile" : "desktop";
  if (newMode !== mode) {
    mode = newMode;
    render();
  }
});

const bottomNav = document.getElementById("bottomNav");
