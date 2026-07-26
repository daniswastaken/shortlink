import { generateId, deleteId } from "./id.js";

const m = new Map();

export function addLink(link) {
	const id = generateId();
	m.set(id, link);
	return id;
}

export function getLink(id) {
	return m.get(id);
}
