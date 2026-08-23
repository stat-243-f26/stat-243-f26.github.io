// Pins the sidebar photo frame in place and reveals more of the (tall)
// trips.jpg image as the user scrolls the main page, instead of the
// sidebar scrolling separately.
(function () {
  function setup() {
    var link = document.querySelector(".sidebar-logo-link");
    var imgs = document.querySelectorAll(".sidebar-logo");
    if (!link || !imgs.length) return;

    function update() {
      var top = link.getBoundingClientRect().top + window.scrollY;
      var viewportHeight = window.innerHeight;
      var frameHeight = Math.max(0, viewportHeight - link.getBoundingClientRect().top);
      link.style.height = frameHeight + "px";

      var imgHeight = imgs[0].scrollHeight;
      var maxOffset = Math.max(0, imgHeight - frameHeight);

      var scrollable = document.documentElement.scrollHeight - viewportHeight;
      var progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      var offset = -progress * maxOffset;
      imgs.forEach(function (img) {
        img.style.transform = "translateY(" + offset + "px)";
      });
    }

    imgs.forEach(function (img) {
      if (img.complete) {
        update();
      } else {
        img.addEventListener("load", update);
      }
    });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
