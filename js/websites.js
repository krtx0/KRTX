let data = [];
let index = parseInt(localStorage.getItem("portfolioIndex")) || 0;

const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

let mode = isMobile() ? "mobile" : "desktop";


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
  frame.src = item.url;
  title.textContent = item.title;
  localStorage.setItem("portfolioIndex", index);


  viewer.scrollTo({ top: 0, behavior: "instant" });
}


document.getElementById("nextBtn").onclick = () => {
  index = (index + 1) % data.length;
localStorage.setItem("portfolioIndex", index);
render();

};

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

let lastY = 0;
let ticking = false;

viewer.addEventListener("scroll", () => {

  const currentY = viewer.scrollTop;

  if (currentY > lastY) {
    // scrolling down
    bottomNav.classList.add("hide");
  } else {
    // scrolling up
    bottomNav.classList.remove("hide");
  }

  lastY = currentY;
});
