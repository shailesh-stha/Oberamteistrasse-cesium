export const glbUrl = {
  treeLowPoly: "./data/3d_model/tree_poly.glb",
  treewithBed: "./data/3d_model/tree_poly_with_bed.glb",
  treeWithoutBed: "./data/3d_model/tree_poly_without_bed.glb",
  test: "./data/3d_model/test.glb",
  buildWithoutGround1: "./data/3d_model/buildWithoutGround1.glb",
  buildWithoutGround2: "./data/3d_model/buildWithoutGround2.glb",
  buildWithoutGround3: "./data/3d_model/buildWithoutGround3.glb",
  buildWithoutGround4: "./data/3d_model/buildWithoutGround4.glb",

};

export const addGlb = (viewer, glbName, heading = 130, pitch = 0, roll = 0) => {
  const position = Cesium.Cartesian3.fromDegrees(9.211329, 48.489961, 5.5);

  const hpr = new Cesium.HeadingPitchRoll(
    Cesium.Math.toRadians(heading),
    Cesium.Math.toRadians(pitch),
    Cesium.Math.toRadians(roll)
  );
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr
  );

  const entity = viewer.entities.add({
    name: glbUrl[glbName],
    position: position,
    orientation: orientation,
    model: {
      uri: glbUrl[glbName],
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      scale: 1,
    },
  });
  return entity;
};

export const toggleVisibility = (entity, show) => {
  if (entity) {
    entity.show = show;
  }
};

// Load LOD2 buildings into viewer
export async function loadLod2Buildings(viewer) {
  const tileset = await Cesium.Cesium3DTileset.fromUrl(
    "https://web3d.basemap.de/cesium/buildings-floor/root.json"
  );
  // Define custom styles
  const cityStyle = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${surface} === 'wall'", "color('#f2f2f2')"],
        ["${surface} === 'roof'", "color('#ff5c4d')"],
        ["${surface} === 'bridge'", "color('#999999')"],
      ],
    },
  });
  tileset.style = cityStyle;
  // Add the tileset to the scene
  viewer.scene.primitives.add(tileset);
}
