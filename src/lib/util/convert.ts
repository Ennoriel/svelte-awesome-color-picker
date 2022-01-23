import type { Color, Hex, Hsv, Rgb } from '$lib/type/types';

/**
 * Convert HSV representation to RGB HEX string.
 * Credits to http://www.raphaeljs.com
 */
function hsv2rgb(hsv: Hsv): Rgb {
	let R, G, B;
	let h = (hsv.h % 360) / 60;

	const C = hsv.v * hsv.s;
	const X = C * (1 - Math.abs((h % 2) - 1));
	R = G = B = hsv.v - C;

	h = ~~h;
	R += [C, X, 0, 0, X, C][h];
	G += [X, C, C, X, 0, 0][h];
	B += [0, 0, X, C, C, X][h];

	const r = Math.floor(R * 255);
	const g = Math.floor(G * 255);
	const b = Math.floor(B * 255);
	return {
		a: hsv.a,
		r: r,
		g: g,
		b: b
	};
}

/**
 * Converts RGB representation to HEX representation
 */
function rgb2hex(rgb: Rgb): Hex {
	return {
		hex:
			'#' +
			[rgb.r, rgb.g, rgb.b, Math.round(rgb.a * 255) | 0].reduce(
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
function rgb2hsv(rgb: Rgb): Hsv {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;

	const V = Math.max(r, g, b);
	const C = V - Math.min(r, g, b);
	const S = C === 0 ? 0 : C / V;
	let H =
		C === 0
			? null
			: V === r
			? (g - b) / C + (g < b ? 6 : 0)
			: V === g
			? (b - r) / C + 2
			: (r - g) / C + 4;
	H = (H % 6) * 60;
	return {
		a: rgb.a,
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
		v,
		a
	};
}

function rgb2Color({ r, g, b, a }: Rgb): Color {
	const rgb = { r, g, b, a };
	return {
		...rgb2hsv(rgb),
		...rgb2hex(rgb),
		...rgb
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
