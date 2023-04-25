import { Node, Dist, Element, ElementLength } from '../types/element'

export function getDistInCoord(dist: Dist, x: number): number {
  const [x1, x2] = dist.x
  const [y1, y2] = dist.value as [number, number]

  const k = x1 - x2 ? (y1 - y2) / (x1 - x2) : 0
  const b = y1 - x1 * k

  return k * x + b
}

/** Class for the formation of finite elements */
export class Elem implements Element {
  public distload: Array<Dist> = []
  public material: [number, number, number] = [1, 1, 1]

  // eslint-disable-next-line no-useless-constructor
  constructor(public nodes: [Node, Node]) {}

  // SETTERS
  addForce(value: number) {
    this.nodes[0].force += value
  }

  addMoment(value: number) {
    this.nodes[0].moment += value
  }

  addSupport(value: 'fixed' | 'simple' | 'hinge') {
    this.nodes[0].support = value
  }

  addDistload(x: [number, number], value: number | [number, number]) {
    this.distload.push({ x, value })
  }

  setDistload(distload: Array<Dist>) {
    this.distload = JSON.parse(JSON.stringify(distload))
  }

  addMaterial(value: [number, number, number]) {
    this.material = value
  }

  // GETTERS
  get distance(): number {
    return this.nodes[1].x - this.nodes[0].x
  }

  get localMatrix(): Array<Array<number>> {
    const EJ: number = this.material[0] * this.material[1]
    const len: number = this.distance

    return [
      [
        (1 / len ** 3) * (EJ * 12),
        (1 / len ** 2) * (EJ * 6),
        (1 / len ** 3) * (EJ * -12),
        (1 / len ** 2) * (EJ * 6),
      ],
      [
        (1 / len ** 2) * (EJ * 6),
        (1 / len ** 1) * (EJ * 4),
        (1 / len ** 2) * (EJ * -6),
        (1 / len ** 1) * (EJ * 2),
      ],
      [
        (1 / len ** 3) * (EJ * -12),
        (1 / len ** 2) * (EJ * -6),
        (1 / len ** 3) * (EJ * 12),
        (1 / len ** 2) * (EJ * -6),
      ],
      [
        (1 / len ** 2) * (EJ * 6),
        (1 / len ** 1) * (EJ * 2),
        (1 / len ** 2) * (EJ * -6),
        (1 / len ** 1) * (EJ * 4),
      ],
    ]
  }

  get distVector(): Array<number> {
    const distVector = [0, 0, 0, 0]

    if (!this.distload.length) return distVector

    const len = this.distance
    const q = [0, 0]

    this.distload.forEach((dist) => {
      if (typeof dist.value === 'number') {
        q[0] += dist.value
        q[1] += dist.value
      } else {
        q[0] += getDistInCoord(dist, this.nodes[0].x)
        q[1] += getDistInCoord(dist, this.nodes[1].x)
      }
    })

    if (q[0] === q[1]) {
      distVector[0] = (q[0] * len ** 1) / 2
      distVector[1] = (q[0] * len ** 2) / 12
      distVector[2] = (q[0] * len ** 1) / 2
      distVector[3] = (q[0] * len ** 2) / -12
    } else {
      distVector[0] = (len / 2) * ((2 / 3) * q[0] + (1 / 3) * q[1])
      distVector[2] = (len / 2) * ((1 / 3) * q[0] + (2 / 3) * q[1])
    }

    return distVector
  }

  getClone() {
    const newElem = new Elem([{ ...this.nodes[0] }, { ...this.nodes[1] }])
    newElem.setDistload(this.distload)
    newElem.addMaterial(this.material)
    return newElem
  }

  // static
  static getLength(elems: Array<Elem>): ElementLength {
    const start = elems
      .map((el) => el.nodes[0].x)
      .reduce((a, b) => Math.min(a, b))

    const end = elems
      .map((el) => el.nodes[1].x)
      .reduce((a, b) => Math.max(a, b))

    return { length: end - start, start, end }
  }
}
