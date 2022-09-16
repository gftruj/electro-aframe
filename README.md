# electro-aframe

Electron + a-frame.<br>
IPC for saving equirectangular and perspective screenshots in the output folder.
![Alt text](sample/render-perspective-1663347683003.png "Optional title")

## usage

npm install;<br>
npm run start;

Press "equirectangular render" or "perspective render" to save a screenshot

To create a screenshot programmatically, just call:
- `window.renderPerspective` for a perspective screenshot
- `window.renderEquirectangular` for a equirectangular screenshot

Both functions block the main thread, so you can call them on each renderloop if you want to render an entire animation.
