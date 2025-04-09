import React, { useState } from 'react';
import './Add.css';

function Add() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    capaciteMax: '',
    nombreParticipants: 0,
    imageUrl: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format dates to include time (assuming time is in separate fields)
    const startDateTime = `${formData.dateDebut}T${formData.timeStart || '00:00:00'}`;
    const endDateTime = `${formData.dateFin}T${formData.timeEnd || '23:59:59'}`;

    const eventData = {
      ...formData,
      dateDebut: startDateTime,
      dateFin: endDateTime,
      capaciteMax: parseInt(formData.capaciteMax),
      nombreParticipants: 0
    };

    try {
      const response = await fetch('http://localhost:5207/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event added successfully!');
        setFormData({
          titre: '',
          description: '',
          dateDebut: '',
          dateFin: '',
          lieu: '',
          capaciteMax: '',
          nombreParticipants: 0,
          imageUrl: '',
          category: ''
         
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add event: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="add-event-container">
      <h1>Add New Event</h1>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titre">Event Title</label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateDebut">Start Date</label>
          <input
            type="date"
            id="dateDebut"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            required
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="dateFin">End Date</label>
          <input
            type="date"
            id="dateFin"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
            required
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="category">Event Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lieu">Event Location</label>
          <input
            type="text"
            id="lieu"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="capaciteMax">Maximum Capacity</label>
          <input
            type="number"
            id="capaciteMax"
            name="capaciteMax"
            value={formData.capaciteMax}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Event Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group textarea-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default Add;