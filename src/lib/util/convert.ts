import type { Color, Hex, Hsv, Rgb } from '$lib/type/types';

/**
 * Convert HSV representation to RGB HEX string.
 * Credits to http://www.raphaeljs.com
 */
function hsv2rgb({h, s, v, a = 1}: Hsv): Rgb {
	let R, G, B;
	let _h = (h % 360) / 60;

	const C = v * s;
	const X = C * (1 - Math.abs((_h % 2) - 1));
	R = G = B = v - C;

	_h = ~~_h;
	R += [C, X, 0, 0, X, C][_h];
	G += [X, C, C, X, 0, 0][_h];
	B += [0, 0, X, C, C, X][_h];

	const r = Math.floor(R * 255);
	const g = Math.floor(G * 255);
	const b = Math.floor(B * 255);
	return {r, g, b, a};
}

/**
 * Converts RGB representation to HEX representation
 */
function rgb2hex({r, g, b, a = 1}: Rgb): Hex {
	return {
		hex:
			'#' +
			[r, g, b, Math.round(a * 255) | 0].reduce(
				(acc, v) => `${acc}${v.toString(16).padStart(2, '0')}`,
				''
			)
	};
}

/**
 * Converts HEX representation to RGB representation
 */
function hex2rgb(hex: Hex): Rgb {
	const h = hex.hex;
	return {
		r: parseInt(h.substr(1, 2), 16),
		g: parseInt(h.substr(3, 2), 16),
		b: parseInt(h.substr(5, 2), 16),
		a: h.length <= 7 ? 1 : parseInt(h.substr(7, 2), 16) / 255
	};
}

/**
 * Convert RGB representation to HSV.
 * Credits to http://www.raphaeljs.com
 */
function rgb2hsv({r, g, b, a = 1}: Rgb): Hsv {
	const R = r / 255;
	const G = g / 255;
	const B = b / 255;

	const V = Math.max(R, G, B);
	const C = V - Math.min(R, G, B);
	const S = C === 0 ? 0 : C / V;
	let H =
		C === 0
			? null
			: V === R
			? (G - B) / C + (G < B ? 6 : 0)
			: V === G
			? (B - R) / C + 2
			: (R - G) / C + 4;
	H = (H % 6) * 60;
	return {
		a: a,
		h: H,
		s: S,
		v: V
	};
}

function hsv2Color({ h, s, v, a }: Hsv): Color {
	const rgb = hsv2rgb({ h, s, v, a });
	return {
		...rgb,
		...rgb2hex(rgb),
		h,
		s,
		v
	};
}

function rgb2Color({ r, g, b, a }: Rgb): Color {
	const rgb = { r, g, b, a };
	return {
		...rgb2hsv(rgb),
		...rgb2hex(rgb),
		r, g, b
	};
}

function hex2Color({ hex }: Hex): Color {
	const rgb = hex2rgb({ hex });
	return {
		...rgb,
		...rgb2hsv(rgb),
		hex
	};
}

export default { hsv2Color, rgb2Color, hex2Color };
