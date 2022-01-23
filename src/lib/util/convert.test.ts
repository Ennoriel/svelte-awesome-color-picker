import _ from './convert';

describe('convert', () => {
	it('rgb2Color', () => {
		expect(_.rgb2Color({ r: 255, g: 0, b: 0, a: 1 })).toStrictEqual({
			h: 0,
			s: 1,
			v: 1,
			a: 1,
			hex: '#ff0000ff',
			r: 255,
			g: 0,
			b: 0
		});
	});

	it('hsv2Color', () => {
		expect(_.hsv2Color({ h: 0, s: 1, v: 1, a: 1 })).toStrictEqual({
			h: 0,
			s: 1,
			v: 1,
			a: 1,
			hex: '#ff0000ff',
			r: 255,
			g: 0,
			b: 0
		});
	});

	it('hex2Color', () => {
		expect(_.hex2Color({ hex: '#ff0000ff' })).toStrictEqual({
			h: 0,
			s: 1,
			v: 1,
			a: 1,
			hex: '#ff0000ff',
			r: 255,
			g: 0,
			b: 0
		});
	});
});
