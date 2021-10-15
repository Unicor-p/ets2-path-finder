import { hello } from '../src/main'

test('should return "Hello world!"', () => {
	expect(hello()).toBe('Hello world!')
})