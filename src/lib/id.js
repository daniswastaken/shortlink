// Generate 3-lowercase-alphabet id combinations
const IDS = [];
for (let i = 0; i < 26; i++) {
	for (let j = 0; j < 26; j++) {
		for (let k = 0; k < 26; k++) {
			IDS.push(
				String.fromCharCode(97 + i) +
					String.fromCharCode(97 + j) +
					String.fromCharCode(97 + k),
			);
		}
	}
}

// Expose
export const USED_IDS = new Set();

export function generateId() {
	for (const id of IDS) {
		if (!USED_IDS.has(id)) {
			return id;
		}
	}
}

export function deleteId(id) {
	USED_IDS.delete(id);
}
