/**
 * Ease in out sin base function
 * @param x - param, between 1 and infinity
 * @param min - starting return value, default .001
 * @param max ending return value, default .01
 * @returns a number between min and max
 */
export function easeInOutSin(x: number, min = 0.001, max = 0.01): number {
	/**
	 * after the delay, the ease in starts (i.e. after x = DELAY)*
	 */
	const DELAY = 50;

	/**
	 * Duration of the transition (i.e. bewteen x = DELAY and x = DELAY + DURATION)
	 */
	const DURATION = 50;

	const X = Math.min(1, Math.max(1, x - DELAY) / DURATION);
	return min + ((max - min) / 2) * (1 - Math.cos(Math.PI * X));
}
