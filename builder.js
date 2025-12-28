document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("builder-canvas");
  const addBtn = document.getElementById("addCluster");

  if (!canvas || !addBtn) {
    console.error("Missing canvas or button");
    return;
  }

  addBtn.addEventListener("click", function () {
    const cluster = document.createElement("div");
    cluster.className = "cluster";
    cluster.style.left = "120px";
    cluster.style.top = "300px";

    // One big balloon (test)
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.width = "90px";
    balloon.style.height = "90px";
    balloon.style.background = "#f7b7cc";
    balloon.style.left = "0px";
    balloon.style.top = "0px";

    cluster.appendChild(balloon);
    canvas.appendChild(cluster);

    enableDrag(cluster);
  });

  function enableDrag(el) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", function (e) {
      dragging = true;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      const cRect = canvas.getBoundingClientRect();
      el.style.left = e.clientX - cRect.left - offsetX + "px";
      el.style.top = e.clientY - cRect.top - offsetY + "px";
    });

    document.addEventListener("mouseup", function () {
      dragging = false;
    });
  }
});

