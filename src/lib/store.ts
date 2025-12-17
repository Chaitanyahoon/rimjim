import { writable } from 'svelte/store';

export type View = 'home' | 'roast' | 'appreciation' | 'fun' | 'vibe' | 'birthday' | 'pet';

export const currentView = writable<View>('home');
export const isChaosMode = writable(false);
