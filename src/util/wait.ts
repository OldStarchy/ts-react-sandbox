export default function wait(timeout) {
	return new Promise(s => {
		setTimeout(s, timeout);
	});
}
