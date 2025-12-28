document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("addCluster");
  const canvas = document.getElementById("builder-canvas");

  button.addEventListener("click", function () {
    const cluster = document.createElement("div");
    cluster.className = "cluster";
    cluster.style.left = "50px";
    cluster.style.top = "50px";

    const balloon = document.createElement("div");
    balloon.className = "balloon";

    cluster.appendChild(balloon);
    canvas.appendChild(cluster);

    makeDraggable(cluster);
  });

  function makeDraggable(el) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", function (e) {
      dragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    });

    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;

      const rect = canvas.getBoundingClientRect();
      el.style.left = e.clientX - rect.left - offsetX + "px";
      el.style.top = e.clientY - rect.top - offsetY + "px";
    });

    document.addEventListener("mouseup", function () {
      dragging = false;
    });
  }
});

