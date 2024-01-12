import { colord } from 'colord';
import type { A11yColor } from '../type/types';

/**
 * compute the resulting color of hexA over hexB. If hexB has transparency, computes it over a white background
 * @param hexA
 * @param hexB
 * @returns
 */
export function mix(hexA: string, hexB: string = '#FFFFFF') {
	const rgbA = colord(hexA).toRgb();
	const rgbB = colord(hexB).toRgb();

	const { r: rA, g: gA, b: bA, a: alpha = 255 } = rgbA;
	const { r: rB, g: gB, b: bB } = rgbB;

	const r = average(rA, rB, alpha);
	const g = average(gA, gB, alpha);
	const b = average(bA, bB, alpha);

	return '#' + r + g + b;
}

function average(a: number, b: number, alpha: number) {
	return Math.round(b + (a - b) * alpha)
		.toString(16)
		.padStart(2, '0');
}

export function getContrast(a11yColor: A11yColor, hex: string | undefined) {
	if (!hex) return;
	if (a11yColor.reverse) {
		const bgOverWhiteBg = mix(a11yColor.bgHex ?? '#FFFFFF');
		const bg = mix(hex, bgOverWhiteBg);
		const ft = mix(a11yColor.textHex, bg);
		if (!ft) return;
		const cft = colord(ft);
		return {
			...a11yColor,
			trueColors: {
				textColor: a11yColor.textHex,
				bgColor: bg
			},
			contrast: cft.contrast(bg)
		};
	} else {
		if (!a11yColor.bgHex) return;
		const bg = mix(a11yColor.bgHex);
		const ft = mix(hex, bg);
		if (!ft) return;
		const cft = colord(ft);
		return {
			...a11yColor,
			trueColors: {
				textColor: hex,
				bgColor: a11yColor.bgHex
			},
			contrast: cft.contrast(bg)
		};
	}
}
