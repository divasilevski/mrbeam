import paper from 'paper'

const { Color, Path, Point, Project } = paper

const PADDING = 24

interface DrawProps {
  points: number[][]
  canvas: HTMLCanvasElement
}

export class PaperChart {
  private project: typeof Project.prototype | null = null
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
    const [maxY, minY] = [Math.max(...pointsY), Math.min(...pointsY)]

    const scaleX = (canvas.offsetWidth - PADDING * 2) / (maxX - minX)
    const scaleY = (canvas.offsetHeight - PADDING * 2) / (maxY - minY)

    this.points = [...points]
    this.rect = { maxX, minX, maxY, minY }
    this.scale = { x: scaleX, y: scaleY }
  }

  private normalizeX(point: number) {
    return (point - this.rect.minX) * this.scale.x + PADDING
  }

  private normalizeY(point: number) {
    return (point - this.rect.minY) * this.scale.y + PADDING
  }

  private drawLine() {
    const path = new Path()
    this.points.forEach(([x, y]) => {
      path.add(new Point(this.normalizeX(x), this.normalizeY(y)))
    })

    path.strokeColor = new Color('#f2bb05')
    path.strokeWidth = 4
  }

  draw({ points, canvas }: DrawProps) {
    this.initProject(canvas)

    if (!points.length) {
      return false
    }

    this.initProperties({ points, canvas })

    this.drawLine()
  }
}
