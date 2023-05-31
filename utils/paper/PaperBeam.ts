import paper from 'paper'

import { PaperCanvas } from './PaperCanvas'
import { forceSymbol, momentSymbol, simpleSymbol, fixedSymbol } from './symbols'
import constants from '~/constants'

const { Path, Color, Point, PointText } = paper

const CANVAS_HEIGHT = 198 + 30
const POINT_RADIUS = 3
const FORCE_HEIGHT = 34
const SIMPLE_HEIGHT = 24
const FIXED_HEIGHT = 24
const DISTLOAD_HEIGHT = 24
const PADDING_X = 32

const COLORS = {
  background: new Color(constants.background),
  point: new Color(constants.tertiaryLight),
  line: new Color(constants.tertiaryLight),
  distload: new Color(constants.tertiaryLight),
  moment: new Color(constants.accent),
  force: new Color(constants.accent),
  text: new Color(constants.secondary),
  simple: new Color(constants.secondary),
  fixed: new Color(constants.secondary),
  hinge: new Color(constants.secondary),
  forceText: new Color(constants.accent),
  momentText: new Color(constants.accent),
  distloadText: new Color(constants.tertiary),
}

interface DrawProps {
  units: Unit[]
  canvas: HTMLCanvasElement
}

function getNumberFrom(value: number | number[]) {
  return Array.isArray(value) ? (value[0] + value[1]) / 2 : value
}

export class PaperBeam extends PaperCanvas {
  private canvas: HTMLCanvasElement | null = null
  private points: number[] = []
  private units: Unit[] = []
  private scale = 1

  private init({ units, canvas }: DrawProps) {
    const positions = units.map((unit) => unit.x).flat()
    const uniqPositions = [...new Set(positions)]
    const points = uniqPositions.sort((a, b) => a - b)

    const length = points[points.length - 1] - points[0]
    const scale = (canvas.offsetWidth - PADDING_X * 2) / length

    this.canvas = canvas
    this.points = points
    this.units = units
    this.scale = scale
  }

  // --- HELPERS ---

  private normalize(point: number) {
    if (this.canvas && this.points.length === 1) {
      return this.canvas.offsetWidth / 2
    }
    return (point - this.points[0]) * this.scale + PADDING_X
  }

  private getFilteredBy(type: UnitType) {
    return this.units.filter((unit) => unit.type === type)
  }

  private getPointsBy(type: UnitType) {
    return this.units
      .filter((unit) => unit.type === type)
      .map((unit) => unit.x)
      .flat()
  }

  // --- DRAW ---

  private drawLines() {
    if (this.points.length < 2) return

    this.points.reduce((prev, curr) => {
      new Path.Line({
        from: [this.normalize(prev), CANVAS_HEIGHT / 2],
        to: [this.normalize(curr), CANVAS_HEIGHT / 2],
        strokeColor: COLORS.line,
        strokeWidth: 4,
      })
      return curr
    })
  }

  private drawPoints() {
    const fixed = this.getPointsBy('fixed')

    this.points.forEach((x) => {
      if (fixed.includes(x)) return

      new Path.Circle({
        center: [this.normalize(x), CANVAS_HEIGHT / 2],
        radius: POINT_RADIUS,
        fillColor: COLORS.background,
        strokeColor: COLORS.point,
        strokeWidth: 2,
      })
    })
  }

  private drawHinges() {
    this.getPointsBy('hinge').forEach((x) => {
      new Path.Circle({
        center: [this.normalize(x), CANVAS_HEIGHT / 2],
        radius: POINT_RADIUS + 2,
        fillColor: COLORS.background,
        strokeColor: COLORS.hinge,
        strokeWidth: 4,
      })
    })
  }

  private drawSimple() {
    this.getPointsBy('simple').forEach((x) => {
      const symbol = simpleSymbol(SIMPLE_HEIGHT, COLORS.simple)
      symbol.item.bounds.top += POINT_RADIUS
      symbol.place(new Point(this.normalize(x), CANVAS_HEIGHT / 2))
    })
  }

  private drawFixed() {
    this.getPointsBy('fixed').forEach((x) => {
      const symbol = fixedSymbol(FIXED_HEIGHT, COLORS.fixed)
      const isLeftPoint = x === this.points[this.points.length - 1]
      symbol.place(new Point(this.normalize(x), CANVAS_HEIGHT / 2))

      if (isLeftPoint) {
        symbol.item.scaling = new Point(-1, 1)
        symbol.item.bounds.left = 0
      }
    })
  }

  private drawDistloads() {
    if (this.points.length < 2) return

    this.getFilteredBy('distload').forEach((unit) => {
      if (!Array.isArray(unit.x)) return

      const a = this.normalize(unit.x[0])
      const b = this.normalize(unit.x[1])

      const symbol = forceSymbol(DISTLOAD_HEIGHT, COLORS.distload)
      symbol.item.bounds.bottom = -POINT_RADIUS

      const width = Math.abs(b - a)
      const count = Math.floor(width / 15)

      for (let i = 0; i < count + 1; i++) {
        symbol.place(new Point(a + (width / count) * i, CANVAS_HEIGHT / 2))
      }

      new Path({
        segments: [
          [a - 2, CANVAS_HEIGHT / 2 - DISTLOAD_HEIGHT - 2],
          [a + width + 2, CANVAS_HEIGHT / 2 - DISTLOAD_HEIGHT - 2],
        ],
        strokeColor: COLORS.distload,
        strokeWidth: 4,
      })
    })
  }

  private drawMoments() {
    this.getPointsBy('moment').forEach((a) => {
      const symbol = momentSymbol(FORCE_HEIGHT, COLORS.moment)
      symbol.place(new Point(this.normalize(a), CANVAS_HEIGHT / 2))
    })
  }

  private drawForces() {
    this.getFilteredBy('force').forEach((unit) => {
      const x = getNumberFrom(unit.x)
      const symbol = forceSymbol(FORCE_HEIGHT, COLORS.force)
      symbol.item.bounds.bottom = -POINT_RADIUS
      symbol.place(new Point(this.normalize(x), CANVAS_HEIGHT / 2))
    })
  }

  private drawPointsText() {
    this.points.forEach((a) => {
      new PointText({
        point: [this.normalize(a), CANVAS_HEIGHT / 2 + 50],
        content: formatNumber(a),
        fillColor: COLORS.text,
        justification: 'center',
        fontWeight: 'bold',
        fontSize: 14,
      })
    })
  }

  private drawValuesText() {
    const withValues = ['force', 'moment', 'distload']
    const colorMap: Record<string, paper.Color> = {
      force: COLORS.forceText,
      moment: COLORS.momentText,
      distload: COLORS.distloadText,
    }

    this.units.forEach((unit) => {
      if (!withValues.includes(unit.type)) return

      const x = getNumberFrom(unit.x)
      const value = getNumberFrom(unit.value!)

      new PointText({
        point: [this.normalize(x), CANVAS_HEIGHT / 2 - 45],
        content: formatNumber(value),
        fillColor: colorMap[unit.type],
        justification: 'center',
        fontWeight: 'bold',
        fontSize: 14,
      })
    })
  }

  draw({ units, canvas }: DrawProps) {
    super.draw({ canvas })

    if (!units.length) return false

    this.init({ units, canvas })

    this.drawSimple()
    this.drawDistloads()
    this.drawPointsText()
    this.drawValuesText()

    this.drawLines()
    this.drawPoints()
    this.drawHinges()

    this.drawFixed()
    this.drawMoments()
    this.drawForces()
  }
}
