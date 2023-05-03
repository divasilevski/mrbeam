import paper from 'paper'
import { forceSymbol, momentSymbol, simpleSymbol, fixedSymbol } from './symbols'

const { Path, Color, Point, PointText, Project, Style } = paper

const COLORS = {
  background: new Color('#f2f7f2'),
  point: new Color('#f2bb05'),
  line: new Color('#f2bb05'),
  text: new Color('#f2bb05'),
  distload: new Color('#f2bb05'),
  moment: new Color('#d74e09'),
  force: new Color('#d74e09'),
  simple: new Color('#558564'),
  fixed: new Color('#558564'),
  hinge: new Color('#558564'),
}

const CANVAS_HEIGHT = 150
const POINT_RADIUS = 3
const FORCE_HEIGHT = 34
const SIMPLE_HEIGHT = 24
const FIXED_HEIGHT = 24
const DISTLOAD_HEIGHT = 24
const PADDING = 24

interface DrawProps {
  units: Unit[]
  canvas: HTMLCanvasElement
}

export class PaperBeam {
  private project: typeof Project.prototype | null = null
  private points: number[] = []
  private units: Unit[] = []
  private scale = 1

  private initProject(canvas: HTMLCanvasElement) {
    if (!this.project) {
      this.project = new Project(canvas)
    }
    this.project.activate()
    this.project.clear()
  }

  private initProperties({ units, canvas }: DrawProps) {
    const positions = units.map((unit) => unit.x).flat()
    const uniqPositions = [...new Set(positions)]
    const points = uniqPositions.sort((a, b) => a - b)

    const length = points[points.length - 1] - points[0]
    const scale = (canvas.offsetWidth - PADDING * 2) / length

    this.points = points
    this.units = units
    this.scale = scale
  }

  private getUnitsPoints(type: UnitType) {
    return this.units
      .filter((unit) => unit.type === type)
      .map((unit) => unit.x)
      .flat()
  }

  private normalize(point: number) {
    return (point - this.points[0]) * this.scale + PADDING
  }

  private drawLines() {
    if (this.points.length < 2) {
      return
    }

    this.points.reduce((a, b) => {
      const line = new Path.Line(
        new Point(this.normalize(a), CANVAS_HEIGHT / 2),
        new Point(this.normalize(b), CANVAS_HEIGHT / 2)
      )
      line.strokeColor = COLORS.line
      line.strokeWidth = 4
      return b
    })
  }

  private drawPoints() {
    const fixed = this.getUnitsPoints('fixed')

    this.points.forEach((a) => {
      if (fixed.includes(a)) return

      const point = new Point(this.normalize(a), CANVAS_HEIGHT / 2)
      const circle = new Path.Circle(point, POINT_RADIUS)
      circle.fillColor = COLORS.background
      circle.strokeColor = COLORS.point
      circle.strokeWidth = 2
    })
  }

  private drawHinges() {
    this.getUnitsPoints('hinge').forEach((a) => {
      const point = new Point(this.normalize(a), CANVAS_HEIGHT / 2)
      const circle = new Path.Circle(point, POINT_RADIUS + 2)
      circle.fillColor = COLORS.background
      circle.strokeColor = COLORS.hinge
      circle.strokeWidth = 4
    })
  }

  private drawPointsText() {
    this.points.forEach((a) => {
      const point = new Point(this.normalize(a), CANVAS_HEIGHT / 2 + 50)
      const text = new PointText(point)
      text.content = Number(a.toPrecision(2)).toString()

      text.style = {
        fontWeight: 'bold',
        fontSize: 14,
        fillColor: COLORS.text,
        justification: 'center',
      } as typeof Style.prototype
    })
  }

  private drawSimple() {
    this.getUnitsPoints('simple').forEach((a) => {
      const symbol = simpleSymbol(SIMPLE_HEIGHT, COLORS.simple)
      symbol.item.bounds.top += POINT_RADIUS
      symbol.place(new Point(this.normalize(a), CANVAS_HEIGHT / 2))
    })
  }

  private drawFixed() {
    this.getUnitsPoints('fixed').forEach((a) => {
      const symbol = fixedSymbol(FIXED_HEIGHT, COLORS.fixed)
      const isLeftPoint = a === this.points[this.points.length - 1]

      if (isLeftPoint) {
        symbol.item.scaling = new Point(-1, 1)
        symbol.item.bounds.left = 0
      }

      symbol.place(new Point(this.normalize(a), CANVAS_HEIGHT / 2))
    })
  }

  private drawDistloads() {
    if (this.points.length < 2) {
      return
    }

    const units = this.units.filter((unit) => unit.type === 'distload')

    units.forEach((unit) => {
      if (Array.isArray(unit.x)) {
        const a = this.normalize(unit.x[0])
        const b = this.normalize(unit.x[1])

        const symbol = forceSymbol(DISTLOAD_HEIGHT, COLORS.distload)
        symbol.item.bounds.bottom = -POINT_RADIUS

        const width = Math.abs(b - a)
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
      }
    })
  }

  private drawMoments() {
    this.getUnitsPoints('moment').forEach((a) => {
      const symbol = momentSymbol(FORCE_HEIGHT, COLORS.moment)
      symbol.place(new Point(this.normalize(a), CANVAS_HEIGHT / 2))
    })
  }

  private drawForces() {
    this.getUnitsPoints('force').forEach((a) => {
      const symbol = forceSymbol(FORCE_HEIGHT, COLORS.force)
      symbol.item.bounds.bottom = -POINT_RADIUS
      symbol.place(new Point(this.normalize(a), CANVAS_HEIGHT / 2))
    })
  }

  draw({ units, canvas }: DrawProps) {
    this.initProject(canvas)

    if (!units.length) {
      return false
    }

    this.initProperties({ units, canvas })

    // layer 1
    this.drawSimple()
    this.drawDistloads()
    this.drawPointsText()

    // layer 2
    this.drawLines()
    this.drawPoints()
    this.drawHinges()

    // layer 3
    this.drawFixed()
    this.drawMoments()
    this.drawForces()
  }
}
