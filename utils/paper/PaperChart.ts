import paper from 'paper/dist/paper-core'

import { PaperCanvas } from './PaperCanvas'
import { tipGroup } from './symbols'
import constants from '~/constants'

const { Color, Path, Point, PointText, Group } = paper

const CANVAS_HEIGHT = 198
const PADDING_X = 32
const PADDING_Y = 48
const PADDING_BOTTOM = 38
const PATTERN_SPACE = 10

const SLIDER_TOP_IDENT = 24

const COLORS = {
  background: new Color(constants.background),
  pattern: new Color(constants.secondary),
  line: new Color(constants.accent),
  axis: new Color(constants.secondary),
  text: new Color(constants.secondary),
}

interface DrawProps {
  points: number[][]
  canvas: HTMLCanvasElement
  hasPattern?: boolean
}

function formatValue(value: number) {
  return formatNumber(parseFloat(value.toFixed(6)))
}

export class PaperChart extends PaperCanvas {
  private canvas: HTMLCanvasElement | null = null
  private points: number[][] = []
  private rect = { maxX: 0, minX: 0, maxY: 0, minY: 0 }
  private scale = { x: 1, y: 1 }

  private init({ points, canvas }: DrawProps) {
    const pointsX = points.map(([x, _]) => x)
    const pointsY = points.map(([_, y]) => y)
    const [maxX, minX] = [Math.max(...pointsX), Math.min(...pointsX)]
    const [maxY, minY] = [Math.max(...pointsY, 0), Math.min(...pointsY, 0)]
    const differenceX = maxX - minX
    const differenceY = Math.max(maxY - minY, 0.1) // Can`t be zero!

    const scaleX = (canvas.offsetWidth - PADDING_X * 2) / differenceX
    const scaleY = (canvas.offsetHeight - PADDING_Y * 2) / differenceY

    this.canvas = canvas
    this.points = [...points]
    this.rect = { maxX, minX, maxY, minY }
    this.scale = { x: scaleX, y: scaleY }
  }

  // --- HELPERS ---

  private normalizeX(point: number) {
    return (point - this.rect.minX) * this.scale.x + PADDING_X
  }

  private normalizeY(point: number) {
    const height = this.canvas?.offsetHeight || 0
    return height - ((point - this.rect.minY) * this.scale.y + PADDING_BOTTOM)
  }

  private getPointBy(x: number) {
    const point = x / this.scale.x + this.rect.minX - PADDING_X / this.scale.x

    let closestCoord = this.points[0]
    let closestDist = Math.abs(point - closestCoord[0])

    for (let i = 1; i < this.points.length; i++) {
      const coord = this.points[i]
      const dist = Math.abs(point - coord[0])

      if (dist < closestDist) {
        closestCoord = coord
        closestDist = dist
      }
    }

    return closestCoord
  }

  // --- DRAW ---

  private drawLine() {
    new Path({
      segments: this.points.map(([x, y]) => [
        this.normalizeX(x),
        this.normalizeY(y),
      ]),
      strokeColor: COLORS.line,
      strokeWidth: 4,
    })
  }

  private drawPattern() {
    const start = this.normalizeX(this.rect.minX)
    const end = this.normalizeX(this.rect.maxX)
    const count = Math.ceil((start + end) / PATTERN_SPACE)

    const children = Array.from({ length: count }, (_, index) => {
      const x = start + index * PATTERN_SPACE
      return new Path.Line({
        from: [x, this.normalizeY(this.rect.minY)],
        to: [x, this.normalizeY(this.rect.maxY)],
      })
    })

    const path = new Path({
      segments: [
        [this.normalizeX(this.rect.minX), this.normalizeY(0)],
        ...this.points.map(([x, y]) => [
          this.normalizeX(x),
          this.normalizeY(y),
        ]),
        [this.normalizeX(this.rect.maxX), this.normalizeY(0)],
      ],
    })

    const pattern = new Group({ children, strokeColor: COLORS.pattern })
    const maskGroup = new Group([path, pattern])
    maskGroup.clipped = true
  }

  private drawAxis() {
    new Path.Line({
      from: [this.normalizeX(this.rect.minX), this.normalizeY(0)],
      to: [this.normalizeX(this.rect.maxX), this.normalizeY(0)],
      strokeColor: COLORS.axis,
      strokeWidth: 1,
    })
  }

  private drawAxisText() {
    const max = formatValue(this.rect.maxY)
    const min = formatValue(this.rect.minY)

    const defaultStyles = {
      fontSize: 14,
      fontWeight: 'bold',
      fillColor: COLORS.line,
      justification: 'left',
    }

    new PointText({
      content: max,
      point: new Point(
        this.normalizeX(this.rect.minX) - 20,
        this.normalizeY(this.rect.maxY) - 10
      ),
      ...defaultStyles,
    })

    new PointText({
      content: min,
      visible: max !== min,
      point: new Point(
        this.normalizeX(this.rect.minX) - 20,
        this.normalizeY(this.rect.minY) + 20
      ),
      ...defaultStyles,
    })
  }

  private drawSliderAxis() {
    const view = this.project?.view
    const minX = this.normalizeX(this.rect.minX)
    const maxX = this.normalizeX(this.rect.maxX)

    const line = new Path.Line({
      from: new Point(0, 10),
      to: new Point(0, CANVAS_HEIGHT - 10),
      strokeColor: COLORS.axis,
      strokeWidth: 0.15,
      dashArray: [4, 2],
      strokeCap: 'round',
    })

    const defaultSettings = {
      justification: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    }

    const pointTextX = new PointText({
      point: new Point(0, SLIDER_TOP_IDENT),
      fillColor: COLORS.text,
      ...defaultSettings,
    })

    const pointTextValue = new PointText({
      point: new Point(0, 0),
      fillColor: COLORS.line,
      ...defaultSettings,
    })

    const rect = new Path.Rectangle({
      rectangle: pointTextValue.bounds.expand(12, 4),
      fillColor: COLORS.background,
      strokeColor: COLORS.line,
      strokeJoin: 'round',
      strokeWidth: 2,
      radius: 1,
    })

    const tip = tipGroup({
      fillColor: COLORS.background,
      strokeColor: COLORS.line,
      size: 12,
    })

    pointTextValue.insertAbove(rect)

    const group = new Group({
      children: [line, rect, tip, pointTextX, pointTextValue],
      visible: false,
    })

    if (this.canvas && view) {
      view.onMouseMove = (event: paper.MouseEvent) => {
        const mouseX = event.point.x

        if (mouseX > minX && mouseX < maxX) {
          group.visible = true

          const [pointX, pointValue] = this.getPointBy(mouseX)
          const bottom = this.normalizeY(pointValue) - 8
          pointTextValue.content = formatValue(pointValue)
          pointTextX.content = formatValue(pointX)

          group.bounds.center.x = mouseX
          pointTextValue.bounds.bottom = bottom
          rect.bounds = pointTextValue.bounds.expand(12, 4)
          tip.bounds.top = rect.bounds.bottom - 2
          tip.bounds.center.x = rect.bounds.center.x

          return
        }

        group.visible = false
      }

      view.onMouseEnter = () => {
        group.visible = true
      }

      this.canvas.onmouseleave = () => {
        group.visible = false
      }
    }
  }

  draw({ points, canvas, hasPattern }: DrawProps) {
    super.draw({ canvas })

    if (!points.length) return false

    this.init({ points, canvas })

    if (hasPattern) {
      this.drawPattern()
    }

    this.drawAxis()
    this.drawLine()

    this.drawAxisText()
    this.drawSliderAxis()
  }
}
