document.addEventListener("visibilitychange", function () {
    console.log("/dist/visibilitychange.js");
  if (!document.hidden) {
    location.reload();
  }
});
window.onload = () => {
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    location.reload();
  }
};
