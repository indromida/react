import React, { useState, useEffect } from 'react';
import './Explore.css';

const Explore = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Modal event

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5207/api/events');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const sortedEvents = data
          .filter(event => new Date(event.dateDebut) > new Date())
          .sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut))
          .slice(0, 3);

        setEvents(sortedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return <div className="Explore-menu loading">Loading events...</div>;
  }

  if (error) {
    return <div className="Explore-menu error">Error loading events: {error}</div>;
  }

  return (
    <div className='Explore-menu' id='Explore-menu'>
      <div className="Explore-events-content">
        <h1 className='cat'>Upcoming Events</h1>
        <div className='explore-events-list'>
          {events.map((item, index) => (
            <div key={index} className="Explore-event-list-item">
              <img
                src={item.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image'}
                alt={item.titre}
              />
              <div className="Explore-event-list-item-content">
                <h2>{item.titre}</h2>
                <p>{item.description}</p>
                <button>Get your ticket now</button>
                <button className="details-button" onClick={() => setSelectedEvent(item)}>
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1 className='cat'>Explore Our Events</h1>

      {selectedEvent && (
    <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>&times;</button>
            <h2>{selectedEvent.titre}</h2>
            <img
                src={selectedEvent.imageUrl || 'https://via.placeholder.com/800x400.png?text=No+Image'}
                alt={selectedEvent.titre}
            />
            <p>{selectedEvent.description}</p>
            
            <div className="event-details-grid">
                <div className="event-detail">
                    <i className="fas fa-calendar-alt"></i>
                    <div>
                        <strong>Start:</strong> 
                        <span>{new Date(selectedEvent.dateDebut).toLocaleString()}</span>
                    </div>
                </div>
                <div className="event-detail">
                    <i className="fas fa-calendar-check"></i>
                    <div>
                        <strong>End:</strong> 
                        <span>{new Date(selectedEvent.dateFin).toLocaleString()}</span>
                    </div>
                </div>
                <div className="event-detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Location:</strong> 
                        <span>{selectedEvent.lieu || 'Not specified'}</span>
                    </div>
                </div>
                <div className="event-detail">
                    <i className="fas fa-users"></i>
                    <div>
                        <strong>Capacity:</strong> 
                        <span>{selectedEvent.capaciteMax} people</span>
                    </div>
                </div>
            </div>
            
            <div className="modal-actions">
                <button className="ticket-button">Get Your Ticket</button>
            </div>
        </div>
    </div>
)}
    </div>
  );
};

export default Explore;
