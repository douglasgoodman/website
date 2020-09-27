import { CanvasWidth, CanvasHeight } from "./constants";
import titleImage from "./assets/images/qbert-title.png";

let canvas: CanvasRenderingContext2D;

export function setCanvas(context: CanvasRenderingContext2D) {
  canvas = context;
  canvas.imageSmoothingEnabled = false;
}

export function clearCanvas() {
  canvas.clearRect(0, 0, CanvasWidth, CanvasHeight);
}

export function drawPolygon(points: { x: number; y: number }[], color: string) {
  canvas.beginPath();
  canvas.moveTo(points[0].x, points[0].y);
  points.slice(0).forEach((p) => canvas.lineTo(p.x, p.y));
  canvas.closePath();
  canvas.fillStyle = color;
  canvas.fill();
}

export function drawImage(
  source: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number
) {
  canvas.drawImage(source, x, y, width, height);
}

export function drawText(
  text: string,
  x: number,
  y: number,
  size: string,
  color: string,
  textAlign: CanvasTextAlign = "start"
) {
  canvas.textAlign = textAlign;
  canvas.fillStyle = color;
  canvas.font = `${size} PixelEmulator`;
  canvas.fillText(text, x, y);
}

export function drawTitleImage() {
  const image = new Image();
  image.src = titleImage;
  image.onload = () => canvas.drawImage(image, 100, 0, CanvasWidth - 200, 180);
}
