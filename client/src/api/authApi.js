const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Signs up a new user.
 * @param {Object} userData - The user registration data.
 * @returns {Promise<Object>} The server response including token and user.
 */
export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Signup failed');
        }

        return result;
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
};

/**
 * Logs in an existing user.
 * @param {Object} credentials - The user login credentials.
 * @returns {Promise<Object>} The server response including token and user.
 */
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Login failed');
        }

        return result;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};
