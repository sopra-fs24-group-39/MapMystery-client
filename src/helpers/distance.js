function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

export function calculateDistance(lat1, lon1, lat2, lon2, radius = 6371e3) {
  var phi1 = toRadians(lat1);
  var phi2 = toRadians(lat2);
  var deltaPhi = toRadians(lat2 - lat1);
  var deltaLambda = toRadians(lon2 - lon1);

  var a = (1 - Math.cos(deltaPhi)) / 2 +
          Math.cos(phi1) * Math.cos(phi2) *
          (1 - Math.cos(deltaLambda)) / 2;

  var distance = 2 * radius * Math.asin(Math.sqrt(a));
  return distance;
}