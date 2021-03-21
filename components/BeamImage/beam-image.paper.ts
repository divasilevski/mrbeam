import { Unit } from "~/assets/scripts/units.types"
import { defenition, distload, fixed, force, moment } from './beam-icons.paper'

export default class PaperBeam {
  canvasHeight: number = 75
  padding: number = 50

  elements: Unit[] = []
  canvasWidth: number = 0
  beamSize: any = {}

  colors = {
    point: new paper.Color("#f0bc18"),
    line: new paper.Color("#f0bc18"),
    text: new paper.Color("#f0bc18"),
    force: new paper.Color("#EA0043"),
    distload: new paper.Color("#0F0BC1"),
    moment: new paper.Color("#EA0043"),
    defenition: new paper.Color("#64AE2B"),
    hinge: new paper.Color("#f0bc18"),
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
      return y
    })

    // Distload
    this.elements.filter(el => el.type === 'distload').forEach((el: any) => {
      let start = this._getX(0)
      let width = this._getX(el.x[0]) - this._getX(0)

      if (el.x[0] !== el.x[1]) {
        start = this._getX(el.x[0])
        width = this._getX(el.x[1]) - this._getX(el.x[0])
      }
      distload(start, this.canvasHeight - 3, 20, width, this.colors.distload)
    })

    // Force
    this.elements.filter(el => el.type === 'force').forEach((el: any) => {
      force(this._getX(el.x), this.canvasHeight - 3, 40, this.colors.force)
    })

    // Moment
    this.elements.filter(el => el.type === 'moment').forEach((el: any) => {
      moment(this._getX(el.x), this.canvasHeight + 15, 30, this.colors.moment)
    })

    // Defenition
    this.elements.filter(el => el.type === 'simple').forEach((el: any) => {
      defenition(this._getX(el.x) - 9, this.canvasHeight + 28, 25, this.colors.defenition)
    })

    // Fixed
    this.elements.filter(el => el.type === 'fixed').forEach((el: any) => {
      fixed(this._getX(el.x) - 3, this.canvasHeight - 20, 40, this.colors.defenition)
    })

    // Points
    this.beamSize.points.forEach((el: any) => {
      this._paperPoint(this._getX(el), el)
    })

    // Points
    this.elements.filter(el => el.type === 'hinge').forEach((el: any) => {
      this._paperHinge(this._getX(el.x))
    })
  }

  _paperHinge(x: number) {
    let point = new paper.Path.Circle(new paper.Point(x, this.canvasHeight), 5);
    point.strokeColor = this.colors.hinge;
    point.strokeWidth = 3;
  }

  _paperPoint(x: number, label: string) {
    let point = new paper.Path.Circle(new paper.Point(x, this.canvasHeight), 3);
    point.strokeColor = this.colors.point;
    point.strokeWidth = 2;

    let text = new paper.PointText(new paper.Point(x, this.canvasHeight + 50));
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
    const p1 = new paper.Point(x + 3, this.canvasHeight)
    const p2 = new paper.Point(y - 3, this.canvasHeight)
    let line = new paper.Path.Line(p1, p2)
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
