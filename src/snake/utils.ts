export function getRandomInteger(min: number, max: number) {
  const adjustedMin = Math.ceil(min);
  const adjustedMax = Math.floor(max);
  return Math.floor(Math.random() * (adjustedMax - adjustedMin) + adjustedMin);
}
