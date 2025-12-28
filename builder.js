document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("addCluster");
  const canvas = document.getElementById("builder-canvas");

  button.addEventListener("click", function () {
    const cluster = document.createElement("div");
    cluster.className = "cluster";
    cluster.style.left = "120px";
    cluster.style.top = "120px";

    // ---- BALLOON CLUSTER ----
    // 1 × 18"
    addBalloon(cluster, 90, 0, 0);

    // 3 × 12"
    addBalloon(cluster, 60, -45, 25);
    addBalloon(cluster, 60, 45, 25);
    addBalloon(cluster, 60, 0, 55);

    // 2 × 9"
    addBalloon(cluster, 45, -30, 70);
    addBalloon(cluster, 45, 30, 70);

    // 4 × 5"
    addBalloon(cluster, 25, -15, -40);
    addBalloon(cluster, 25, 15, -40);
    addBalloon(cluster, 25, 0, -60);
    addBalloon(cluster, 25, 20, -60);

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

