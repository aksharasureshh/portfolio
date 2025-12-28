document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("builder-canvas");
  const addClusterBtn = document.getElementById("addCluster");
  const palette = document.getElementById("color-palette");

  let selectedCluster = null;

  addClusterBtn.addEventListener("click", createCluster);

  function createCluster() {
    const cluster = document.createElement("div");
    cluster.className = "cluster";

    // Initial position inside canvas
    cluster.style.left = "120px";
    cluster.style.top = "300px";

    // === MAIN CLUSTER ===
    // 1 × 18"
    addBalloon(cluster, 90, "#f7b7cc", 0, 0);

    // 3 × 12"
    addBalloon(cluster, 60, "#f49ab6", -45, 25);
    addBalloon(cluster, 60, "#f49ab6", 45, 25);
    addBalloon(cluster, 60, "#f49ab6", 0, 55);

    // 2 × 9"
    addBalloon(cluster, 45, "#ffd1e3", -30, 70);
    addBalloon(cluster, 45, "#ffd1e3", 30, 70);

    // === MINI CLUSTER (4 × 5") ===
    addBalloon(cluster, 25, "#ffffff", -15, -40);
    addBalloon(cluster, 25, "#ffffff", 15, -40);
    addBalloon(cluster, 25, "#ffffff", 0, -60);
    addBalloon(cluster, 25, "#ffffff", 20, -60);

    enableDrag(cluster);
    enableColorPicker(cluster);

    canvas.appendChild(cluster);
  }

  function addBalloon(parent, size, color, x, y) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.width = size + "px";
    balloon.style.height = size + "px";
    balloon.style.background = color;
    balloon.style.left = x + "px";
    balloon.style.top = y + "px";
    parent.appendChild(balloon);
  }

  // ------------------
  // DRAGGING (FIXED)
  // ------------------
  function enableDrag(el) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      el.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const canvasRect = canvas.getBoundingClientRect();

      let x = e.clientX - canvasRect.left - offsetX;
      let y = e.clientY - canvasRect.top - offsetY;

      // Keep cluster inside canvas
      x = Math.max(0, Math.min(x, canvasRect.width - el.offsetWidth));
      y = Math.max(0, Math.min(y, canvasRect.height - el.offsetHeight));

      el.style.left = x + "px";
      el.style.top = y + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      el.style.cursor = "grab";
    });
  }

  // ------------------
  // COLOR PICKER
  // ------------------
  function enableColorPicker(cluster) {
    cluster.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedCluster = cluster;

      const rect = cluster.getBoundingClientRect();
      palette.style.left = rect.right + 10 + "px";
      palette.style.top = rect.top + "px";
      palette.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".color").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      if (!selectedCluster) return;

      const color = swatch.dataset.color;
      selectedCluster.querySelectorAll(".balloon").forEach((balloon) => {
        balloon.style.background = color;
      });
    });
  });

  // Hide palette when clicking outside
  document.addEventListener("click", () => {
    palette.classList.add("hidden");
    selectedCluster = null;
  });
});

