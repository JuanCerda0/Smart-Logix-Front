// src/tests/setup.ts
import '@testing-library/jest-dom/vitest';

// jsdom in Node 26+ does not provide localStorage on globalThis.
// Vitest's jsdom environment provides it on window, but module-level code
// may access it before the environment is fully initialized.
if (typeof globalThis.localStorage === 'undefined' && typeof window !== 'undefined') {
	const store: Record<string, string> = {};
	globalThis.localStorage = {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => {
			store[key] = String(value);
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			for (const k in store) delete store[k];
		},
		get length() {
			return Object.keys(store).length;
		},
		key: (index: number) => Object.keys(store)[index] ?? null
	};
}
