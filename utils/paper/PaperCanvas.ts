import paper from 'paper'

const { Project } = paper

interface DrawProps {
  canvas: HTMLCanvasElement
}

export class PaperCanvas {
  project: paper.Project | null = null

  private initProject(canvas: HTMLCanvasElement) {
    if (!this.project) {
      this.project = new Project(canvas)
    }
    this.project.activate()
    this.project.clear()
  }

  draw({ canvas }: DrawProps) {
    this.initProject(canvas)
  }
}
