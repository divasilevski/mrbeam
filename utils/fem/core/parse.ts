import { Node, Element } from './../types/element'
import { Unit } from './../types/unit'
import { Elem } from './Elem'

export function decryption(unit: Unit, elem: Element) {
  switch (unit.type) {
    case 'point':
      break
    case 'force':
      elem.addForce(unit.value as number)
      break
    case 'moment':
      elem.addMoment(unit.value as number)
      break
    case 'distload':
      elem.addDistload(
        unit.x as [number, number],
        unit.value as number | [number, number],
      )
      break
    case 'material':
      elem.addMaterial(unit.value as [number, number, number])
      break
    default:
      elem.addSupport(unit.type as 'fixed' | 'simple' | 'hinge')
      break
  }
}

/** Parse units to finite elements */
export function parse(units: Array<Unit>): Array<Element> {
  const setOfCoords: Set<number> = new Set(units.map((unit) => unit.x).flat(2))
  const sortedCoords: Array<number> = Array.from(setOfCoords).sort(
    (a, b) => a - b,
  )

  const nodes: Array<Node> = sortedCoords.map((coord) => ({
    x: coord,
    force: 0,
    moment: 0,
  }))
  const elems: Array<Element> = nodes.map(
    (node, i) => new Elem([node, nodes[i + 1]]),
  )

  for (const unit of units) {
    const x: Array<number> =
      typeof unit.x === 'number' ? [unit.x, unit.x] : unit.x

    elems
      .filter((elem) => {
        return !['distload', 'material'].includes(unit.type)
          ? elem.nodes[0].x >= x[0] && elem.nodes[0].x <= x[1]
          : elem.nodes[0].x >= x[0] && elem.nodes[0].x < x[1]
      })
      .forEach((elem) => decryption(unit, elem))
  }

  return elems.slice(0, -1).sort((a, b) => a.nodes[0].x - b.nodes[0].x)
}
