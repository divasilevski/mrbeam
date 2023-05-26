import paper from 'paper'

const { Color, Path, Point, PointText, Project, Group } = paper

const CANVAS_HEIGHT = 198
const PADDING_X = 32
const PADDING_Y = 48
const PADDING_BOTTOM = 38
const PATTERN_SPACE = 10
const TIP_SIZE = 12
const SLIDER_TOP_IDENT = 24

const COLORS = {
  background: new Color('#fff'),
  pattern: new Color('#33475b'),
  line: new Color('#ef476f'),
  axis: new Color('#33475b'),
  text: new Color('#33475b'),
}

function createArrowTip() {
  const segments = [
    [TIP_SIZE, 0],
    [TIP_SIZE / 2, TIP_SIZE / 3],
    [0, 0],
  ]

  const arrowFill = new Path({ segments, fillColor: COLORS.background })

  const arrowStroke = new Path({
    strokeColor: COLORS.line,
    strokeWidth: 2,
    segments,
  })

  arrowFill.bounds.top = -2

  return new Group([arrowFill, arrowStroke])
}

function formatValue(value: number) {
  return formatNumber(parseFloat(value.toFixed(6)))
}

interface DrawProps {
  points: number[][]
  canvas: HTMLCanvasElement
  hasPattern?: boolean
}

export class PaperChart {
  private project: typeof Project.prototype | null = null
  private canvas: HTMLCanvasElement | null = null
  private points: number[][] = []
  private rect = { maxX: 0, minX: 0, maxY: 0, minY: 0 }
  private scale = { x: 1, y: 1 }

  private initProject(canvas: HTMLCanvasElement) {
    if (!this.project) {
      this.project = new Project(canvas)
    }
    this.project.activate()
    this.project.clear()
  }

  private initProperties({ points, canvas }: DrawProps) {
    const pointsX = points.map(([x, _]) => x)
    const pointsY = points.map(([_, y]) => y)
    const [maxX, minX] = [Math.max(...pointsX), Math.min(...pointsX)]
    const [maxY, minY] = [Math.max(...pointsY, 0), Math.min(...pointsY, 0)]
    const differenceX = maxX - minX
    const differenceY = Math.max(maxY - minY, 0.1) // Can be zero!

    const scaleX = (canvas.offsetWidth - PADDING_X * 2) / differenceX
    const scaleY = (canvas.offsetHeight - PADDING_Y * 2) / differenceY

    this.canvas = canvas
    this.points = [...points]
    this.rect = { maxX, minX, maxY, minY }
    this.scale = { x: scaleX, y: scaleY }
  }

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

  private drawPattern() {
    const pattern = new Group()
    let x = this.normalizeX(this.rect.minX)

    while (x < this.normalizeX(this.rect.maxX)) {
      const startPoint = new Point(x, this.normalizeY(this.rect.minY))
      const endPoint = new Point(x, this.normalizeY(this.rect.maxY))
      pattern.addChild(new Path.Line(startPoint, endPoint))

      x += PATTERN_SPACE
    }

    pattern.strokeColor = COLORS.pattern
    pattern.strokeWidth = 1

    // ---
    const path = new Path()

    path.add(new Point(this.normalizeX(this.rect.minX), this.normalizeY(0)))
    this.points.forEach(([x, y]) =>
      path.add(new Point(this.normalizeX(x), this.normalizeY(y)))
    )
    path.add(new Point(this.normalizeX(this.rect.maxX), this.normalizeY(0)))
    // ---

    const maskGroup = new Group([path, pattern])
    maskGroup.clipped = true
  }

  private drawAxis() {
    const line = new Path.Line(
      new Point(this.normalizeX(this.rect.minX), this.normalizeY(0)),
      new Point(this.normalizeX(this.rect.maxX), this.normalizeY(0))
    )

    line.strokeColor = COLORS.axis
    line.strokeWidth = 1
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
        this.normalizeY(this.rect.maxY) - 7
      ),
      ...defaultStyles,
    })

    new PointText({
      content: min,
      visible: max !== min,
      point: new Point(
        this.normalizeX(this.rect.minX) - 20,
        this.normalizeY(this.rect.minY) + 14
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
    const tip = createArrowTip()

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

  private drawLine() {
    const path = new Path()
    this.points.forEach(([x, y]) => {
      path.add(new Point(this.normalizeX(x), this.normalizeY(y)))
    })

    path.strokeColor = COLORS.line
    path.strokeWidth = 4
  }

  draw({ points, canvas, hasPattern }: DrawProps) {
    this.initProject(canvas)

    if (!points.length) {
      return false
    }

    this.initProperties({ points, canvas })

    if (hasPattern) {
      this.drawPattern()
    }

    this.drawAxis()
    this.drawLine()

    this.drawAxisText()
    this.drawSliderAxis()
  }
}
