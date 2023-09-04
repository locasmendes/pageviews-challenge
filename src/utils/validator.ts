export function validateKey(key: string): boolean {
	if (key.length < 1 || key.length > 10) {
		return false;
	}
	const regex = /^[a-zA-Z0-9]+$/;
	return regex.test(key);
}