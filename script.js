mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJhdmluZHI1OTciLCJhIjoiY2toZnI2N3VjMDJpczJ4cGJ6bGpycGZqeSJ9.l7QFbtdxNsDAiU_IlsyCNQ";
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(
      showPosition,
      locationError,
      {
        enableHighAccuracy: true,
      }
    );
  }
}

function showPosition(position) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [position.coords.longitude, position.coords.latitude],
    pitch: 30,
    bearing: 0,
    zoom: 13,
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }),
    "top-left"
  );

  const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
  });
  map.addControl(nav, "top-left");

  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-right"
  );

  map.setMinZoom(1.3);
}
function locationError() {
  alert("Location Unknown");
}
