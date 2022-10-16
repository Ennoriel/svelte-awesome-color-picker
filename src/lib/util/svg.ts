// size of the tangent
const t = 1 / 5;

export type Coord = { x: number; y: number };

export function controlPoints(p: Array<Coord>) {
	// given the points array p calculate the control points for the cubic Bezier curves

	let pc: Array<[Coord, Coord]> = [];
	for (let i = 1; i < p.length - 1; i++) {
		let dx = p[i - 1].x - p[i + 1].x; // difference x
		let dy = p[i - 1].y - p[i + 1].y; // difference y

		// the first control point
		let x1 = p[i].x - dx * t;
		let y1 = p[i].y - dy * t;
		let o1 = {
			x: x1,
			y: y1
		};

		// the second control point
		let x2 = p[i].x + dx * t;
		let y2 = p[i].y + dy * t;
		let o2 = {
			x: x2,
			y: y2
		};

		// building the control points array
		pc[i] = [o1, o2];
	}
	return pc;
}

export function drawCurve(p: Array<Coord>) {
	let pc = controlPoints(p);
	if (!pc?.length) return '';

	let d = `M${p[0].x},${p[0].y} Q${pc[1][1].x},${pc[1][1].y}, ${p[1].x},${p[1].y}`;

	if (p.length > 2) {
		// central curves are cubic Bezier
		for (let i = 1; i < p.length - 2; i++) {
			d += `C${pc[i][0].x}, ${pc[i][0].y}, ${pc[i + 1][1].x}, ${pc[i + 1][1].y}, ${p[i + 1].x},${
				p[i + 1].y
			}`;
		}

		// the first & the last curve are quadratic Bezier
		let n = p.length - 1;
		d += `Q${pc[n - 1][0].x}, ${pc[n - 1][0].y}, ${p[n].x}, ${p[n].y}`;
	}
	return d;
}
