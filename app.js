Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNDUxMjM2MS00ODYwLTRjYjEtODhmMy0yZGE3NGVlMjUyOTkiLCJpZCI6MjExMzY3LCJpYXQiOjE3MTQwNzI0MzN9.54sPRmtK-snUlZx3mB3PXADPHVwc1X43K0ybFCvIHhA';

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false,
  timeline: false,
  shadowMap: false,
  baseLayerPicker: false,
});    

async function addPointCloudTileset() {
  let pointCloudTileset = await Cesium.Cesium3DTileset.fromIonAssetId(2556043, {
    pointCloudShading: {
      attenuation: true,
      backFaceCulling: true,
      maximumAttenuation: 2,
    },
  });
  viewer.scene.primitives.add(pointCloudTileset);

  var boundingSphere = pointCloudTileset.boundingSphere;

  viewer.camera.flyToBoundingSphere(boundingSphere, {
    offset: new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(10),
      Cesium.Math.toRadians(-90),
      boundingSphere.radius * 2.0
    ),
    duration: 0 
  });

  console.log("should zoom");
  pointCloudTileset.style = new Cesium.Cesium3DTileStyle({
    color: function(feature, result) {
      return filterPoints(feature, result);
    }
  });
}

addPointCloudTileset();

var measureWidget = new Cesium.Measure({
     container : 'measureContainer',
     scene : viewer,
     units : new Cesium.MeasureUnits({
         distanceUnits : units.DistanceUnits.METERS,
         areaUnits : Cesium.AreaUnits.SQUARE_METERS,
         volumeUnits : Cesium.VolumeUnits.CUBIC_FEET,
         angleUnits : Cesium.AngleUnits.DEGREES,
         slopeUnits : Cesium.AngleUnits.GRADE
     })
});
