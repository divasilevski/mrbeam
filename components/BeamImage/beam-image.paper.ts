import { Color, Path, Point, PointText } from "paper/dist/paper-core"
import { Unit } from "~/assets/scripts/units.types"

export default class PaperBeam {
  canvasHeight: number = 75
  padding: number = 50

  elements: Unit[] = []
  canvasWidth: number = 0
  beamSize: any = {}

  colors = {
    point: new Color("#f0bc18"),
    line: new Color("#f0bc18"),
    text: new Color("#f0bc18"),
  }

  constructor(canvasHeight: number, padding: number) {
    this.canvasHeight = canvasHeight
    this.padding = padding
  }

  createBeam(elements: Unit[], canvasWidth: number) {
    this.elements = elements
    this.canvasWidth = canvasWidth
    this.beamSize = this._getBeamSize()

    // Lines
    this.beamSize.points.reduce((x: number, y: number) => {
      this._paperLine(this._getX(x), this._getX(y))
      return y;
    });

    // Points
    this.beamSize.points.forEach((el: any) => {
      this._paperPoint(this._getX(el), el)
    });
  }

  _paperPoint(x: number, label: string) {
    let point = new Path.Circle(new Point(x, this.canvasHeight), 3);
    point.strokeColor = this.colors.point;
    point.strokeWidth = 2;

    let text = new PointText(new Point(x, this.canvasHeight + 50));
    text.content = (Math.round(+label * 100) / 100).toString()
    text.style = {
      fontFamily: "Overlock",
      fontWeight: "bold",
      fontSize: 14,
      fillColor: this.colors.text,
      justification: "center",
    } as any
  }

  _paperLine(x: number, y: number) {
    const p1 = new Point(x + 3, this.canvasHeight)
    const p2 = new Point(y - 3, this.canvasHeight)
    let line = new Path.Line(p1, p2)
    line.strokeColor = this.colors.line
    line.strokeWidth = 4
  }

  _getBeamSize() {
    const setOfPoints = new Set(this.elements.map((el) => el.x).flat());
    const points = Array.from(setOfPoints).sort((a, b) => a - b);

    let [x, y] = [points[0], points[points.length - 1]];
    let [length, center] = [y - x, (y + x) / 2];

    return { x, y, length, center, points };
  }

  _getX(x: number) {
    const scale = (this.canvasWidth - 2 * this.padding) / this.beamSize.length;
    return (x - this.beamSize.x) * scale + this.padding;
  }
}
