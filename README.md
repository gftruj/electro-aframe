# electro-aframe

Electron + a-frame.<br>
IPC for:
- saving equirectangular and perspective screenshots in the output folder.
<img src="sample/render-perspective-1663347683003.png" alt="drawing" width="500"/>

- or exporting the entire scene as glb<br>
<img src="sample/glbexport.png" alt="drawing" width="500"/>

## Quick start

download the repo, install the dependencies, start the app:

    git clone https://github.com/gftruj/electro-aframe.git
    npm install;
    npm run start;

Press "equirectangular render" or "perspective render" to save a screenshot

To create a screenshot programmatically, just call:
- `window.renderPerspective()` for a perspective screenshot
- `window.renderEquirectangular()` for a equirectangular screenshot

To export the scene as gltf, just call `window.exportScene()`

The above functions block the main thread, so you can call them on each renderloop if you want to render an entire animation.

### using another website

You can place your website (`index.html` and resources) in the public folder. The only important bit is loading up the `public/render-utils.js`.

The example `index.html` (simplified) looks like this:

    <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
    <script src="./render-utils.js" defer></script>
    <a-scene renderer="colorManagement: true">
      <a-assets>
        <a-asset-item id="shuttle" src="./assets/shuttle/scene.gltf"></a-asset-item>
        <a-asset-item id="space" src="./assets/space/scene.gltf"></a-asset-item>
      </a-assets>
      <a-gltf-model position="-1 4 -6" rotation="30 30 30" src="#shuttle"></a-gltf-model>
      <a-gltf-model position="-50 -20 0" scale="40 40 40" rotation="-10 0 0" src="#space"></a-gltf-model>
    </a-scene>

note, that any 'local' assets have to be in the `public` folder.
