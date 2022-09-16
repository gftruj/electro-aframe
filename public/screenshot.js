

(function() {
    /* Create UI*/
    const div = document.createElement("div")
    const perspBtn = document.createElement("button");
    const equirectBtn = document.createElement("button");

    /* append it to the DOM */
    perspBtn.innerHTML = "Perspective render"
    equirectBtn.innerHTML = "Equirectangular render"
    div.appendChild(perspBtn);
    div.appendChild(equirectBtn);
    div.style["z-index"] = 9999;
    div.style["top"] = 0;
    div.style["position"] = "fixed";
    document.body.appendChild(div)

    /* add functionality */
    function render(_projection) {
        const projection = _projection === "perspective" ? "perspective" : "equirectangular"
        const scene = document.querySelector('a-scene');
        const canvas = scene.components.screenshot.getCanvas(projection); 
        const dataURL = canvas.toDataURL("image/png");
        electron.savePNG({projection: projection, dataUrl: dataURL})
    }

    window.renderPerspective = render.bind(this, "perspective")
    window.renderEquirectangular = render.bind(this, "equirectangular")
    perspBtn.addEventListener("click", window.renderPerspective);
    equirectBtn.addEventListener("click", window.renderEquirectangular);
})()