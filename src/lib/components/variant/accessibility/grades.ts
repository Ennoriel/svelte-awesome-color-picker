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

export function getNumberOfGradeFailed({ contrast, size }: A11yColorContract): number {
	if (!contrast) {
		return 1;
	}
	return !isGradeAchieved(contrast, size, 'AA') ? 2 : !isGradeAchieved(contrast, size, 'AAA') ? 1 : 0;
}
