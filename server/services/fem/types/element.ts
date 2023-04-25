export interface Node {
  x: number
  force: number
  moment: number

  support?: 'fixed' | 'simple' | 'hinge'
}

export interface Dist {
  x: [number, number]
  value: number | [number, number]
}

export interface ElementLength {
  length: number
  start: number
  end: number
}

export interface Element {
  distload: Array<Dist>
  material: [number, number, number]
  addForce: (value: number) => void
  addMoment: (value: number) => void
  addSupport: (value: 'fixed' | 'simple' | 'hinge') => void
  addDistload: (x: [number, number], value: number | [number, number]) => void
  setDistload: (distload: Array<Dist>) => void
  addMaterial: (value: [number, number, number]) => void
  distance: number
  localMatrix: Array<Array<number>>
  distVector: Array<number>
  getClone: () => Element
  getLength?: (elems: Array<Element>) => ElementLength
}
