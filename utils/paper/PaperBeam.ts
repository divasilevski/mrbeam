import { Color, Path, Point, PointText, Project, Style } from 'paper'
import { forceSymbol, momentSymbol, simpleSymbol, fixedSymbol } from './symbols'

const COLORS = {
  point: new Color('#f0bc18'),
  line: new Color('#f0bc18'),
  text: new Color('#f0bc18'),
  distload: new Color('#f0bc18'),
  moment: new Color('#f0bc18'),
  force: new Color('#f0bc18'),
  simple: new Color('#f0bc18'),
}

const CANVAS_HEIGHT = 150
const POINT_RADIUS = 3
const FORCE_HEIGHT = 34
const SIMPLE_HEIGHT = 24
const FIXED_HEIGHT = 24
const DISTLOAD_HEIGHT = 24
const PADDING = 20

interface DrawProps {
  units: Unit[]
  canvas: HTMLCanvasElement
}

export class PaperBeam {
  private project: typeof Project.prototype | null = null
  private xValues: number[] = []
  private points: number[] = []

  private initProject(canvas: HTMLCanvasElement) {
    if (!this.project) {
      this.project = new Project(canvas)
      this.project.activate()
    }
    this.project.clear()
  }

  private calcPoints({ units, canvas }: DrawProps) {
    const positions = units.map((unit) => unit.x).flat()
    const uniqPositions = [...new Set(positions)]
    const sorted = uniqPositions.sort((a, b) => a - b)
    const length = sorted[sorted.length - 1] - sorted[0]

    const canvasWidth = canvas.offsetWidth
    const scale = (canvasWidth - PADDING * 2) / length

    this.xValues = [...sorted]
    this.points = sorted.map((pos) => (pos - sorted[0]) * scale + PADDING)
  }

  private drawLines() {
    if (this.points.length < 2) {
      return
    }

    this.points.reduce((a, b) => {
      const line = new Path.Line(
        new Point(a + POINT_RADIUS, CANVAS_HEIGHT / 2),
        new Point(b - POINT_RADIUS, CANVAS_HEIGHT / 2)
      )
      line.strokeColor = COLORS.line
      line.strokeWidth = 4
      return b
    })
  }

  private drawPoints() {
    this.points.forEach((a) => {
      const point = new Point(a, CANVAS_HEIGHT / 2)
      const circle = new Path.Circle(point, POINT_RADIUS)
      circle.strokeColor = COLORS.point
      circle.strokeWidth = 2
    })
  }

  private drawHinges() {
    this.points.forEach((a) => {
      const point = new Point(a, CANVAS_HEIGHT / 2)
      const circle = new Path.Circle(point, POINT_RADIUS + 2)
      circle.strokeColor = COLORS.point
      circle.strokeWidth = 4
    })
  }

  private drawPointsText() {
    this.points.forEach((a, index) => {
      const point = new Point(a, CANVAS_HEIGHT / 2 + 50)
      const text = new PointText(point)
      text.content = Number(this.xValues[index].toPrecision(2)).toString()

      text.style = {
        fontWeight: 'bold',
        fontSize: 14,
        fillColor: COLORS.text,
        justification: 'center',
      } as typeof Style.prototype
    })
  }

  private drawSimple() {
    this.points.forEach((a) => {
      const symbol = simpleSymbol(SIMPLE_HEIGHT, COLORS.simple)
      symbol.item.bounds.top += POINT_RADIUS
      symbol.place(new Point(a, CANVAS_HEIGHT / 2))
    })
  }

  private drawFixed() {
    this.points.forEach((a) => {
      const symbol = fixedSymbol(FIXED_HEIGHT, COLORS.simple)
      symbol.place(new Point(a, CANVAS_HEIGHT / 2))
    })
  }

  private drawDistloads() {
    if (this.points.length < 2) {
      return
    }

    this.points.reduce((a, b) => {
      const symbol = forceSymbol(DISTLOAD_HEIGHT, COLORS.distload)
      symbol.item.bounds.bottom = -POINT_RADIUS

      const width = b - a
      const count = Math.floor(width / 15)

      for (let i = 0; i < count + 1; i++) {
        const point = new Point(a + (width / count) * i, CANVAS_HEIGHT / 2)
        symbol.place(point)
      }

      const line = new Path()
      const lineHeight = CANVAS_HEIGHT / 2 - DISTLOAD_HEIGHT - 2
      line.add(new Point(a - 2, lineHeight))
      line.add(new Point(a + width + 2, lineHeight))
      line.strokeColor = COLORS.distload
      line.strokeWidth = 4

      return b
    })
  }

  private drawMoments() {
    this.points.forEach((a) => {
      const symbol = momentSymbol(FORCE_HEIGHT, COLORS.moment)
      symbol.place(new Point(a, CANVAS_HEIGHT / 2))
    })
  }

  private drawForces() {
    this.points.forEach((a) => {
      const symbol = forceSymbol(FORCE_HEIGHT, COLORS.force)
      symbol.item.bounds.bottom = -POINT_RADIUS
      symbol.place(new Point(a, CANVAS_HEIGHT / 2))
    })
  }

  draw({ units, canvas }: DrawProps) {
    this.initProject(canvas)

    if (!units.length) {
      return false
    }

    this.calcPoints({ units, canvas })

    this.drawLines()
    this.drawPoints()
    this.drawHinges()
    // this.drawPointsText()

    this.drawSimple()
    this.drawFixed()

    this.drawDistloads()
    this.drawMoments()
    this.drawForces()
  }
}
