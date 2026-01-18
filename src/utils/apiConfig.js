const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getApiUrl = (endpoint) => {
    // Ensure no double slashes
    const base = API_URL.replace(/\/$/, '');
    const path = endpoint.replace(/^\//, '');
    return `${base}/${path}`;
};

export const AUTH_URL = `${API_URL.replace(/\/$/, '')}/auth`;
