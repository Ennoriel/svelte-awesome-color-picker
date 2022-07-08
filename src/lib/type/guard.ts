import type {Hex, Hsv, Color, Rgb} from './types';

export function isHsv(color: Color): color is Hsv {
	return (
		(color as Hsv).h !== undefined &&
		(color as Hsv).s !== undefined &&
		(color as Hsv).v !== undefined
	);
}

export function isHex(color: Color): color is Hex {
	return (color as Hex).hex !== undefined;
}

export function isRgb(color: Color): color is Rgb {
	return (
		(color as Rgb).r !== undefined &&
		(color as Rgb).g !== undefined &&
		(color as Rgb).b !== undefined
	);
}
