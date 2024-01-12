import type { A11yColorContract } from '$lib/type/types';

export const grades = {
	normal: {
		AA: 4.5,
		AAA: 7
	},
	large: {
		AA: 3,
		AAA: 4.5
	}
};

export function isGradeAchieved(
	contrast: number,
	size: 'normal' | 'large' | undefined = 'normal',
	grade: 'AA' | 'AAA'
) {
	return contrast >= grades[size][grade];
}

export function getNumberOfGradeFailed({ contrast, size }: A11yColorContract, a11yLevel: 'AA' | 'AAA'): number {
	if (!contrast) {
		return 1;
	}
	const isAA = isGradeAchieved(contrast, size, 'AA');
	if (a11yLevel === 'AA') {
		return isAA ? 0 : 1;
	} else if (!isAA) {
		return 2;
	}
	const isAAA = isGradeAchieved(contrast, size, 'AAA');
	return isAAA ? 0 : 1;
}
