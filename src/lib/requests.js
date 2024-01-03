import { env } from '$env/dynamic/public';

export async function uploadFile(file) {
	const name = file.name;
	const ext = name.indexOf('.') < 0 ? '' : name.split('.').pop();
	const public_base_URL = env.PUBLIC_PUBLIC_BASE_URL;
	const actual_base_URL = env.PUBLIC_ACTUAL_BASE_URL;
	const public_url = `${public_base_URL}/upload`;
	const actual_url = `${actual_base_URL}/upload`;

	function b2h(buffer) {
		return Array.prototype.map
			.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
			.join('');
	}
	const FILE_HASH = b2h(await crypto.subtle.digest('SHA-256', await file.arrayBuffer())); // output: the sha256 digest hex encoded of the file

	const event = {
		content: '',
		kind: 27235,
		created_at: Math.floor(Date.now() / 1000),
		tags: [
			['u', public_url],
			['method', 'POST'],
			['ext', ext],
			['payload', FILE_HASH]
		]
	};

	const signedEvent = await window.nostr.signEvent(event);
	const b64OfSignedEvent = btoa(JSON.stringify(signedEvent));
	const data = {
		method: 'POST',
		headers: {
			Authorization: `Nostr ${b64OfSignedEvent}`
		},
		body: file
	};

	let res = await fetch(actual_url, data);
	let text = await res.text();

	return {
		filename: file.name,
		status: res.statusText,
		response: text
	};
}

export async function getFiles() {
	const public_base_URL = env.PUBLIC_PUBLIC_BASE_URL;
	const actual_base_URL = env.PUBLIC_ACTUAL_BASE_URL;
	const public_url = `${public_base_URL}/list`;
	const actual_url = `${actual_base_URL}/list`;
	const event = {
		content: '',
		kind: 27235,
		created_at: Math.floor(Date.now() / 1000),
		tags: [
			['u', public_url],
			['method', 'GET']
		]
	};
	const signedEvent = await window.nostr.signEvent(event);
	const b64OfSignedEvent = btoa(JSON.stringify(signedEvent));
	const data = {
		method: 'GET',
		headers: {
			Authorization: `Nostr ${b64OfSignedEvent}`
		}
	};

	return await fetch(actual_url, data);
}

export async function deleteFile(fileUrl) {
	const filename = fileUrl.split('/').pop();
	const public_base_URL = env.PUBLIC_PUBLIC_BASE_URL;
	const actual_base_URL = env.PUBLIC_ACTUAL_BASE_URL;
	const public_url = `${public_base_URL}/delete`;
	const actual_url = `${actual_base_URL}/delete`;
	const event = {
		content: '',
		kind: 27235,
		created_at: Math.floor(Date.now() / 1000),
		tags: [
			['u', public_url],
			['method', 'POST'],
			['filename', filename]
		]
	};
	const signedEvent = await window.nostr.signEvent(event);
	const b64OfSignedEvent = btoa(JSON.stringify(signedEvent));
	const data = {
		method: 'POST',
		headers: {
			Authorization: `Nostr ${b64OfSignedEvent}`
		}
	};

	return await fetch(actual_url, data);
}
