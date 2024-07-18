import { myAccessToken, cesiumViewerOptionsGoogle3dTiles } from "./cesiumConfig.js";
import { cesiumCameraViews_noTerrain } from "./cameraSettings.js";
import { addGlb, toggleVisibility } from "./cesiumFunctions.js";

Cesium.Ion.defaultAccessToken = myAccessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer("cesiumMapContainer", cesiumViewerOptionsGoogle3dTiles);

try {
  const tileset = await Cesium.createGooglePhotorealistic3DTileset();
  viewer.scene.primitives.add(tileset);
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.globe.enableLighting = true;
  viewer.scene.msaaSamples =4;
} catch (error) {
  console.log(`Failed to load tileset: ${error}`);
}

function setCameraView(view) {
  viewer.camera.flyTo(cesiumCameraViews_noTerrain[view]);
}

// Initialize camera view
viewer.camera.setView(cesiumCameraViews_noTerrain.view1);
// Call functions
// loadLod2Buildings(viewer);

const buildingEntity1 = addGlb(viewer, 'buildWithoutGround1')
const buildingEntity2 = addGlb(viewer, 'buildWithoutGround2')
const buildingEntity3 = addGlb(viewer, 'buildWithoutGround3')
const buildingEntity4 = addGlb(viewer, 'buildWithoutGround4')
buildingEntity1.show = true;
buildingEntity2.show = false;
buildingEntity3.show = false;
buildingEntity4.show = false;

function toggleEntities(action) {
  switch (action) {
    case 'showBuild1':
      buildingEntity1.show = true;
      buildingEntity2.show = false;
      buildingEntity3.show = false;
      buildingEntity4.show = false;
      break;
    case 'showBuild2':
      buildingEntity1.show = false;
      buildingEntity2.show = true;
      buildingEntity3.show = false;
      buildingEntity4.show = false;
      break;
    case 'showBuild3':
      buildingEntity1.show = false;
      buildingEntity2.show = false;
      buildingEntity3.show = true;
      buildingEntity4.show = false;
      break;
    case 'showBuild4':
      buildingEntity1.show = false;
      buildingEntity2.show = false;
      buildingEntity3.show = false;
      buildingEntity4.show = true;
    default:
      console.error('Invalid action: ' + action);
  }
}

window.setCameraView = setCameraView;
window.toggleEntities = toggleEntities;

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