import { myAccessToken, cesiumViewerOptionsGoogle3dTiles } from "./cesiumConfig.js";
import { cesiumCameraViews_noTerrain } from "./cameraSettings.js";
import { treeUrl, addTree, toggleVisibility, loadLod2Buildings } from "./cesiumFunctions.js";

Cesium.Ion.defaultAccessToken = myAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumMapContainer", cesiumViewerOptionsGoogle3dTiles);

function setCameraView(view) {
  viewer.camera.flyTo(cesiumCameraViews_noTerrain[view]);
}

// Initialize camera view
viewer.camera.setView(cesiumCameraViews_noTerrain.view1);
// Call functions
loadLod2Buildings(viewer);

const buildingEntity = addTree(viewer, 'build')

window.setCameraView = setCameraView;

// Get camera info
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function() {
  var longitude = Cesium.Math.toDegrees(viewer.camera.positionCartographic.longitude);
  var latitude = Cesium.Math.toDegrees(viewer.camera.positionCartographic.latitude);
  var height = viewer.camera.positionCartographic.height;
  var heading = Cesium.Math.toDegrees(viewer.camera.heading);
  var pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
  var roll = Cesium.Math.toDegrees(viewer.camera.roll);
  var output = `destination: Cesium.Cartesian3.fromDegrees(${longitude}, ${latitude}, ${height}),
    orientation: {
      heading: Cesium.Math.toRadians(${heading}),
      pitch: Cesium.Math.toRadians(${pitch}),
      roll: 0,
    },`;
  console.log(output);
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);