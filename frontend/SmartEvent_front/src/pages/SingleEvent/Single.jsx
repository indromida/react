import React from 'react';
import { useParams } from 'react-router-dom';
import './Single.css';
import { event_list } from '../../assets/assets'; // Assuming event data is stored here

function Single() {
  const { id } = useParams(); // Get the event ID from the URL
  const event = event_list.find((event) => event.id === parseInt(id)); // Find the event by ID

  if (!event) {
    return <div className="single-event-container">Event not found</div>;
  }

  return (
    <div className="single-event-container">
      <div className="single-event-header">
        <img src={event['event-img']} alt={event['event-title']} className="single-event-image" />
        <h1 className="single-event-title">{event['event-title']}</h1>
      </div>
      <div className="single-event-details">
        <p className="single-event-description">{event['event-description']}</p>
        <p className="single-event-category">
          <strong>Category:</strong> {event['event-category']}
        </p>
        <p className="single-event-date">
          <strong>Date:</strong> {event['event-date']}
        </p>
        <p className="single-event-location">
          <strong>Location:</strong> {event['event-location']}
        </p>
      </div>
      <div className="single-event-actions">
        <button className="single-event-button">Get Tickets</button>
        <button className="single-event-button secondary">Add to Calendar</button>
      </div>
    </div>
  );
}

export default Single;