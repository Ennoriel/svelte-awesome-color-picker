import type { Color, Hex, Hsv, Rgb } from '$lib/type/types';

/**
 * Convert HSV representation to RGB HEX string.
 * Credits to http://www.raphaeljs.com
 */
function hsv2rgb(hsv: Hsv): Color {
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
		...hsv,
		r: r,
		g: g,
		b: b,
		hex: rgb2hex({ r, g, b, a: hsv.a }).hex
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
function hex2rgb(hex: string): Rgb {
	return {
		r: parseInt(hex.substr(1, 2), 16),
		g: parseInt(hex.substr(3, 2), 16),
		b: parseInt(hex.substr(5, 2), 16),
		a: hex.length <= 7 ? 1 : parseInt(hex.substr(7, 2), 16) / 255
	};
}

/**
 * Convert RGB representation to HSV.
 * Credits to http://www.raphaeljs.com
 */
function rgb2hsv(rgb: Rgb): Color {
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
		...rgb,
		h: H,
		s: S,
		v: V,
		hex: rgb2hex(rgb).hex
	};
}

export default { hsv2rgb, rgb2hsv, hex2rgb };
