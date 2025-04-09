import React, { useState, useEffect } from 'react';
import './Categories.css';
import { motion } from 'framer-motion';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const itemsPerPage = 2;

  // Fetch events and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5207/api/events');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Set all events
        setAllEvents(data);
        setFilteredEvents(data);
        
        // Extract unique categories from events
        const uniqueCategories = ['All', ...new Set(data.map(event => event.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    if (category === 'All') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.category === category));
    }
  };

  // Open modal with event details
  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeEventDetails = () => {
    setShowModal(false);
    setSelectedEvent(null);
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
  };

  // Format date string
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format time string
  const formatTime = (dateString) => {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Calculate the current page's events
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="loading-message">Loading events...</div>;
  }

  if (error) {
    return <div className="error-message">Error loading events: {error}</div>;
  }

  return (
    <div className="categories-container">
      {/* Categories Section */}
      <div className="categories-section">
        <h2>Categories</h2>
        <ul className="categories-list">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`category-item ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category === 'All' ? (
                <span className="category-name">{category}</span>
              ) : (
                <>
                  {/* You can add category images if available in your API */}
                  <span className="category-name">{category}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Events Section */}
      <div className="events-section">
        <h2>Events</h2>
        <div className="explore-events-list">
          {currentEvents.length > 0 ? (
            currentEvents.map((event, index) => (
              <motion.div
                key={event.id || index}
                className="Explore-event-list-item"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <img 
                  src={event.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image'} 
                  alt={event.titre} 
                />
                <div className="Explore-event-list-item-content">
                  <h2>{event.titre}</h2>
                  <p>{event.description}</p>
                  <div className="event-buttons">
                    <button>Get your ticket now</button>
                    <button className="details-button" onClick={() => openEventDetails(event)}>View details</button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-events-message">
              No events available in the "{selectedCategory}" category at the moment.
            </p>
          )}
        </div>

        {/* Pagination */}
        {filteredEvents.length > itemsPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredEvents.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="modal-overlay" onClick={closeEventDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeEventDetails}>×</button>
            <h2>{selectedEvent.titre}</h2>
            <img 
              src={selectedEvent.imageUrl || 'https://via.placeholder.com/700x300.png?text=No+Image'} 
              alt={selectedEvent.titre} 
            />
            
            <div className="event-description-container">
              <h3>About This Event</h3>
              <div className="event-description-text">
                {selectedEvent.description}
              </div>
            </div>
            
            <div className="event-details-grid">
              <div className="event-detail">
                <i className="far fa-calendar"></i>
                <strong>Start Date:</strong>
                <span>{formatDate(selectedEvent.dateDebut)}</span>
              </div>
              <div className="event-detail">
                <i className="far fa-clock"></i>
                <strong>Start Time:</strong>
                <span>{formatTime(selectedEvent.dateDebut)}</span>
              </div>
              <div className="event-detail">
                <i className="far fa-calendar"></i>
                <strong>End Date:</strong>
                <span>{formatDate(selectedEvent.dateFin)}</span>
              </div>
              <div className="event-detail">
                <i className="far fa-clock"></i>
                <strong>End Time:</strong>
                <span>{formatTime(selectedEvent.dateFin)}</span>
              </div>
              <div className="event-detail">
                <i className="fas fa-map-marker-alt"></i>
                <strong>Location:</strong>
                <span>{selectedEvent.lieu || 'Not specified'}</span>
              </div>
              <div className="event-detail">
                <i className="fas fa-tag"></i>
                <strong>Category:</strong>
                <span>{selectedEvent.category}</span>
              </div>
              <div className="event-detail">
                <i className="fas fa-users"></i>
                <strong>Capacity:</strong>
                <span>{selectedEvent.capaciteMax} attendees</span>
              </div>
              <div className="event-detail">
                <i className="fas fa-user-check"></i>
                <strong>Registered:</strong>
                <span>{selectedEvent.nombreParticipants} attendees</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="ticket-button">Get your ticket now</button>
            </div>
          </div>
        </div>
      )}

     
      
    </div>
  );
};

export default Categories;