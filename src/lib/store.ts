import { writable } from 'svelte/store';

export type View = 'home' | 'roast' | 'vibe' | 'birthday';

export const currentView = writable<View>('home');
export const isChaosMode = writable(false);
