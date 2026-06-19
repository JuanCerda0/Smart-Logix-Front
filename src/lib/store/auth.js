// src/lib/store/auth.js
import { goto } from '$app/navigation';

class AuthStore {
    // Definimos el estado reactivo usando Runes de Svelte 5
    /** @type {string | null} */
    token = $state(null);
    /** @type {string | null} */
    tenant = $state(null);
    isAuthenticated = $derived(this.token !== null);

    /**
     * @param {string} token
     * @param {string} tenant
     */
    login(token, tenant) {
        this.token = token;
        this.tenant = tenant;
    }

    logout() {
        this.token = null;
        this.tenant = null;
        goto('/login');
    }
}

export const authStore = new AuthStore();