import paper from 'paper'

const { Color, Path, Point, PointText, Project, Style } = paper

const PADDING = 24

const COLORS = {
  background: new Color('#fff'),
  line: new Color('#ef476f'),
  axis: new Color('#33475b'),
  text: new Color('#33475b'),
}

interface DrawProps {
  points: number[][]
  canvas: HTMLCanvasElement
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
    const [maxX, minX] = [Math.max(...pointsX, 0), Math.min(...pointsX, 0)]
    const [maxY, minY] = [Math.max(...pointsY, 0), Math.min(...pointsY, 0)]

    const scaleX = (canvas.offsetWidth - PADDING * 2) / (maxX - minX)
    const scaleY = (canvas.offsetHeight - PADDING * 2) / (maxY - minY)

    this.canvas = canvas
    this.points = [...points]
    this.rect = { maxX, minX, maxY, minY }
    this.scale = { x: scaleX, y: scaleY }
  }

  private normalizeX(point: number) {
    return (point - this.rect.minX) * this.scale.x + PADDING
  }

  private normalizeY(point: number) {
    const height = this.canvas?.offsetHeight || 0
    return height - ((point - this.rect.minY) * this.scale.y + PADDING)
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
    const points = [
      new Point(this.normalizeX(0), this.normalizeY(this.rect.maxY) - 7),
      new Point(this.normalizeX(0), this.normalizeY(this.rect.minY) + 17),
    ]

    const values = points.map((point) => new PointText(point))

    values[0].content = Number(this.rect.maxY.toFixed(7)).toString()
    values[1].content = Number(this.rect.minY.toFixed(7)).toString()

    values.forEach((value) => {
      value.style = {
        fontWeight: 'bold',
        fontSize: 14,
        fillColor: COLORS.text,
        justification: 'left',
      } as typeof Style.prototype
    })
  }

  private drawLine() {
    const path = new Path()
    this.points.forEach(([x, y]) => {
      path.add(new Point(this.normalizeX(x), this.normalizeY(y)))
    })

    path.strokeColor = COLORS.line
    path.strokeWidth = 4
  }

  draw({ points, canvas }: DrawProps) {
    this.initProject(canvas)

    if (!points.length) {
      return false
    }

    this.initProperties({ points, canvas })

    this.drawAxis()
    this.drawLine()
    this.drawAxisText()
  }
}
