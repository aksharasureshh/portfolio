const canvas = document.getElementById("builder-canvas");
const addClusterBtn = document.getElementById("addCluster");

addClusterBtn.addEventListener("click", createCluster);

function createCluster() {
  const cluster = document.createElement("div");
  cluster.className = "cluster";

  // Start position
  cluster.style.left = "350px";
  cluster.style.top = "250px";

  // === MAIN CLUSTER ===
  // 1 x 18"
  addBalloon(cluster, 90, "#f7b7cc", 0, 0);

  // 3 x 12"
  addBalloon(cluster, 60, "#f49ab6", -45, 25);
  addBalloon(cluster, 60, "#f49ab6", 45, 25);
  addBalloon(cluster, 60, "#f49ab6", 0, 55);

  // 2 x 9"
  addBalloon(cluster, 45, "#ffd1e3", -30, 70);
  addBalloon(cluster, 45, "#ffd1e3", 30, 70);

  // === MINI CLUSTER (4 x 5") ===
  addBalloon(cluster, 25, "#ffffff", -15, -40);
  addBalloon(cluster, 25, "#ffffff", 15, -40);
  addBalloon(cluster, 25, "#ffffff", 0, -60);
  addBalloon(cluster, 25, "#ffffff", 20, -60);

  enableDrag(cluster);
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

function enableDrag(el) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  el.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    el.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    el.style.left = e.pageX - offsetX + "px";
    el.style.top = e.pageY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    el.style.cursor = "grab";
  });
}
