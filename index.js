import {
    Ion,
    Viewer,
    Terrain,
    createOsmBuildingsAsync,
    Cartesian3,
    Math,
  } from "cesium";
  import "cesium/Widgets/widgets.css";
  import "./styles.css";
  
  // Your access token can be found at: https://cesium.com/ion/tokens.
  // This is the default access token
  Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNDUxMjM2MS00ODYwLTRjYjEtODhmMy0yZGE3NGVlMjUyOTkiLCJpZCI6MjExMzY3LCJpYXQiOjE3MTQwNzI0MzN9.54sPRmtK-snUlZx3mB3PXADPHVwc1X43K0ybFCvIHhA"
  
  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const viewer = new Viewer('cesiumContainer', {
    terrain: Terrain.fromWorldTerrain(),
  });    
  
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Math.toRadians(0.0),
      pitch: Math.toRadians(-15.0),
    },
  });
  
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset); 