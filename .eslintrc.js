module.exports = {
	env:           {
		node: true
	},
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'no-mixed-spaces-and-tabs': [ 2, 'smart-tabs' ],
		'@typescript-eslint/no-explicit-any': [1, { fixToUnknown: true }]
	}
};