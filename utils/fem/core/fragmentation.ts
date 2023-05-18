import { Node, Element } from '../types/element'
import { CalculateOptions } from '../types/calculate'

import { Elem } from './Elem'

const DEFAULT_COUNT = 100
const MAX_COUNT = 200

export function fragmentation(elems: Element[], options: CalculateOptions) {
  if (!options.count) options.count = DEFAULT_COUNT
  if (options.count > MAX_COUNT) options.count = MAX_COUNT

  const elemLength = Elem.getLength(elems)
  const factor: number = elemLength.length / (options.count - 1)

  let count: number, newNode: Node, newElem: Elem

  for (let i = elems.length - 1; i >= 0; i--) {
    count = elems[i].distance / factor

    for (let j = 1; j < count; j++) {
      newNode = { x: elems[i].nodes[1].x - factor, force: 0, moment: 0 }

      // duplicate the element by changing the second node
      newElem = new Elem([elems[i].nodes[0], newNode])
      newElem.setDistload(elems[i].distload)
      newElem.addMaterial(elems[i].material)

      // reduce the "old" element
      elems[i].nodes[0] = newNode

      // add a new element before the "old"
      elems.splice(i, 0, newElem)
    }
  }

  return elems
}
