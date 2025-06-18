const calculateDistance = function (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number {
  const R: number = 6371e3; // kilometers
  const phi1: number = (latitude1 * Math.PI) / 180; // phi, landa in radians
  const phi2: number = (latitude2 * Math.PI) / 180;
  const deltaPhi: number = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLanda: number = ((longitude2 - longitude1) * Math.PI) / 180;

  const a: number =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLanda / 2) *
      Math.sin(deltaLanda / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in kilometers
};

export default calculateDistance;
