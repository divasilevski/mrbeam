import paper from 'paper/dist/paper-core'

const { Point, Path, Group, SymbolDefinition } = paper

interface TipProps {
  size: number
  fillColor: paper.Color
  strokeColor: paper.Color
}

export function forceSymbol(height: number, color: paper.Color) {
  const line = new Path({
    segments: [
      [0, -7],
      [0, -height],
    ],
    strokeColor: color,
    strokeWidth: 4,
  })

  const tip = new Path({
    segments: [
      [0, 0],
      [4.6, -10.5],
      [0, -9],
      [-4.6, -10.5],
    ],
    fillColor: color,
  })

  return new SymbolDefinition(new Group([tip, line]))
}

export function momentSymbol(height: number, color: paper.Color) {
  const center = new Point(0, -height / 2)
  const radius = height / 2 - 2

  const arc = new Path.Arc({
    from: [
      center.x + radius * Math.sin((30 / 180) * Math.PI),
      center.y + radius * Math.cos((30 / 180) * Math.PI),
    ],
    to: [
      center.x + radius * Math.sin((120 / 180) * Math.PI),
      center.y + radius * Math.cos((120 / 180) * Math.PI),
    ],
    through: [center.x - radius, center.y],
    strokeColor: color,
    strokeCap: 'round',
    strokeWidth: 4,
  })

  const tip = new Path({
    segments: [
      [0, 0],
      [4.6, -10.5],
      [0, -9],
      [-4.6, -10.5],
    ],
    fillColor: color,
  })

  const translatePoint = new Point(
    center.x + radius * Math.sin((120 / 180) * Math.PI),
    center.y + radius * Math.cos((120 / 180) * Math.PI) + 5
  )

  tip.rotate(-45)
  tip.translate(translatePoint)

  const symbol = new SymbolDefinition(new Group([arc, tip]))
  symbol.item.bounds.center.y = 0
  return symbol
}

export function simpleSymbol(height: number, color: paper.Color) {
  const triangle = new Path.RegularPolygon({
    center: new Point(0, 0),
    radius: height / 2,
    sides: 3,
    strokeColor: color,
    strokeWidth: 4,
  })

  triangle.bounds.center.x = triangle.bounds.height / 2
  triangle.bounds.bottom = triangle.bounds.center.y

  const defLine = new Path({
    segments: [
      [triangle.bounds.center.x - (height * 2) / 3, triangle.bounds.bottom],
      [triangle.bounds.center.x + (height * 2) / 3, triangle.bounds.bottom],
    ],
    strokeColor: color,
    strokeCap: 'round',
    strokeWidth: 4,
  })

  const symbol = new SymbolDefinition(new Group([triangle, defLine]))
  symbol.item.bounds.top = 2
  return symbol
}

export function fixedSymbol(h: number, color: paper.Color) {
  const line = new Path({
    segments: [
      [0, 0],
      [0, h],
    ],
    strokeColor: color,
    strokeCap: 'round',
    strokeWidth: 4,
  })

  const paths = [
    new Path.Line(new Point(0, 0), new Point(-8, 4)),
    new Path.Line(new Point(0, h / 2), new Point(-8, h / 2 + 4)),
    new Path.Line(new Point(0, h), new Point(-8, h + 4)),
  ]

  paths.forEach((path) => {
    path.strokeColor = color
    path.strokeCap = 'round'
    path.strokeWidth = 4
  })

  const symbol = new SymbolDefinition(new Group([line, ...paths]))
  symbol.item.bounds.center.y = 2
  symbol.item.bounds.right = 0
  return symbol
}

export function tipGroup({ size, fillColor, strokeColor }: TipProps) {
  const segments = [
    [size, 0],
    [size / 2, size / 3],
    [0, 0],
  ]

  const arrowFill = new Path({ segments, fillColor })
  const arrowStroke = new Path({ segments, strokeColor, strokeWidth: 2 })

  arrowFill.bounds.top = -2
  return new Group([arrowFill, arrowStroke])
}
