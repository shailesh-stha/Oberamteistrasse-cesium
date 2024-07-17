export const treeUrl = {
  treeLowPoly: "./data/3d_model/tree_poly.glb",
  treewithBed: "./data/3d_model/tree_poly_with_bed.glb",
  treeWithoutBed: "./data/3d_model/tree_poly_without_bed.glb",
  test: "./data/3d_model/test.glb",
  build: "./data/3d_model/buildWithoutGround.glb"
};

export const addTree = (viewer, treeType, heading = 130, pitch = 0, roll = 0) => {
  const position = Cesium.Cartesian3.fromDegrees(
    9.211300,
    48.489972,
  );

  const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading), Cesium.Math.toRadians(pitch), Cesium.Math.toRadians(roll));
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

  const entity = viewer.entities.add({
    name: treeUrl[treeType],
    position: position,
    orientation: orientation,
    model: {
      uri: treeUrl[treeType],
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
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