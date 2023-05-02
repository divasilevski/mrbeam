import { Point, Path, Color, Group, SymbolDefinition } from 'paper'

export function forceSymbol(height: number, color: typeof Color.prototype) {
  const line = new Path()
  line.add(new Point(0, -7))
  line.add(new Point(0, -height))
  line.strokeColor = color
  line.strokeWidth = 4

  const tip = new Path()
  tip.add(new Point(0, 0))
  tip.add(new Point(4.6, -10.5))
  tip.add(new Point(0, -9))
  tip.add(new Point(-4.6, -10.5))
  tip.fillColor = color

  return new SymbolDefinition(new Group([tip, line]))
}

export function momentSymbol(height: number, color: typeof Color.prototype) {
  const center = new Point(0, -height / 2)
  const r = height / 2 - 2

  const arc = new Path.Arc({
    from: [
      center.x + r * Math.sin((30 / 180) * Math.PI),
      center.y + r * Math.cos((30 / 180) * Math.PI),
    ],
    through: [center.x - r, center.y],
    to: [
      center.x + r * Math.sin((120 / 180) * Math.PI),
      center.y + r * Math.cos((120 / 180) * Math.PI),
    ],
    strokeColor: color,
    strokeCap: 'round',
  })

  arc.strokeWidth = 4

  const tip = new Path()
  tip.add(new Point(0, 0))
  tip.add(new Point(4.6, -10.5))
  tip.add(new Point(0, -9))
  tip.add(new Point(-4.6, -10.5))
  tip.fillColor = color

  tip.rotate(-45)

  tip.translate(
    new Point(
      center.x + r * Math.sin((120 / 180) * Math.PI),
      center.y + r * Math.cos((120 / 180) * Math.PI) + 5
    )
  )

  const symbol = new SymbolDefinition(new Group([arc, tip]))
  symbol.item.bounds.center.y = 0
  return symbol
}

export function simpleSymbol(height: number, color: typeof Color.prototype) {
  const triangle = new Path.RegularPolygon(new Point(0, 0), 3, height / 2)
  triangle.strokeWidth = 4
  triangle.strokeColor = color

  triangle.bounds.center.x = triangle.bounds.height / 2
  triangle.bounds.bottom = triangle.bounds.center.y

  const defLine = new Path()
  defLine.add(
    new Point(
      triangle.bounds.center.x - (height * 2) / 3,
      triangle.bounds.bottom
    )
  )
  defLine.add(
    new Point(
      triangle.bounds.center.x + (height * 2) / 3,
      triangle.bounds.bottom
    )
  )
  defLine.strokeColor = color
  defLine.strokeCap = 'round'
  defLine.strokeWidth = 4

  const symbol = new SymbolDefinition(new Group([triangle, defLine]))
  symbol.item.bounds.top = 2
  return symbol
}

export function fixedSymbol(h: number, color: typeof Color.prototype) {
  const line = new Path()
  line.add(new Point(0, 0))
  line.add(new Point(0, h))

  line.strokeColor = color
  line.strokeWidth = 4
  line.strokeCap = 'round'

  const paths = [
    new Path.Line(new Point(0, 0), new Point(-8, 4)),
    new Path.Line(new Point(0, h / 2), new Point(-8, h / 2 + 4)),
    new Path.Line(new Point(0, h), new Point(-8, h + 4)),
  ]

  paths.forEach((path) => {
    path.strokeColor = color
    path.strokeWidth = 4
    path.strokeCap = 'round'
  })

  const symbol = new SymbolDefinition(new Group([line, ...paths]))
  symbol.item.bounds.center.y = 2
  symbol.item.bounds.right = 0
  return symbol
}
