function exportScene() {
    const scene = document.querySelector('a-scene');
    if (!scene) throw console.error("no scene");

    const exporter = new THREE.GLTFExporter();
    exporter.parse(
        scene.object3D,
        // called when the gltf has been generated
        function (gltf) {
            electron.saveGLB(gltf);
        },
        // called when there is an error in the generation
        function (error) {
            console.log('An error happened', error);
        },
        { binary: true }
    );
}

function createGLTFExportBtn() {
    const glte = document.createElement("button");
    glte.innerHTML = "export scene as glb"
    glte.addEventListener("click", exportScene);
    return glte;
}

(function () {
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
        electron.savePNG({ projection: projection, dataUrl: dataURL })
    }

    window.renderPerspective = render.bind(this, "perspective")
    window.renderEquirectangular = render.bind(this, "equirectangular")
    perspBtn.addEventListener("click", window.renderPerspective);
    equirectBtn.addEventListener("click", window.renderEquirectangular);

    /* gltf export */
    let glte
    if (!THREE.GLTFExporter) {
        var script = document.createElement('script');
        script.onload = function () {
            window.exportScene = exportScene;
            glte = createGLTFExportBtn();
            div.appendChild(glte);
        };
        script.src = "https://threejs.org/examples/js/exporters/GLTFExporter.js";
        document.head.appendChild(script); //or something of the likes
    } else {
        glte = createGLTFExportBtn();
        window.exportScene = exportScene;
        div.appendChild(glte);
    }

})()