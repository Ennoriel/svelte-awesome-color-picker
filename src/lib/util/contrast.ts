import { range } from 'chyme';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

extend([a11yPlugin]);

function getContrastCurve(hex: string, h: number, grade: number, vmin = 0, vmax = 100) {
	console.log('getContrastCurve');
	// const histo: any = [];
	const points: any = [];
	let never = false;

	for (let s = 0; s <= 100; s += 10) {
		let v_min = vmin;
		let v_max = vmax;
		let v = (v_max + v_min) / 2;
		let iter = 0;
		let contrast = 0;

		let color;
		const hexLuminance = colord(hex).luminance();

		while (iter < 8) {
			color = colord({ h, s, v });
			contrast = color.contrast(hex);
			// console.log(s, contrast, color.luminance(), hexLuminance)
			// histo.push({s, v, contrast, colLuminance: color.luminance(), hexLuminance})
			if (v >= 99) {
				v = 100;
				break;
			} else if (contrast > grade) {
				if (color.luminance() < hexLuminance) {
					if (never) {
						s += 100;
						break;
					}
					// histo[histo.length - 1].dir = 1
					v_min = v;
				} else {
					// histo[histo.length - 1].dir = 2
					v_max = v;
					if (!s && !iter) never = true;
				}
			} else {
				if (color.luminance() < hexLuminance) {
					if (never) {
						s += 100;
						break;
					}
					// histo[histo.length - 1].dir = 3
					v_max = v;
				} else {
					// histo[histo.length - 1].dir = 4
					v_min = v;
					if (!s && !iter) never = true;
				}
			}
			v = (v_max + v_min) / 2;
			iter++;
		}

		if (Math.abs(contrast - grade) < 0.5) points.push({ x: s, y: 100 - v, contrast });
		else break;
	}

	return points;
}

export function getContrastPoints(hex: string, h: number, grade = 4.5) {
	// iterate over saturation

	const histo: any = [];

	const contrastS0V0 = colord({ h, s: 0, v: 0 }).contrast(hex);
	const contrastS0V50 = colord({ h, s: 0, v: 50 }).contrast(hex);
	const contrastS0V100 = colord({ h, s: 0, v: 100 }).contrast(hex);
	const multiPath =
		contrastS0V0 > contrastS0V50 &&
		contrastS0V100 > contrastS0V50 &&
		contrastS0V0 > grade &&
		contrastS0V50 < grade &&
		contrastS0V100 > grade;

	const check = range(0, 100, 10).map((s) => {
		return {
			'0': colord({ h, s, v: 0 }).contrast(hex),
			'50': colord({ h, s, v: 50 }).contrast(hex),
			'100': colord({ h, s, v: 100 }).contrast(hex)
		};
	});

	// console.table(check);
	console.log({ multiPath, contrastS0V0, contrastS0V50, contrastS0V100 });

	if (multiPath) {
		return [getContrastCurve(hex, h, grade, 0, 50), getContrastCurve(hex, h, grade, 50, 100)];
	} else {
		return [getContrastCurve(hex, h, grade)];
	}
}
