let data = [];
let index = parseInt(localStorage.getItem("portfolioIndex")) || 0;

const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

let mode = isMobile() ? "mobile" : "desktop";

const loader = document.getElementById("loaderOverlay");
const frame = document.getElementById("showcaseFrame");
const title = document.getElementById("showcaseTitle");
const dropdown = document.getElementById("siteDropdown");
const viewer = document.getElementById("viewer");

fetch("assets/websites.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });

function showLoader() {
  loader.classList.remove("opacity-0");
  loader.classList.remove("pointer-events-none");
}

function hideLoader() {
  loader.classList.add("opacity-0");
  loader.classList.add("pointer-events-none");
}

// fallback timer (fast UX)
let loadTimeout;

function render() {

  const item = data[index];

  showLoader();

  frame.src = item.url;
  title.childNodes[0].textContent = item.title + " ";

  localStorage.setItem("portfolioIndex", index);
  viewer.scrollTo({ top: 0 });

  clearTimeout(loadTimeout);
  loadTimeout = setTimeout(hideLoader, 900);

  if (!dropdown.classList.contains("hidden")) buildDropdown();
}

// hide instantly when iframe actually finishes
frame.addEventListener("load", hideLoader);

// Build dropdown items after data loads
function buildDropdown() {
  dropdown.innerHTML = "";
  data.forEach((site, i) => {
    const btn = document.createElement("button");
    btn.textContent = site.title;
    btn.className = `
      w-full text-left text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl
      transition-all duration-200 whitespace-nowrap
      ${i === index
        ? "bg-cyberblue/20 text-cyberblue"
        : "text-white/70 hover:bg-white/10 hover:text-white"}
    `;
    btn.onclick = () => {
      index = i;
      localStorage.setItem("portfolioIndex", index);
      render();
      closeDropdown();
    };
    dropdown.appendChild(btn);
  });
}

function openDropdown() {
  buildDropdown();
  dropdown.classList.remove("hidden");
  dropdown.classList.add("flex");
}

function closeDropdown() {
  dropdown.classList.add("hidden");
  dropdown.classList.remove("flex");
}

function toggleDropdown() {
  dropdown.classList.contains("hidden") ? openDropdown() : closeDropdown();
}

title.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.addEventListener("click", () => closeDropdown());
dropdown.addEventListener("click", (e) => e.stopPropagation());


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
