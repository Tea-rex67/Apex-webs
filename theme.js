const desktopBtn = document.getElementById("themeToggleBtn");
const mobileBtn = document.getElementById("themeToggleBtnMobile");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  localStorage.setItem("theme", mode);

  const label = mode === "dark" ? "Theme: Light" : "Theme: Dark";

  if (desktopBtn) desktopBtn.textContent = label;
  if (mobileBtn) mobileBtn.textContent = label;
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
}

/* INIT */
(function init() {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
})();

/* EVENTS */
desktopBtn?.addEventListener("click", toggleTheme);
mobileBtn?.addEventListener("click", toggleTheme);