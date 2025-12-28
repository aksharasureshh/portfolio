document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("addCluster");
  const canvas = document.getElementById("builder-canvas");

  button.addEventListener("click", function () {
    const cluster = document.createElement("div");
    cluster.className = "cluster";
    cluster.style.left = "120px";
    cluster.style.top = "120px";

    // =====================
    // MAIN BALLOON CLUSTER
    // =====================

    // 1 × 18"
    addBalloon(cluster, 90, 35, 40);

    // 3 × 12"
    addBalloon(cluster, 60, 0, 55);
    addBalloon(cluster, 60, 85, 55);
    addBalloon(cluster, 60, 35, 95);

    // 2 × 9"
    addBalloon(cluster, 45, 15, 105);
    addBalloon(cluster, 45, 70, 105);

    // =====================
    // 4 × 5" MINI CLUSTER
    // (overlapping, centered)
    // =====================

    addBalloon(cluster, 25, 48, 68);
    addBalloon(cluster, 25, 60, 68);
    addBalloon(cluster, 25, 54, 58);
    addBalloon(cluster, 25, 54, 78);

    canvas.appendChild(cluster);
    makeDraggable(cluster);
  });

  function addBalloon(parent, size, x, y) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.width = size + "px";
    balloon.style.height = size + "px";
    balloon.style.left = x + "px";
    balloon.style.top = y + "px";
    parent.appendChild(balloon);
  }

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
