export function force(x: number, y: number, height: number, color: any = "black") {
  let symbol = loadSymbol(height, color);
  symbol.place(new paper.Point(x, y));
}

export function distload(x: number, y: number, height: number, width: number, color: any = "black") {
  const symbol = loadSymbol(height, color);

  const COUNT = Math.floor(width / 15);
  for (let i = 0; i < COUNT + 1; i++) {
    symbol.place(new paper.Point(x + (width / COUNT) * i, y));
  }

  let line = new paper.Path();
  line.add(new paper.Point(x - 2, y - height + 2));
  line.add(new paper.Point(x + width + 2, y - height + 2));
  line.strokeColor = color;
  line.strokeWidth = 4;
}

export function moment(x: number, y: number, height: number, color: any = "black") {
  let center = new paper.Point(x, y - height / 2);
  let r = height / 2 - 2;

  let arc = new paper.Path.Arc({
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
  });

  arc.strokeWidth = 4;

  let tip = new paper.Path();
  tip.add(new paper.Point(0, 0));
  tip.add(new paper.Point(4.6, -10.5));
  tip.add(new paper.Point(0, -9));
  tip.add(new paper.Point(-4.6, -10.5));
  tip.fillColor = color;

  tip.rotate(-45);

  tip.translate(
    new paper.Point(
      center.x + r * Math.sin((120 / 180) * Math.PI),
      center.y + r * Math.cos((120 / 180) * Math.PI) + 5
    )
  );
}

export function defenition(x: number, y: number, height: number, color: any = "black") {
  let triangle = new paper.Path.RegularPolygon(new paper.Point(x, y), 3, height / 2);
  triangle.strokeWidth = 4;
  triangle.strokeColor = color;

  triangle.bounds.center.x = x + triangle.bounds.height / 2;
  triangle.bounds.bottom = triangle.bounds.center.y;

  let defLine = new paper.Path();
  defLine.add(
    new paper.Point(
      triangle.bounds.center.x - (height * 2) / 3,
      triangle.bounds.bottom
    )
  );
  defLine.add(
    new paper.Point(
      triangle.bounds.center.x + (height * 2) / 3,
      triangle.bounds.bottom
    )
  );
  defLine.strokeColor = color;
  defLine.strokeWidth = 4;

  const COUNT = Math.floor(defLine.bounds.width / 10);
  for (let i = 0; i < COUNT; i++) {
    let path = new paper.Path();
    path.add(
      new paper.Point(
        triangle.bounds.center.x -
        (height * 2) / 3 +
        (defLine.bounds.width / COUNT) * i +
        2,
        triangle.bounds.bottom + 8
      )
    );
    path.add(
      new paper.Point(
        triangle.bounds.center.x -
        (height * 2) / 3 +
        (defLine.bounds.width / COUNT) * i +
        7,
        triangle.bounds.bottom
      )
    );

    path.strokeColor = color;
    path.strokeWidth = 3;
  }
}

export function fixed(x: number, y: number, height: number, color: any = "black") {
  let vertical = new paper.Path();
  vertical.add(new paper.Point(x, y));
  vertical.add(new paper.Point(x, y + height));
  vertical.strokeColor = color;
  vertical.strokeWidth = 4;
  vertical.strokeCap = 'round'

  const COUNT = Math.floor(height / 10);
  for (let i = 0; i < COUNT; i++) {
    let path = new paper.Path();
    path.add(new paper.Point(x, y + i * height / COUNT + 1));
    path.add(new paper.Point(x - 8, y + i * height / COUNT + 9));
    path.strokeColor = color;
    path.strokeWidth = 3;
    path.strokeCap = 'round';
  }
}

function loadSymbol(height: number, color: any) {
  let line = new paper.Path();
  line.add(new paper.Point(0, -7));
  line.add(new paper.Point(0, -height));
  line.strokeColor = color;
  line.strokeWidth = 4;

  let tip = new paper.Path();
  tip.add(new paper.Point(0, 0));
  tip.add(new paper.Point(4.6, -10.5));
  tip.add(new paper.Point(0, -9));
  tip.add(new paper.Point(-4.6, -10.5));
  tip.fillColor = color;

  let symbol = new paper.SymbolDefinition(new paper.Group([tip, line]));
  symbol.item.bounds.center.y -= symbol.item.bounds.height / 2;

  return symbol;
}
