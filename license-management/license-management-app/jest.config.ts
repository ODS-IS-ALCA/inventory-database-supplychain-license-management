/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: ".",
	modulePaths: [
		"<rootDir>/src",
		"<rootDir>/node_modules"
	],
	roots: ["<rootDir>/test"]
};