import {writable, derived } from "svelte/store"


export function debounce(store: any) {
	let initialized = false;
	return derived(store, ($value, set) => {
		if (!initialized) {
			set($value)
			initialized = true 
			return
		}

		const timeout = setTimeout(() => {
			set($value);
		}, 1000);

		return () => clearTimeout(timeout);
	})
}

export const production = writable({});
export const deck = writable([]);
export const scores = writable(new Promise(()=>{}));
