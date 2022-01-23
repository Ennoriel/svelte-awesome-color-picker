const config = {
	transform: {
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.js$': 'babel-jest'
	},
	moduleFileExtensions: ['js', 'ts'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/lib$1'
	},
	testEnvironment: 'jsdom',
	transformIgnorePatterns: ['node_modules']
};

module.exports = config;
