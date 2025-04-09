import axios from 'axios';

const API_BASE_URL = 'http://localhost:5207/api/events'; // Replace with your API's base URL

// Get all events
export const getEvents = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

// Create a new event
export const createEvent = async (eventData) => {
    const response = await axios.post(API_BASE_URL, eventData);
    return response.data;
};

// Update an event
export const updateEvent = async (id, eventData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, eventData);
    return response.data;
};

// Delete an event
export const deleteEvent = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};