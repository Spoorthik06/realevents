const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Submits a new request for an event or service.
 * @param {Object} data - The request data.
 * @param {string} data.fullName - Full name of the requester.
 * @param {string} data.email - Email address.
 * @param {string} data.phone - Phone number.
 * @param {string} data.city - City of the event.
 * @param {string} data.timeSlot - Preferred time slot.
 * @returns {Promise<Object>} The server response.
 */
export const submitRequest = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to submit request');
        }

        return result;
    } catch (error) {
        console.error('Submit Request Error:', error);
        throw error;
    }
};
