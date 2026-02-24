document.addEventListener("DOMContentLoaded", () => {

  let overlay = document.getElementById("pageTransition");

  // Auto-create overlay if missing
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "pageTransition";
    overlay.className =
      "fixed inset-0 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300 z-[9999]";
    document.body.prepend(overlay);
  }

  // Fade in (page reveal)
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    setTimeout(() => {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }, 60);
  });

  // Intercept internal navigation
  document.querySelectorAll("a[href]").forEach(link => {

    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("http")) return;

    link.addEventListener("click", function(e) {
      e.preventDefault();

      document.body.style.transition = "opacity 0.25s ease";
      document.body.style.opacity = "0.85";

      overlay.style.pointerEvents = "auto";
      overlay.style.opacity = "1";

      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });

  });

});